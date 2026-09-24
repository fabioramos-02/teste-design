import type { Metadata } from "next";
import { DsBreadcrumb, DsPageHeader } from "@plataforma-xvia/ds-react/server";
import { Crud } from "./crud";

export const metadata: Metadata = { title: "Vistorias · Bombeiros MS" };

export default async function Page({ searchParams }: PageProps<"/vistorias">) {
  const { q } = await searchParams;
  return (
    <>
      <div className="section section--muted">
        <div className="wrap">
          <DsPageHeader
            heading="Solicitações de vistoria"
            eyebrow="Painel"
            description="Cadastre, edite e acompanhe as vistorias. Dados fictícios, guardados só neste navegador."
            icon="file-text"
          >
            <DsBreadcrumb
              slot="breadcrumb"
              items={JSON.stringify([{ label: "Início", href: "/" }, { label: "Vistorias" }])}
            />
          </DsPageHeader>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <Crud initialQuery={typeof q === "string" ? q : ""} />
        </div>
      </section>
    </>
  );
}
