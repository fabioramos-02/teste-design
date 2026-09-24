import type { Metadata } from "next";
import { DsBreadcrumb, DsButton, DsPageHeader, DsServiceCard } from "@plataforma-xvia/ds-react/server";
import { href, REPO } from "../href";
import { listDocs } from "./lib";

export const metadata: Metadata = { title: "Documentação · Bombeiros MS" };

export default function DocsIndex() {
  return (
    <>
      <div className="section section--muted">
        <div className="wrap">
          <DsPageHeader
            heading="Documentação"
            eyebrow="Guias"
            description="Como instalar e usar o Design System MS numa aplicação Next.js. Mesmo conteúdo da pasta docs/ do repositório."
            icon="book"
          >
            <DsBreadcrumb slot="breadcrumb" items={JSON.stringify([{ label: "Início", href: href("/") }, { label: "Documentação" }])} />
            <DsButton slot="actions" href={REPO} target="_blank" appearance="outline" icon="external-link" iconPosition="end">
              Repositório no GitHub
            </DsButton>
          </DsPageHeader>
        </div>
      </div>
      <section className="section">
        <div className="wrap grid">
          {listDocs().map((d) => (
            <DsServiceCard key={d.slug} heading={d.title} href={href(`/docs/${d.slug}/`)} headingLevel="2" ctaLabel="Ler guia" accent />
          ))}
        </div>
      </section>
    </>
  );
}
