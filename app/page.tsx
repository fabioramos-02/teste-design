// Home — Server Component: todo o HTML sai pronto do servidor (legível sem JavaScript)
import {
  DsButton,
  DsCard,
  DsFeedback,
  DsLinkCard,
  DsNewsCard,
  DsSearch,
  DsSectionHeading,
  DsServiceCard,
  DsStat,
  DsSteps,
  DsTile,
} from "@plataforma-xvia/ds-react/server";
import { Faq } from "./faq";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap reveal">
          <span className="hero__eyebrow">Corpo de Bombeiros Militar de MS</span>
          <h1>Segurança contra incêndio, sem fila e sem papel.</h1>
          <p>
            Solicite vistorias, acompanhe processos e tire dúvidas. Esta página é uma prova de
            conceito do Design System MS — todo o conteúdo é fictício.
          </p>
          <div className="hero__search">
            <DsSearch
              action="/vistorias"
              name="q"
              label="Buscar vistoria"
              placeholder="Busque por protocolo ou estabelecimento"
              size="lg"
              highlight
            />
          </div>
        </div>
      </section>

      <div className="wrap stats reveal">
        <DsCard><DsStat value="1.284" label="vistorias em 2026" /></DsCard>
        <DsCard><DsStat value="7 dias" label="prazo médio de análise" /></DsCard>
        <DsCard><DsStat value="79" label="municípios atendidos" /></DsCard>
      </div>

      <section className="section">
        <div className="wrap">
          <DsSectionHeading
            heading="Serviços"
            description="Os mais procurados pelo cidadão e pelas empresas."
            headingLevel="2"
          >
            <DsButton slot="actions" href="/vistorias" appearance="text" icon="arrow-right" iconPosition="end">
              Ver todos
            </DsButton>
          </DsSectionHeading>
          <div className="grid reveal">
            <DsServiceCard
              heading="Solicitar vistoria de prevenção"
              eyebrow="Vistoria"
              href="/vistorias"
              headingLevel="3"
              accent
              tags={JSON.stringify([{ label: "Online", tone: "success" }])}
            />
            <DsServiceCard
              heading="Emitir certificado de conformidade"
              eyebrow="Certificado"
              href="#"
              headingLevel="3"
              tags={JSON.stringify([{ label: "Online", tone: "success" }])}
            />
            <DsServiceCard
              heading="Licença para evento temporário"
              eyebrow="Eventos"
              href="#"
              headingLevel="3"
              tags={JSON.stringify([{ label: "Presencial", tone: "warning" }])}
            />
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="wrap">
          <DsSectionHeading heading="Categorias" headingLevel="2" />
          <div className="grid grid--tiles reveal">
            <DsTile href="#" icon="flame" description="Projetos e vistorias">Prevenção</DsTile>
            <DsTile href="#" icon="building" description="Comércio e indústria">Empresas</DsTile>
            <DsTile href="#" icon="users" description="Shows e feiras">Eventos</DsTile>
            <DsTile href="#" icon="book" description="Cursos e palestras">Educação</DsTile>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <DsSectionHeading heading="Como solicitar a vistoria" headingLevel="2" />
            <DsSteps
              items={JSON.stringify([
                { title: "Cadastre o estabelecimento", description: "Nome, endereço e tipo de ocupação." },
                { title: "Informe o risco", description: "Baixo, médio ou alto, conforme a atividade." },
                { title: "Acompanhe o protocolo", description: "Status atualizado até o agendamento.", href: "/vistorias", hrefLabel: "Abrir painel" },
              ])}
            />
          </div>
          <DsLinkCard
            heading="Mais acessados"
            headingLevel="2"
            icon="star"
            numbered
            items={JSON.stringify([
              { label: "Consultar protocolo", href: "/vistorias" },
              { label: "Tabela de taxas", href: "#" },
              { label: "Normas técnicas", href: "#" },
              { label: "Portal do Governo de MS", href: "https://www.ms.gov.br", external: true },
            ])}
          />
        </div>
      </section>

      <section className="section section--muted">
        <div className="wrap">
          <DsSectionHeading heading="Notícias" headingLevel="2" />
          <div className="grid reveal">
            <DsNewsCard
              headline="Campanha de prevenção a queimadas começa em outubro"
              category="Prevenção"
              date="24/09/2026"
              excerpt="Equipes percorrem os 79 municípios com orientações à população."
              href="#"
              headingLevel="3"
            />
            <DsNewsCard
              headline="Vistorias agora 100% digitais"
              category="Serviços"
              date="20/09/2026"
              excerpt="Solicitação, pagamento e acompanhamento sem sair de casa."
              href="#"
              headingLevel="3"
            />
            <DsNewsCard
              headline="Novo curso de brigada voluntária"
              category="Educação"
              date="15/09/2026"
              excerpt="Inscrições abertas para empresas de todo o estado."
              href="#"
              headingLevel="3"
            />
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap split">
          <div>
            <DsSectionHeading heading="Perguntas frequentes" headingLevel="2" />
            <Faq />
          </div>
          <DsFeedback question="Esta página foi útil para você?" />
        </div>
      </section>
    </>
  );
}
