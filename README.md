# POC — Design System MS (X-Via)

Aplicação Next.js de exemplo usando o [Design System MS](https://designsystem.digital.ms.gov.br):
portal fictício do Corpo de Bombeiros com **Home** e **CRUD de vistorias**.

Serve de referência para órgãos que vão consumir o DS.

> ✅ **Homologado em 24/09/2026** · Next.js 16 · `ds-react 0.3.2`
>
> 🌐 **Ver funcionando:** https://fabioramos-02.github.io/teste-design/

## Rodar em 4 passos

1. Esteja **na rede do governo** (ou VPN) e com acesso ao grupo **`xvia`** no `gitlabs.ms.gov.br` (peça à equipe X-Via).
2. Crie um token **Legacy** com escopo `read_api` e guarde:

   ```bash
   setx GITLAB_MS_NPM_TOKEN "SEU_TOKEN"
   ```

3. Adicione no **seu** `C:\Users\voce\.npmrc` (não no do projeto):

   ```ini
   //gitlabs.ms.gov.br/:_authToken=${GITLAB_MS_NPM_TOKEN}
   ```

4. Reabra o terminal e rode:

   ```bash
   npx.cmd -y pnpm@10 install
   ```

   ```bash
   npx.cmd -y pnpm@10 dev
   ```

Abra http://localhost:3000.

Travou? Veja [Erros comuns](docs/03-erros.md).

## Documentação

| | |
|---|---|
| [1. Instalação](docs/01-instalacao.md) | Passo a passo completo, token, `.npmrc`, rede |
| [2. Como usar](docs/02-como-usar.md) | Server × Client, props, formulários, alertas |
| [3. Erros comuns](docs/03-erros.md) | Mensagem de erro → solução |
| [4. Sobre a POC](docs/04-poc.md) | Telas, componentes, publicação, homologação, lacunas do DS |

Os mesmos guias aparecem no site, em [/docs](https://fabioramos-02.github.io/teste-design/docs/).

## Links

- Storybook: https://designsystem.digital.ms.gov.br
- Repositório do DS: `xvia/xvia-platform-ds` (GitLab MS)
