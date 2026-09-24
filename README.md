# POC — Design System MS (X-Via) em Next.js

Projeto mínimo pra testar o consumo do Design System da plataforma X-Via numa aplicação real.
Serve de receita pra outros times (ex.: Corpo de Bombeiros).

> **Status:** ✅ homologado em 24/09/2026 — Next.js 16.3.6, React 19.2.8, pnpm 10.34.5, Windows 11.
> Versões do DS: `ds-react 0.3.2`, `ds-core 0.3.2`, `ds-tokens 0.2.0`, `ds-icons 0.2.0`.

---

## 1. Entenda antes de começar

| Peça | O que é | Você instala? |
|---|---|---|
| **Storybook** (designsystem.digital.ms.gov.br) | Catálogo/documentação: mostra os componentes e o código de exemplo | **Não.** Só consulta |
| **Pacotes npm `@plataforma-xvia/*`** | O código dos componentes que sua aplicação usa | **Sim** |
| **Registry do GitLab MS** | "Loja" privada onde os pacotes ficam (não é o npmjs.org) | Configura no `.npmrc` |
| **Token do GitLab** | Sua senha de leitura pra baixar da loja privada | Cria no GitLab |

Pacotes:

- `ds-react` — componentes React (`<DsButton>`, `<DsServiceCard>`…)
- `ds-core` — motor dos componentes (Stencil)
- `ds-tokens` — cores, espaçamentos, fontes (CSS)
- `ds-icons` — ícones

---

## 2. Pré-requisitos

- Node.js 22+
- Usuário no `gitlabs.ms.gov.br` **membro do grupo `xvia`**. Sem isso dá `404 Group not found`
  mesmo com token certo. Peça a inclusão à equipe X-Via.

---

## 3. Passo a passo

### 3.1 Criar o token no GitLab

1. `gitlabs.ms.gov.br` → avatar → **Preferences** → **Personal access tokens**
2. **Generate token → Legacy token**
3. Nome: `npm-design-system`, validade ~90 dias, escopo: **só `read_api`**
4. Copie o token (só aparece uma vez). **Nunca cole em chat, e-mail ou arquivo do projeto.**

### 3.2 Guardar o token numa variável de ambiente

Nunca coloque o token dentro de arquivo do projeto.

```bash
setx GITLAB_MS_NPM_TOKEN "SEU_TOKEN_AQUI"
```

**Feche e abra o terminal** depois disso.

### 3.3 Testar se o token tem acesso

Use o comando do **seu** terminal. Prompt `C:\Users\voce>` = **cmd**; `PS C:\...>` = **PowerShell**.

cmd:

```bash
curl.exe -H "PRIVATE-TOKEN: %GITLAB_MS_NPM_TOKEN%" https://gitlabs.ms.gov.br/api/v4/groups/3661
```

PowerShell:

```bash
curl.exe -H "PRIVATE-TOKEN: $env:GITLAB_MS_NPM_TOKEN" https://gitlabs.ms.gov.br/api/v4/groups/3661
```

- JSON com `"full_path":"xvia"` → ok, siga.
- `401 Unauthorized` → token não chegou (sintaxe do terminal errada, terminal não reaberto, token inválido).
- `404 Group not found` → usuário não é membro do grupo `xvia`. Peça acesso.

### 3.4 Configurar os dois `.npmrc`

⚠️ **Ponto que mais trava.** A doc do Storybook põe o token no `.npmrc` do projeto, mas o pnpm
atual **ignora** token com `${VAR}` nesse arquivo (proteção de segurança). Divida em dois:

**Projeto** (`.npmrc` na raiz, já está aqui) — diz *onde* buscar:

```ini
@plataforma-xvia:registry=https://gitlabs.ms.gov.br/api/v4/groups/3661/-/packages/npm/
save-exact=true
```

**Usuário** (`C:\Users\voce\.npmrc`, crie se não existir) — diz *com qual token*. Linha exata:

```ini
//gitlabs.ms.gov.br/:_authToken=${GITLAB_MS_NPM_TOKEN}
```

