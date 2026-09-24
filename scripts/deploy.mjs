// Publica no GitHub Pages: build estático local (dentro da rede do governo) → branch gh-pages.
// Uso: pnpm run deploy
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: "inherit", ...opts });
const git = (args, cwd) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

const remote = git(["remote", "get-url", "origin"]);
const next = createRequire(import.meta.url).resolve("next/dist/bin/next");

run(process.execPath, [next, "build"], { env: { ...process.env, PAGES: "1" } });

// sem .nojekyll o Pages ignora a pasta _next
writeFileSync("out/.nojekyll", "");

run("git", ["init", "-q", "-b", "gh-pages"], { cwd: "out" });
run("git", ["add", "-A"], { cwd: "out" });
run("git", ["commit", "-q", "-m", `deploy ${new Date().toISOString()}`], { cwd: "out" });
run("git", ["push", "-q", "-f", remote, "gh-pages"], { cwd: "out" });

console.log("\nPublicado. Em ~1 min: https://fabioramos-02.github.io/teste-design/");
