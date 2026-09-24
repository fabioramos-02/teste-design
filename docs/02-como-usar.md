# 2. Como usar os componentes

## Configuração obrigatória (uma vez)

**`next.config.ts`** — o DS roda no servidor, não pode ser empacotado:

```ts
const nextConfig: NextConfig = {
  serverExternalPackages: ["@plataforma-xvia/ds-core"],
};
```

**`app/layout.tsx`** — CSS dos tokens inline no `<head>` (sem isso, tudo fica sem estilo):

```tsx
import { DS_FALLBACK_CSS } from "@plataforma-xvia/ds-core/fallback-css";
import { DS_THEMES_CSS, DS_TOKENS_CSS } from "@plataforma-xvia/ds-tokens/css-text";

const CRITICAL_CSS = `${DS_TOKENS_CSS}\n${DS_THEMES_CSS}\n${DS_FALLBACK_CSS}`;

// dentro do <html>:
<head>
  <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
</head>
```

## Regra de ouro: qual import?

| Seu arquivo | Importe de | Quando |
|---|---|---|
| **Sem** `"use client"` (Server Component) | `@plataforma-xvia/ds-react/server` | Só mostra conteúdo |
| **Com** `"use client"` (Client Component) | `@plataforma-xvia/ds-react` | Precisa de estado, clique, evento |

Errou? Dá `Attempted to call createDsClientComponent() from the server`.
Nunca importe o mesmo componente das duas entradas.

**Server** — `app/page.tsx`:

```tsx
import { DsButton, DsServiceCard } from "@plataforma-xvia/ds-react/server";

export default function Page() {
  return (
    <>
      <DsServiceCard heading="Solicitar vistoria" eyebrow="Vistoria" href="/vistorias" headingLevel="3" />
      <DsButton href="/vistorias" icon="search">Buscar</DsButton>
    </>
  );
}
```

**Client** — `app/faq.tsx`:

```tsx
"use client";
import { useState } from "react";
import { DsPagination } from "@plataforma-xvia/ds-react";

export function Faq() {
  const [page, setPage] = useState(1);
  return <DsPagination page={page} totalPages={5} onDsPageChange={(e) => setPage(e.detail.page)} />;
}
```

## Regras das props

- **camelCase:** `headingLevel`, `fullWidth`, `totalPages`.
- **Listas vão como JSON em string:**

  ```tsx
  <DsBreadcrumb items={JSON.stringify([{ label: "Início", href: "/" }, { label: "Vistorias" }])} />
  ```

- **Eventos:** `dsX` do componente vira `onDsX` (só no client). Ex.: `onDsPageChange`, `onDsComboboxChange`.
- **Slots:** filho com `slot="nome"`. Ex.: `<span slot="brand">…</span>` no `DsHeader`.
- **Ícones:** `icon="flame"`, `"shield"`, `"search"`, `"check-circle"`… (lista em `node_modules/@plataforma-xvia/ds-icons/dist/index.d.ts`).

## Formulários

`DsSelect`, `DsCheckbox`, `DsRadio`, `DsSwitch` e `DsCombobox` geram **campos nativos** com `name`.
Leia tudo com `FormData` no submit — não precisa de estado por campo:

```tsx
function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  f.get("tipo");     // DsSelect name="tipo"
  f.get("urgente");  // DsSwitch: null se desligado
}
```

Campo de texto: o DS **não tem**. Use `<input>` nativo com os tokens (classe `.input` em `app/app.css`).

## Alertas

O DS **não tem** componente de alerta. Use `DsCard` com `tone` + `icon`, dentro de `aria-live`:

```tsx
<div role="status" aria-live="polite">
  <DsCard tone="success" icon="check-circle" heading="Vistoria cadastrada" headingLevel="3">
    <p>Protocolo CBM-2026-0412 gerado.</p>
  </DsCard>
</div>
```

| `tone` | Uso |
|---|---|
| `success` | Deu certo |
| `info` | Informação, atualização |
| `warning` | Atenção, ação feita com impacto |
| `danger` | Erro, confirmação de exclusão |

## Estilo da aplicação

- Seu CSS vai na camada `@layer app` e usa só tokens `--ds-*` (`--ds-space-4`, `--ds-color-surface-muted`…).
- Declare a ordem das camadas no topo do seu CSS:

  ```css
  @layer ds.primitives, ds.semantic, ds.theme, app;
  ```

- Tema escuro / alto contraste: `data-theme="dark"` ou `"high-contrast"` no `<html>`.

## Achar outros componentes

Storybook → componente → aba **Code** → copie o JSX.
Props exatas: `node_modules/@plataforma-xvia/ds-core/dist/docs.json`.

---

Anterior: [1. Instalação](01-instalacao.md) · Próximo: [3. Erros comuns](03-erros.md)
