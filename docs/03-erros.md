# 3. Erros comuns

Procure a mensagem (Ctrl+F).

## Instalação

| Erro | Causa | Solução |
|---|---|---|
| `404 Group not found` | Usuário fora do grupo `xvia` | Pedir acesso à X-Via |
| `401 Unauthorized` no curl | `$env:` no cmd, ou terminal não reaberto após `setx` | [Passo 3](01-instalacao.md#passo-3--testar-o-acesso) |
| `Ignored project-level auth setting` + `ERR_PNPM_FETCH_401` | Token no `.npmrc` do projeto | Mover para o `.npmrc` do usuário ([Passo 4](01-instalacao.md#passo-4--configurar-os-dois-npmrc)) |
| `ERR_PNPM_FETCH_404 .../projects/3067/...tgz` | Auth com caminho do grupo | Usar `//gitlabs.ms.gov.br/:_authToken` |
| `Failed to replace env in config: ${GITLAB_MS_NPM_TOKEN}` | Variável não existe neste terminal | Reabra o terminal após `setx` |
| `Moving X that was installed by a different package manager` | Rodou `npm install` antes | Apague `package-lock.json`, use só pnpm |
| `pnpm não é reconhecido` | pnpm não instalado | `npx.cmd -y pnpm@10 ...` |
| `npx.ps1 não pode ser carregado` | PowerShell bloqueia scripts | `npx.cmd` no lugar de `npx` |
| `EPERM ... Program Files\nodejs` | `corepack enable` sem admin | Não precisa: `npx.cmd -y pnpm@10` |

## Código

| Erro | Causa | Solução |
|---|---|---|
| `Attempted to call createDsClientComponent() from the server` | Import client num Server Component | Importe de `@plataforma-xvia/ds-react/server` ou use `"use client"` |
| `the name DsX is defined multiple times` | Mesmo componente das duas entradas | Deixe um import só |
| Componente sem estilo | Faltou o `<style>` no `layout.tsx` | [Configuração](02-como-usar.md#configuração-obrigatória-uma-vez) |
| Erro de `window`/`document` no build | Faltou `serverExternalPackages` | Confira `next.config.ts` |
| Meu CSS não vence o do DS | Camadas fora de ordem | `@layer ds.primitives, ds.semantic, ds.theme, app;` no topo |

## CI (GitHub Actions)

| Erro | Causa | Solução |
|---|---|---|
| `ERR_PNPM_FETCH_401` no Actions | Secret não cadastrado | `gh secret set GITLAB_MS_NPM_TOKEN` |
| 404 no Actions | Dono do token saiu do grupo ou token expirou | Gere outro token e atualize o secret |

---

Anterior: [2. Como usar](02-como-usar.md) · Próximo: [4. Sobre a POC](04-poc.md)
