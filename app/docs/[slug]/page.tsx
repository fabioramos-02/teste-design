import type { Metadata } from "next";
import { DsBreadcrumb, DsButton, DsMenu, DsPageHeader } from "@plataforma-xvia/ds-react/server";
import { href, REPO } from "../../href";
import { listDocs, toHtml } from "../lib";

export const dynamicParams = false;

export function generateStaticParams() {
  return listDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${listDocs().find((d) => d.slug === slug)?.title} · Docs` };
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const docs = listDocs();
  const i = docs.findIndex((d) => d.slug === slug);
  const doc = docs[i];
  const prev = docs[i - 1];
  const next = docs[i + 1];

  return (
    <>
      <div className="section section--muted">
        <div className="wrap">
          <DsPageHeader heading={doc.title} eyebrow="Documentação" icon="book">
            <DsBreadcrumb
              slot="breadcrumb"
              items={JSON.stringify([
                { label: "Início", href: href("/") },
                { label: "Documentação", href: href("/docs/") },
                { label: doc.title },
              ])}
            />
            <DsButton slot="actions" href={`${REPO}/blob/main/docs/${slug}.md`} target="_blank" appearance="outline" icon="external-link" iconPosition="end">
              Ver no GitHub
            </DsButton>
          </DsPageHeader>
        </div>
      </div>

      <section className="section">
        <div className="wrap docs">
          <nav className="docs__nav" aria-label="Documentação">
            <DsMenu
              label="Guias"
              items={JSON.stringify(docs.map((d) => ({ label: d.title, href: href(`/docs/${d.slug}/`), icon: d.slug === slug ? "chevron-right" : undefined })))}
            />
          </nav>

          <article>
            <div className="prose" dangerouslySetInnerHTML={{ __html: toHtml(doc.markdown) }} />
            <div className="docs__pager">
              {prev ? (
                <DsButton href={href(`/docs/${prev.slug}/`)} appearance="outline" tone="neutral" icon="arrow-left">
                  {prev.title}
                </DsButton>
              ) : <span />}
              {next && (
                <DsButton href={href(`/docs/${next.slug}/`)} icon="arrow-right" iconPosition="end">
                  {next.title}
                </DsButton>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
