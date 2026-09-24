"use client";
// CRUD client: estado em memória + localStorage.
// ponytail: sem backend; troque load/save por fetch quando houver API.
import { useEffect, useState } from "react";
import {
  DsBadge,
  DsButton,
  DsCard,
  DsCheckbox,
  DsCombobox,
  DsRadio,
  DsSelect,
  DsSwitch,
} from "@plataforma-xvia/ds-react";

type Status = "recebida" | "analise" | "agendada" | "aprovada" | "reprovada";
type Risco = "baixo" | "medio" | "alto";
type Vistoria = {
  id: string;
  estabelecimento: string;
  municipio: string;
  tipo: string;
  risco: Risco;
  status: Status;
  urgente: boolean;
};
type Alerta = { tone: "success" | "info" | "warning" | "danger"; icon: string; titulo: string; texto: string };

const STATUS: Record<Status, { label: string; tone: "neutral" | "info" | "primary" | "success" | "danger" }> = {
  recebida: { label: "Recebida", tone: "neutral" },
  analise: { label: "Em análise", tone: "info" },
  agendada: { label: "Agendada", tone: "primary" },
  aprovada: { label: "Aprovada", tone: "success" },
  reprovada: { label: "Reprovada", tone: "danger" },
};
const RISCO: Record<Risco, { label: string; tone: "success" | "warning" | "danger" }> = {
  baixo: { label: "Risco baixo", tone: "success" },
  medio: { label: "Risco médio", tone: "warning" },
  alto: { label: "Risco alto", tone: "danger" },
};
const TIPOS = ["Comercial", "Industrial", "Residencial multifamiliar", "Evento temporário", "Escola"];
const MUNICIPIOS = ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí", "Nova Andradina", "Aquidauana", "Sidrolândia", "Maracaju"];

const SEED: Vistoria[] = [
  { id: "CBM-2026-0412", estabelecimento: "Mercado Bom Preço", municipio: "Campo Grande", tipo: "Comercial", risco: "medio", status: "analise", urgente: false },
  { id: "CBM-2026-0398", estabelecimento: "Escola Estadual Pantanal", municipio: "Corumbá", tipo: "Escola", risco: "alto", status: "agendada", urgente: true },
  { id: "CBM-2026-0377", estabelecimento: "Festa do Peão 2026", municipio: "Dourados", tipo: "Evento temporário", risco: "alto", status: "recebida", urgente: true },
  { id: "CBM-2026-0351", estabelecimento: "Metalúrgica Três Lagoas", municipio: "Três Lagoas", tipo: "Industrial", risco: "medio", status: "aprovada", urgente: false },
];
const KEY = "poc-vistorias";

