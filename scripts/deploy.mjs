// Publica no GitHub Pages: build estático local (dentro da rede do governo) → HTML criptografado → branch gh-pages.
// Uso: pnpm run deploy            (precisa de RELATORIO_SENHA)
//      pnpm run deploy -- --dry   (gera out/ criptografado sem publicar)
// ponytail: senha única compartilhada; login por pessoa exige backend.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const senha = process.env.RELATORIO_SENHA;
if (!senha) {
  console.error("Defina RELATORIO_SENHA antes do deploy (setx RELATORIO_SENHA \"...\" e reabra o terminal).");
  process.exit(1);
}
const dry = process.argv.includes("--dry");

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: "inherit", ...opts });
const git = (args, cwd) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
const require = createRequire(import.meta.url);

run(process.execPath, [require.resolve("next/dist/bin/next"), "build"], { env: { ...process.env, PAGES: "1" } });

// payload RSC (.txt) traz o conteúdo em texto puro; os links do DS são <a href> crus, então não é usado
for (const f of readdirSync("out", { recursive: true })) {
  if (f.endsWith(".txt")) rmSync(join("out", f));
}

// senha vai por variável de ambiente, não por argumento (não aparece na lista de processos)
run(
  process.execPath,
  [
    join(require.resolve("staticrypt/package.json"), "..", "cli", "index.js"),
    "out", "-r", "-d", "out",
    "--short", "--remember", "7", "-c", "false",
    "--template-title", "Relatório X-VIA",
    "--template-instructions", "Acesso restrito à SETDIG. Informe a senha do relatório.",
    "--template-placeholder", "Senha",
    "--template-button", "Entrar",
    "--template-remember", "Lembrar neste navegador por 7 dias",
    "--template-error", "Senha incorreta.",
    "--template-color-primary", "#004f9f",
    "--template-color-secondary", "#f2f5f9",
  ],
  { env: { ...process.env, STATICRYPT_PASSWORD: senha } },
);

// sem .nojekyll o Pages ignora a pasta _next
writeFileSync("out/.nojekyll", "");

if (dry) {
  console.log("\n--dry: out/ gerado e criptografado, nada publicado.");
  process.exit(0);
}

const remote = git(["remote", "get-url", "origin"]);
run("git", ["init", "-q", "-b", "gh-pages"], { cwd: "out" });
run("git", ["add", "-A"], { cwd: "out" });
run("git", ["commit", "-q", "-m", `deploy ${new Date().toISOString()}`], { cwd: "out" });
run("git", ["push", "-q", "-f", remote, "gh-pages"], { cwd: "out" });

console.log("\nPublicado. Em ~1 min: https://fabioramos-02.github.io/teste-design/");
