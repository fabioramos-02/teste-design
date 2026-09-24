// Server Component: HTML sai pronto do servidor
import { DsButton, DsServiceCard } from "@plataforma-xvia/ds-react/server";
import { Faq } from "./faq";

export default function Page() {
  return (
    <main style={{ padding: "var(--ds-space-4)" }}>
      <h1>POC Design System MS</h1>
      <DsServiceCard
        heading="Vistoria de prevenção de incêndio"
        eyebrow="Corpo de Bombeiros"
        href="/servicos/vistoria"
        headingLevel="2"
      />
      <DsButton href="/servicos" icon="search">
        Buscar serviços
      </DsButton>
      <Faq />
    </main>
  );
}
