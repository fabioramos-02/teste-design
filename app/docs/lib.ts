// Lê docs/*.md no build e converte para HTML. Fonte única: o mesmo markdown do GitHub.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";
import { href } from "../href";

const DIR = join(process.cwd(), "docs");

export type Doc = { slug: string; title: string; markdown: string };

// slug no padrão do GitHub, para as âncoras dos .md continuarem valendo aqui
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s/g, "-");

const marked = new Marked({
  walkTokens(token) {
    if (token.type !== "link") return;
    // 02-como-usar.md#x → /docs/02-como-usar/#x · ../README.md → /
    const doc = token.href.match(/^(0\d-[\w-]+)\.md(#.*)?$/);
    if (doc) token.href = href(`/docs/${doc[1]}/`) + (doc[2] ?? "");
    else if (/^(\.\.\/)?README\.md$/.test(token.href)) token.href = href("/");
  },
  renderer: {
    heading({ tokens, depth, text }) {
      return `<h${depth} id="${slugify(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
    link({ href: url, tokens }) {
      const ext = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${url}"${ext}>${this.parser.parseInline(tokens)}</a>`;
    },
  },
});

export function listDocs(): Doc[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const raw = readFileSync(join(DIR, f), "utf8");
      const title = raw.match(/^# (.+)$/m)?.[1] ?? f;
      const markdown = raw
        .replace(/^# .+\n/m, "") // título vai no DsPageHeader
        .replace(/\n---\n\s*(Anterior|Próximo)[^\n]*\n?$/, "\n"); // navegação vira DsButton
      return { slug: f.replace(/\.md$/, ""), title, markdown };
    });
}

export const toHtml = (md: string) => marked.parse(md, { async: false });
