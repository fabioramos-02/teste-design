# 4. Sobre o site

Relatório gerencial do projeto X-VIA (Portal Único e App MS Digital), feito só com componentes e tokens do Design System MS.

## Arquivos

| Arquivo | Papel |
|---|---|
| `data/relatorio.json` | Conteúdo real do relatório — **fora do git** (repo é público) |
| `data/relatorio.exemplo.json` | Mesmo formato, texto fictício. Usado quando o real não existe |
| `app/relatorio.ts` | Lê o JSON no build e define os tipos |
| `app/page.tsx` | Página do relatório (Server) |
| `app/layout.tsx` | CSS crítico + moldura |
| `app/app.css` | Layout (`@layer app`, só tokens) |
| `app/docs/` | Estes guias renderizados com o DS |
| `scripts/deploy.mjs` | Build, criptografia com senha e publicação no GitHub Pages |

## Atualizar o relatório

1. Edite `data/relatorio.json`. Cada tema tem `titulo`, `status` (`concluido`, `andamento`, `atencao`, `risco`), `resumo` e `links` opcionais.
2. Confira em `npx.cmd -y pnpm@10 dev`.
3. Publique (abaixo).

## Publicar com senha

O GitHub Actions não alcança o registry (ver [Rede](01-instalacao.md#rede-só-dentro-do-governo)).
O build roda **na sua máquina, dentro da rede**. O script criptografa cada HTML com a senha (AES, [StatiCrypt](https://github.com/robinmoisson/staticrypt)) e só então envia para a branch `gh-pages`:

```bash
setx RELATORIO_SENHA "senha-do-relatorio"
```

```bash
npx.cmd -y pnpm@10 run deploy
```

Sem a senha, nada do conteúdo é legível — nem no navegador, nem na branch `gh-pages`.
Trocar a senha = rodar o deploy de novo com outra `RELATORIO_SENHA`.

Site: https://fabioramos-02.github.io/teste-design/

## Lacunas do DS (levar à X-Via)

| Falta | Contorno |
|---|---|
| Campo de texto (`input`) | `<input>` nativo com tokens |
| Alerta / toast | `DsCard` com `tone` + `aria-live` |
| Tabela | Lista de `DsCard` |
| Modal / diálogo | `DsCard tone="danger"` inline com `role="alertdialog"` |
| Campo de senha | Tela de senha do StatiCrypt com as cores do DS |

---

Anterior: [3. Erros comuns](03-erros.md) · Voltar ao [README](../README.md)
