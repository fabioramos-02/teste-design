"use client";
// Client component: estado + eventos onDsX
import { useState } from "react";
import { DsAccordion, DsAccordionItem, DsPagination } from "@plataforma-xvia/ds-react";

export function Faq() {
  const [page, setPage] = useState(1);
  return (
    <>
      <DsAccordion exclusive>
        <DsAccordionItem heading="Como solicitar a vistoria?" open>
          <p>Página atual: {page}</p>
        </DsAccordionItem>
        <DsAccordionItem heading="Qual o prazo?">
          <p>Até 30 dias.</p>
        </DsAccordionItem>
      </DsAccordion>
      <DsPagination page={page} totalPages={5} onDsPageChange={(e) => setPage(e.detail.page)} />
    </>
  );
}