Use o host puro (`//gitlabs.ms.gov.br/`), não o caminho do grupo: a lista de versões vem de
`/groups/3661/...`, mas o arquivo `.tgz` vem de `/projects/3067/...`. Com o caminho do grupo o
download dá 404.

### 3.5 Instalar

```bash
npx.cmd -y pnpm@10 add @plataforma-xvia/ds-react @plataforma-xvia/ds-core @plataforma-xvia/ds-tokens @plataforma-xvia/ds-icons
```

> `npx.cmd -y pnpm@10` evita dois problemas comuns no Windows da SETDIG: `corepack enable`
> pede admin e o PowerShell bloqueia scripts `.ps1`. Se `pnpm` já funciona na sua máquina, use direto.

### 3.6 Rodar

```bash
npx.cmd -y pnpm@10 dev
```

Abra http://localhost:3000.

---

## 4. O que o código faz (4 arquivos)

| Arquivo | Papel |
|---|---|
| `next.config.ts` | `serverExternalPackages: ["@plataforma-xvia/ds-core"]` — obrigatório, o DS roda no servidor |
| `app/layout.tsx` | Injeta o CSS dos tokens/temas no `<head>` (sem isso, componentes ficam sem estilo) |
| `app/page.tsx` | **Server Component** — importa de `@plataforma-xvia/ds-react/server`. HTML pronto do servidor |
| `app/faq.tsx` | **Client Component** (`"use client"`) — importa de `@plataforma-xvia/ds-react`. Tem estado e eventos |

**Regra de ouro:** qual import usar?

- Componente só mostra conteúdo → `@plataforma-xvia/ds-react/server`
- Componente precisa de clique/estado (`useState`, `onDsX`) → `@plataforma-xvia/ds-react` + `"use client"`

Pra achar outros componentes: abra o Storybook, escolha o componente, aba **Code**, copie o snippet JSX.

---

## 5. Checklist de homologação

- [x] `npx.cmd -y pnpm@10 view @plataforma-xvia/ds-react version` mostra uma versão
- [x] `pnpm dev` sobe sem erro
- [x] HTML do card já vem do servidor (SSR, sem JavaScript)
- [x] Card "Vistoria de prevenção de incêndio" e botão "Buscar serviços" aparecem estilizados
- [x] Acordeão abre/fecha (modo exclusivo)
- [x] Paginação muda o número "Página atual"
- [x] Console do navegador sem erros
- [x] `pnpm build` passa

---

## 6. Erros comuns

| Erro | Causa | Solução |
|---|---|---|
| `404 Group not found` | Usuário não é membro do grupo `xvia` | Pedir acesso à X-Via (ver 3.3) |
| `401 Unauthorized` no curl | `$env:` usado no cmd, ou terminal não reaberto após `setx` | Comando certo do 3.3 |
| `Ignored project-level auth setting` + `ERR_PNPM_FETCH_401` | Token no `.npmrc` do projeto | Mover para o `.npmrc` do usuário (3.4) |
| `ERR_PNPM_FETCH_404 .../projects/3067/...tgz` | Auth restrita ao caminho do grupo | Usar `//gitlabs.ms.gov.br/:_authToken` (3.4) |
| `Moving X that was installed by a different package manager` | Rodou `npm install` antes | Apague `package-lock.json`, use só pnpm |
| `pnpm não é reconhecido` | pnpm não instalado | Use `npx.cmd -y pnpm@10 ...` |
| `npx.ps1 não pode ser carregado` | Política de scripts do PowerShell | Use `npx.cmd` em vez de `npx` |
| `EPERM ... Program Files\nodejs` | `corepack enable` sem admin | Não precisa, use `npx.cmd -y pnpm@10` |
| Componente sem estilo | Faltou o `<style>` do `layout.tsx` | Confira o `app/layout.tsx` |
| Erro de `window`/`document` no build | Faltou `serverExternalPackages` | Confira o `next.config.ts` |

---

## Referências

- Storybook: https://designsystem.digital.ms.gov.br → **Primeiros passos → React**
- Repositório do DS: `xvia/xvia-platform-ds` (GitLab MS) — `CHANGELOG.md` de cada pacote
