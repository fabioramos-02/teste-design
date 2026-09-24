# 4. Sobre a POC

Portal fictício do Corpo de Bombeiros MS. Só componentes e tokens do DS — nenhuma cor escrita à mão.

## Telas

| Tela | O que faz | Componentes |
|---|---|---|
| **Moldura** | Topo e rodapé de todas as páginas | `DsAccessibilityBar` `DsHeader` `DsNavbar` `DsIcon` `DsFooter` |
| **Home** `/` | Página institucional | `DsSearch` `DsStat` `DsCard` `DsSectionHeading` `DsServiceCard` `DsTile` `DsSteps` `DsLinkCard` `DsNewsCard` `DsAccordion` `DsPagination` `DsFeedback` |
| **Vistorias** `/vistorias` | CRUD: cadastrar, buscar, filtrar, editar, excluir | `DsPageHeader` `DsBreadcrumb` `DsCombobox` `DsSelect` `DsRadio` `DsSwitch` `DsCheckbox` `DsButton` `DsBadge` `DsCard` |

29 de 34 componentes do DS em uso. Dados salvos no `localStorage` (sem backend).

## Arquivos

| Arquivo | Papel |
|---|---|
| `next.config.ts` | `serverExternalPackages` do DS |
| `app/layout.tsx` | CSS crítico + moldura |
| `app/app.css` | Layout (`@layer app`, só tokens) |
| `app/page.tsx` | Home (Server) |
| `app/faq.tsx` | FAQ paginado (Client) |
| `app/vistorias/page.tsx` | Cabeçalho da tela (Server) |
| `app/vistorias/crud.tsx` | CRUD (Client) |
| `.github/workflows/ci.yml` | Build no GitHub com o token via secret |

## Homologação — 24/09/2026

Ambiente: Windows 11, Node 22.14, pnpm 10.34.5, Next.js 16.3.6, React 19.2.8.
DS: `ds-react 0.3.2` · `ds-core 0.3.2` · `ds-tokens 0.2.0` · `ds-icons 0.2.0`.

- [x] Registry responde com token
- [x] `pnpm build` passa
- [x] HTML vem pronto do servidor (SSR, sem JavaScript)
- [x] Componentes estilizados
- [x] Acordeão, paginação, combobox interativos
- [x] CRUD completo com alertas
- [x] Console sem erros

## Lacunas do DS (levar à X-Via)

| Falta | Contorno na POC |
|---|---|
| Campo de texto (`input`) | `<input>` nativo com tokens |
| Alerta / toast | `DsCard` com `tone` + `aria-live` |
| Tabela | Lista de `DsCard` |
| Modal / diálogo | `DsCard tone="danger"` inline com `role="alertdialog"` |
| Doc do `.npmrc` no Storybook | Não funciona no pnpm atual — ver [Passo 4](01-instalacao.md#passo-4--configurar-os-dois-npmrc) |

---

Anterior: [3. Erros comuns](03-erros.md) · Voltar ao [README](../README.md)
