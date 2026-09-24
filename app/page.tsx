// Home — Server Component: HTML pronto do servidor
import { DsButton, DsPageHeader, DsSectionHeading, DsServiceCard } from "@plataforma-xvia/ds-react/server";

const SERVICOS = [
  { heading: "Solicitar vistoria de segurança contra incêndio", href: "/vistorias" },
  { heading: "Consultar protocolo de vistoria", href: "/vistorias" },
  { heading: "Editar ou cancelar solicitação", href: "/vistorias" },
];

export default function Home() {
  return (
    <>
      <div className="section section--muted">
        <div className="wrap">
          <DsPageHeader
            eyebrow="CBMMS · Homologação"
            heading="Design System MS no Corpo de Bombeiros"
            description="Ambiente de teste dos componentes do DS com um CRUD de vistorias. Dados fictícios."
            icon="flame"
          >
            <DsButton slot="actions" href="/vistorias" icon="arrow-right" iconPosition="end">
              Abrir CRUD de vistorias
            </DsButton>
          </DsPageHeader>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <DsSectionHeading heading="Serviços em destaque" headingLevel="2" />
          <div className="grid">
            {SERVICOS.map((s) => (
              <DsServiceCard key={s.heading} heading={s.heading} href={s.href} headingLevel="3" accent />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
