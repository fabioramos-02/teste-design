"use client";
// Client component: estado + eventos onDsX
import { useState } from "react";
import { DsAccordion, DsAccordionItem, DsPagination } from "@plataforma-xvia/ds-react";

const PERGUNTAS = [
  ["Quem precisa de vistoria?", "Todo estabelecimento comercial, industrial ou de reunião de público."],
  ["Qual o prazo de análise?", "Em média 7 dias úteis após o envio completo."],
  ["A vistoria tem custo?", "Sim, conforme a área e o risco. Isenções para MEI."],
  ["Posso remarcar?", "Sim, até 48 horas antes pelo painel de vistorias."],
  ["O certificado vence?", "Vale por 1 a 3 anos, conforme o risco da ocupação."],
  ["Como denunciar risco?", "Ligue 193 em emergência ou use a Ouvidoria."],
];
const POR_PAGINA = 3;

export function Faq() {
  const [page, setPage] = useState(1);
  const itens = PERGUNTAS.slice((page - 1) * POR_PAGINA, page * POR_PAGINA);
  return (
    <div className="stack">
      <DsAccordion exclusive key={page}>
        {itens.map(([q, a], i) => (
          <DsAccordionItem key={q} heading={q} open={i === 0}>
            <p>{a}</p>
          </DsAccordionItem>
        ))}
      </DsAccordion>
      <DsPagination
        page={page}
        totalPages={Math.ceil(PERGUNTAS.length / POR_PAGINA)}
        onDsPageChange={(e) => setPage(e.detail.page)}
      />
    </div>
  );
}
