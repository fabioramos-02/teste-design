// Server Component: HTML sai pronto do servidor
import { DsButton, DsFooter, DsIcon, DsServiceCard } from "@plataforma-xvia/ds-react/server";
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

      <DsFooter columns='[{"heading":"Sobre o ms.gov.br","links":[{"label":"Saiba mais","href":"#"},{"label":"Perguntas frequentes","href":"#"}]},{"heading":"Conheça MS","links":[{"label":"Terra de Riquezas","href":"#"},{"label":"História","href":"#"}]},{"heading":"Informações","links":[{"label":"Agência de Notícias","href":"#"},{"label":"Diário Oficial","href":"#"}]},{"heading":"Navegação","links":[{"label":"Acessibilidade","href":"#"},{"label":"Mapa do site","href":"#"}]}]' bottomLinks='[{"label":"Termos de Uso","href":"#termos"},{"label":"Política de Privacidade","href":"#privacidade"}]'>
        <div slot="address">
          <strong>Governadoria do Estado de Mato Grosso do Sul</strong>
          <br />
          Av. do Poeta Manoel de Barros — Parque dos Poderes, Campo Grande - MS
        </div>
        <span slot="brand">
          <DsIcon name="shield" size="xl" label="Estado de Mato Grosso do Sul" />
        </span>
        <span slot="bottom-start">SETDIG | Secretaria-Executiva de Transformação Digital</span>
      </DsFooter>

      <Faq />
    </main>
  );
}
