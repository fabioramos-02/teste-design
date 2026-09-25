# Relatório X-VIA — SETDIG

Relatório gerencial do projeto X-VIA (Portal Único e App MS Digital): o que foi concluído, o que está em andamento e o que está pendente.
Feito com o [Design System MS](https://designsystem.digital.ms.gov.br) e protegido por senha.

> 🔒 **Ver:** https://fabioramos-02.github.io/teste-design/ (pede a senha do relatório)

## Onde fica o conteúdo

| Arquivo | No git? |
|---|---|
| `data/relatorio.json` — relatório real | **Não** (repo é público). Peça o arquivo ao responsável |
| `data/relatorio.exemplo.json` — mesmo formato, texto fictício | Sim. Usado quando o real não existe |

## Rodar

1. Esteja **na rede do governo** (ou VPN) e com acesso ao grupo **`xvia`** no `gitlabs.ms.gov.br`.
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

Abra http://localhost:3000. Travou? Veja [Erros comuns](docs/03-erros.md).

## Publicar

```bash
setx RELATORIO_SENHA "senha-do-relatorio"
```

```bash
npx.cmd -y pnpm@10 run deploy
```

O script gera o site, **criptografa cada página com a senha** (StatiCrypt, AES) e envia para a branch `gh-pages`. Detalhes em [Sobre o site](docs/04-sobre.md).

## Documentação

| | |
|---|---|
| [1. Instalação](docs/01-instalacao.md) | Passo a passo completo, token, `.npmrc`, rede |
| [2. Como usar](docs/02-como-usar.md) | Server × Client, props, formulários, alertas |
| [3. Erros comuns](docs/03-erros.md) | Mensagem de erro → solução |
| [4. Sobre o site](docs/04-sobre.md) | Arquivos, atualizar o relatório, publicar com senha, lacunas do DS |

## Links

- Storybook: https://designsystem.digital.ms.gov.br
- Repositório do DS: `xvia/xvia-platform-ds` (GitLab MS)
