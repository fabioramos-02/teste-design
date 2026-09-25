// Relatório gerencial — Server Component: conteúdo sai pronto no HTML, nada vai para o JS do cliente
import { DsBadge, DsCard, DsPageHeader, DsSectionHeading } from "@plataforma-xvia/ds-react/server";
import { relatorio, type Status, type Tema } from "./relatorio";

const STATUS: Record<Status, { label: string; tone: "success" | "info" | "warning" | "danger"; icon: string }> = {
  concluido: { label: "Concluído", tone: "success", icon: "check-circle" },
  andamento: { label: "Em andamento", tone: "info", icon: "clock" },
  atencao: { label: "Atenção", tone: "warning", icon: "alert-triangle" },
  risco: { label: "Risco", tone: "danger", icon: "alert-triangle" },
};

const GRUPOS: { titulo: string; status: Status[] }[] = [
  { titulo: "Concluído", status: ["concluido"] },
  { titulo: "Em andamento", status: ["andamento"] },
  { titulo: "Pendente ou em decisão", status: ["risco", "atencao"] },
];

const r = relatorio;
const total = (s: Status) => r.temas.filter((t) => t.status === s).length;

function Cartao({ tema }: { tema: Tema }) {
  const s = STATUS[tema.status];
  return (
    <DsCard heading={tema.titulo} headingLevel="3" icon={s.icon}>
      <DsBadge tone={s.tone} size="sm">{s.label}</DsBadge>
      <p className="item__meta">{tema.resumo}</p>
      {tema.links && (
        <ul className="links">
          {tema.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
            </li>
          ))}
        </ul>
      )}
    </DsCard>
  );
}

export default function Relatorio() {
  return (
    <>
      <div className="section section--muted">
        <div className="wrap">
          <DsPageHeader
            eyebrow={`Relatório gerencial · ${r.periodo}`}
            heading="Projeto X-VIA — Portal Único e App MS Digital"
            description={r.resumo}
            icon="file-text"
          />
          <dl className="kpis">
            <div><dt>Reuniões</dt><dd>{r.reunioes}</dd></div>
            <div><dt>Concluídos</dt><dd>{total("concluido")}</dd></div>
            <div><dt>Em andamento</dt><dd>{total("andamento")}</dd></div>
            <div><dt>Atenção</dt><dd>{total("atencao")}</dd></div>
            <div><dt>Risco</dt><dd>{total("risco")}</dd></div>
          </dl>
        </div>
      </div>

      {GRUPOS.map((g) => {
        const temas = r.temas.filter((t) => g.status.includes(t.status));
        if (!temas.length) return null;
        return (
          <section className="section" key={g.titulo}>
            <div className="wrap">
              <DsSectionHeading heading={`${g.titulo} (${temas.length})`} headingLevel="2" />
              <div className="grid">
                {temas.map((t) => <Cartao key={t.titulo} tema={t} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section section--muted">
        <div className="wrap grid">
          <DsCard heading="Foco do próximo ciclo" headingLevel="2" icon="arrow-right">
            <ol className="lista">
              {r.foco.map((f) => <li key={f}>{f}</li>)}
            </ol>
          </DsCard>
          <DsCard heading="Marcos" headingLevel="2" icon="check-circle">
            <ul className="lista">
              {r.marcos.map((m) => <li key={m.marco}><strong>{m.data}</strong> — {m.marco}</li>)}
            </ul>
          </DsCard>
          <DsCard heading="Contrato" headingLevel="2" icon="file-text">
            <p className="item__meta">{r.contrato.numero}</p>
            <dl className="contrato">
              <dt>Valor</dt><dd>{r.contrato.valor}</dd>
              <dt>Vigência</dt><dd>{r.contrato.vigencia}</dd>
              <dt>Implantação</dt><dd>{r.contrato.implantacao}</dd>
              <dt>Escopo</dt><dd>{r.contrato.escopo}</dd>
            </dl>
          </DsCard>
        </div>
      </section>

      <p className="wrap muted fonte">
        Fontes: backlog TFS, atas, e-mails, WhatsApp e Mattermost. Atualizado em {r.atualizado}.
      </p>
    </>
  );
}
