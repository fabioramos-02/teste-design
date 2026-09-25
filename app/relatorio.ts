// Lê o relatório no build. O real (data/relatorio.json) fica fora do git; sem ele, usa o exemplo.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Status = "concluido" | "andamento" | "atencao" | "risco";
export type Tema = { titulo: string; status: Status; resumo: string; links?: { label: string; href: string }[] };
export type Relatorio = {
  periodo: string;
  reunioes: number;
  atualizado: string;
  resumo: string;
  contrato: { numero: string; valor: string; vigencia: string; implantacao: string; escopo: string };
  temas: Tema[];
  marcos: { marco: string; data: string }[];
  foco: string[];
};

const real = join(process.cwd(), "data", "relatorio.json");
const file = existsSync(real) ? real : join(process.cwd(), "data", "relatorio.exemplo.json");

export const relatorio: Relatorio = JSON.parse(readFileSync(file, "utf8"));
