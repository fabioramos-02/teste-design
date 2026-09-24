# 1. Instalação

Do zero até `pnpm dev` rodando. ~15 minutos.

## Entenda as peças

| Peça | O que é | Você faz |
|---|---|---|
| **Storybook** (designsystem.digital.ms.gov.br) | Catálogo: mostra componentes e código | Só consulta |
| **Pacotes `@plataforma-xvia/*`** | Código dos componentes | Instala |
| **Registry do GitLab MS** | Onde os pacotes ficam (privado, não é o npmjs.org) | Configura no `.npmrc` |
| **Token do GitLab** | Senha de leitura do registry | Cria no GitLab |

Pacotes: `ds-react` (componentes React), `ds-core` (motor), `ds-tokens` (cores, espaço, fonte), `ds-icons` (ícones).

## Pré-requisitos

- Node.js 22+
- Usuário no `gitlabs.ms.gov.br` **membro do grupo `xvia`**. Peça à equipe X-Via.

## Passo 1 — Criar o token

1. `gitlabs.ms.gov.br` → avatar → **Preferences** → **Personal access tokens**
2. **Generate token → Legacy token**
3. Nome `npm-design-system`, validade ~90 dias, escopo **só `read_api`**
4. Copie (aparece uma vez)

> ⚠️ Token é senha. Nunca cole em chat, e-mail, print ou arquivo do projeto.

## Passo 2 — Guardar numa variável de ambiente

```bash
setx GITLAB_MS_NPM_TOKEN "SEU_TOKEN"
```

**Feche e abra o terminal.**

## Passo 3 — Testar o acesso

Qual terminal? `C:\Users\voce>` = **cmd** · `PS C:\...>` = **PowerShell**.

cmd:

```bash
curl.exe -H "PRIVATE-TOKEN: %GITLAB_MS_NPM_TOKEN%" https://gitlabs.ms.gov.br/api/v4/groups/3661
```

PowerShell:

```bash
curl.exe -H "PRIVATE-TOKEN: $env:GITLAB_MS_NPM_TOKEN" https://gitlabs.ms.gov.br/api/v4/groups/3661
```

| Resposta | Significa |
|---|---|
| JSON com `"full_path":"xvia"` | ✅ Siga |
| `401 Unauthorized` | Token não chegou: sintaxe do terminal, terminal não reaberto ou token inválido |
| `404 Group not found` | Não é membro do grupo `xvia` |

## Passo 4 — Configurar os dois `.npmrc`

> ⚠️ **Ponto que mais trava.** A doc do Storybook põe o token no `.npmrc` do projeto.
> O pnpm atual **ignora** isso por segurança. Separe em dois arquivos:

**Projeto** — `.npmrc` na raiz do repositório (diz *onde* buscar):

```ini
@plataforma-xvia:registry=https://gitlabs.ms.gov.br/api/v4/groups/3661/-/packages/npm/
save-exact=true
```

**Usuário** — `C:\Users\voce\.npmrc` (diz *com qual token*). Crie se não existir:

```ini
//gitlabs.ms.gov.br/:_authToken=${GITLAB_MS_NPM_TOKEN}
```

Use o host puro `//gitlabs.ms.gov.br/`. Com o caminho do grupo, o download do `.tgz` dá 404
(ele vem de `/projects/3067/...`, não de `/groups/3661/...`).

## Passo 5 — Instalar

Neste repositório (já tem os pacotes no `package.json`):

```bash
npx.cmd -y pnpm@10 install
```

Num projeto novo:

```bash
npx.cmd -y pnpm@10 add @plataforma-xvia/ds-react @plataforma-xvia/ds-core @plataforma-xvia/ds-tokens @plataforma-xvia/ds-icons
```

> Por que `npx.cmd -y pnpm@10`? No Windows da SETDIG, `corepack enable` pede admin e o
> PowerShell bloqueia `.ps1`. Se `pnpm` já funciona, use direto.

## Passo 6 — Rodar

```bash
npx.cmd -y pnpm@10 dev
```

Abra http://localhost:3000.

## Passo 7 (opcional) — CI no GitHub

`.github/workflows/ci.yml` instala e builda a cada push. Cadastre o token como secret:

```bash
gh secret set GITLAB_MS_NPM_TOKEN --repo fabioramos-02/teste-design
```

Pede o valor: cole e Enter. Ou pela tela: **Settings → Secrets and variables → Actions**.

---

Próximo: [2. Como usar os componentes](02-como-usar.md)
