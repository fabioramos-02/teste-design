import type { Metadata } from "next";
import { DS_FALLBACK_CSS } from "@plataforma-xvia/ds-core/fallback-css";
import { DS_THEMES_CSS, DS_TOKENS_CSS } from "@plataforma-xvia/ds-tokens/css-text";
import {
  DsAccessibilityBar,
  DsFooter,
  DsHeader,
  DsIcon,
  DsNavbar,
} from "@plataforma-xvia/ds-react/server";
import "./app.css";

const CRITICAL_CSS = `${DS_TOKENS_CSS}\n${DS_THEMES_CSS}\n${DS_FALLBACK_CSS}`;

const NAV = JSON.stringify([
  { label: "Início", href: "/", icon: "home" },
  { label: "Vistorias", href: "/vistorias", icon: "file-text" },
  { label: "Design System", href: "https://designsystem.digital.ms.gov.br", icon: "external-link" },
]);

export const metadata: Metadata = {
  title: "Bombeiros MS · POC Design System",
  description: "Prova de conceito do Design System MS (X-Via) — dados fictícios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      </head>
      <body>
        <header>
          <DsAccessibilityBar
            links={JSON.stringify([
              { label: "Ir para conteúdo", href: "#conteudo" },
              { label: "Ir para rodapé", href: "#rodape" },
            ])}
          />
          <DsHeader homeHref="/" homeLabel="Início — Bombeiros MS" navItems={NAV}>
            <span slot="brand" className="brand">
              <DsIcon name="flame" size="xl" />
              <span>
                <strong>Corpo de Bombeiros</strong>
                <small>Mato Grosso do Sul · POC</small>
              </span>
            </span>
          </DsHeader>
          <DsNavbar label="Navegação principal" items={NAV} autoCurrent />
        </header>

        <main id="conteudo">{children}</main>

        <DsFooter
          id="rodape"
          columns={JSON.stringify([
            {
              heading: "Bombeiros MS",
              links: [
                { label: "Solicitar vistoria", href: "/vistorias" },
                { label: "Perguntas frequentes", href: "/#faq" },
              ],
            },
            {
              heading: "Design System",
              links: [
                { label: "Storybook", href: "https://designsystem.digital.ms.gov.br" },
                { label: "Guia React", href: "https://designsystem.digital.ms.gov.br/?path=/docs/primeiros-passos-react--docs" },
              ],
            },
            {
              heading: "Governo de MS",
              links: [
                { label: "ms.gov.br", href: "https://www.ms.gov.br" },
                { label: "SETDIG", href: "https://www.setdig.ms.gov.br" },
              ],
            },
          ])}
          bottomLinks={JSON.stringify([{ label: "Dados fictícios — uso demonstrativo", href: "#" }])}
        >
          <div slot="address">
            <strong>Prova de conceito</strong>
            <br />
            Conteúdo fictício para demonstrar componentes do Design System MS.
          </div>
          <span slot="brand">
            <DsIcon name="shield" size="xl" label="Estado de Mato Grosso do Sul" />
          </span>
          <span slot="bottom-start">SETDIG | Secretaria-Executiva de Transformação Digital</span>
        </DsFooter>
      </body>
    </html>
  );
}