function novoId() {
  return `CBM-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

export function Crud() {
  const [lista, setLista] = useState<Vistoria[]>(SEED);
  const [editando, setEditando] = useState<Vistoria | null>(null);
  const [excluir, setExcluir] = useState<Vistoria | null>(null);
  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [filtro, setFiltro] = useState<"" | Status>("");
  const [busca, setBusca] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(KEY);
      if (salvo) setLista(JSON.parse(salvo));
    } catch {}
  }, []);

  function salvar(nova: Vistoria[]) {
    setLista(nova);
    try {
      localStorage.setItem(KEY, JSON.stringify(nova));
    } catch {}
  }

  function limparForm() {
    setEditando(null);
    setMunicipio("");
    setFormKey((k) => k + 1);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const estabelecimento = String(f.get("estabelecimento") ?? "").trim();
    const mun = String(f.get("municipio") ?? municipio);
    if (!estabelecimento || !mun || !f.get("declaracao")) {
      setAlerta({
        tone: "danger",
        icon: "alert-circle",
        titulo: "Confira o formulário",
        texto: "Preencha estabelecimento, município e marque a declaração.",
      });
      return;
    }
    const dados: Vistoria = {
      id: editando?.id ?? novoId(),
      estabelecimento,
      municipio: mun,
      tipo: String(f.get("tipo")),
      risco: String(f.get("risco")) as Risco,
      status: (String(f.get("status") ?? "recebida") as Status),
      urgente: f.get("urgente") !== null,
    };
    if (editando) {
      salvar(lista.map((v) => (v.id === dados.id ? dados : v)));
      setAlerta({ tone: "info", icon: "check-circle", titulo: "Vistoria atualizada", texto: `${dados.id} — ${dados.estabelecimento}.` });
    } else {
      salvar([dados, ...lista]);
      setAlerta({ tone: "success", icon: "check-circle", titulo: "Vistoria cadastrada", texto: `Protocolo ${dados.id} gerado.` });
    }
    limparForm();
  }

  function editar(v: Vistoria) {
    setEditando(v);
    setMunicipio(v.municipio);
    setFormKey((k) => k + 1);
    setAlerta(null);
    document.getElementById("form-vistoria")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function confirmarExclusao() {
    if (!excluir) return;
    salvar(lista.filter((v) => v.id !== excluir.id));
    setAlerta({ tone: "warning", icon: "alert-triangle", titulo: "Vistoria excluída", texto: `${excluir.id} removida do painel.` });
    if (editando?.id === excluir.id) limparForm();
    setExcluir(null);
  }

  const termo = busca.trim().toLowerCase();
  const visiveis = lista.filter(
    (v) =>
      (!filtro || v.status === filtro) &&
      (!termo || v.id.toLowerCase().includes(termo) || v.estabelecimento.toLowerCase().includes(termo)),
  );

  return (
    <div className="crud">
      <div className="crud__form" id="form-vistoria">
        <DsCard heading={editando ? `Editar ${editando.id}` : "Nova vistoria"} headingLevel="2" icon={editando ? "file-text" : "plus"} brandHeader>
          <form key={formKey} className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="estabelecimento">Estabelecimento</label>
              <input
                id="estabelecimento"
                name="estabelecimento"
                className="input"
                defaultValue={editando?.estabelecimento}
                autoComplete="organization"
                required
              />
            </div>

            <DsCombobox
              label="Município"
              name="municipio"
              placeholder="Digite para filtrar"
              fullWidth
              value={municipio}
              options={JSON.stringify(MUNICIPIOS.map((m) => ({ label: m, value: m })))}
              onDsComboboxChange={(e) => setMunicipio(e.detail.value)}
            />

            <DsSelect
              label="Tipo de ocupação"
              name="tipo"
              fullWidth
              value={editando?.tipo ?? TIPOS[0]}
              options={JSON.stringify(TIPOS.map((t) => ({ label: t, value: t })))}
            />

            <div className="field">
              <fieldset>
                <legend>Classificação de risco</legend>
                <div className="row">
                  {(Object.keys(RISCO) as Risco[]).map((r) => (
                    <DsRadio
                      key={r}
                      name="risco"
                      value={r}
                      label={RISCO[r].label.replace("Risco ", "")}
                      checked={(editando?.risco ?? "baixo") === r}
                    />
                  ))}
                </div>
              </fieldset>
            </div>

            {editando && (
              <DsSelect
                label="Status"
                name="status"
                fullWidth
                value={editando.status}
                options={JSON.stringify(
                  (Object.keys(STATUS) as Status[]).map((s) => ({ label: STATUS[s].label, value: s })),
                )}
              />
            )}

            <DsSwitch name="urgente" value="1" label="Atendimento urgente" checked={editando?.urgente ?? false} />
            <DsCheckbox
              name="declaracao"
              value="1"
              label="Declaro que as informações são verdadeiras"
              checked={!!editando}
            />

            <div className="row">
              <DsButton type="submit" icon={editando ? "check" : "plus"}>
                {editando ? "Salvar alterações" : "Cadastrar"}
              </DsButton>
              {editando && (
                <DsButton type="button" appearance="text" tone="neutral" onClick={limparForm}>
                  Cancelar
                </DsButton>
              )}
            </div>
          </form>
        </DsCard>
      </div>

      <div>
        <div role="status" aria-live="polite">
          {alerta && (
            <div className="alert">
              <DsCard tone={alerta.tone} icon={alerta.icon} heading={alerta.titulo} headingLevel="3">
                <p>{alerta.texto}</p>
                <DsButton slot="actions" size="sm" appearance="text" tone="neutral" icon="close" onClick={() => setAlerta(null)}>
                  Fechar
                </DsButton>
              </DsCard>
            </div>
          )}
        </div>

        {excluir && (
          <div className="alert" role="alertdialog" aria-labelledby="confirma-titulo">
            <DsCard tone="danger" icon="alert-triangle" heading="Excluir vistoria?" headingId="confirma-titulo" headingLevel="3">
              <p>
                {excluir.id} — {excluir.estabelecimento}. Esta ação não pode ser desfeita.
              </p>
              <div slot="actions" className="row">
                <DsButton size="sm" tone="danger" icon="close" onClick={confirmarExclusao}>
                  Excluir
                </DsButton>
                <DsButton size="sm" appearance="outline" tone="neutral" onClick={() => setExcluir(null)}>
                  Manter
                </DsButton>
              </div>
            </DsCard>
          </div>
        )}

        <div className="toolbar">
          <div className="field" style={{ flex: "1 1 16rem" }}>
            <label htmlFor="busca">Buscar</label>
            <input
              id="busca"
              className="input"
              type="search"
              placeholder="Protocolo ou estabelecimento"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          {/* change nativo do <select> interno sobe até aqui */}
          <div onChange={(e) => setFiltro((e.target as unknown as HTMLSelectElement).value as "" | Status)}>
            <DsSelect
              label="Status"
              name="filtro"
              inline
              value={filtro}
              options={JSON.stringify([
                { label: "Todos", value: "" },
                ...(Object.keys(STATUS) as Status[]).map((s) => ({ label: STATUS[s].label, value: s })),
              ])}
            />
          </div>
        </div>

        <p className="muted">
          {visiveis.length} de {lista.length} vistorias
        </p>

        {visiveis.length === 0 ? (
          <DsCard tone="info" icon="info" heading="Nenhuma vistoria encontrada" headingLevel="3">
            <p>Ajuste a busca ou o filtro de status.</p>
          </DsCard>
        ) : (
          <div className="stack reveal">
            {visiveis.map((v) => (
              <DsCard key={v.id} heading={v.estabelecimento} headingLevel="3" icon="building">
                <p className="item__meta">
                  {v.id} · {v.municipio} · {v.tipo}
                </p>
                <div className="row">
                  <DsBadge tone={STATUS[v.status].tone}>{STATUS[v.status].label}</DsBadge>
                  <DsBadge tone={RISCO[v.risco].tone} size="sm">{RISCO[v.risco].label}</DsBadge>
                  {v.urgente && <DsBadge tone="danger" icon="flame" size="sm">Urgente</DsBadge>}
                </div>
                <div slot="actions" className="row">
                  <DsButton size="sm" appearance="outline" icon="file-text" onClick={() => editar(v)}>
                    Editar
                  </DsButton>
                  <DsButton size="sm" appearance="text" tone="danger" icon="close" onClick={() => setExcluir(v)}>
                    Excluir
                  </DsButton>
                </div>
              </DsCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
