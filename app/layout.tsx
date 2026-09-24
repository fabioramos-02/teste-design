import type { Metadata } from "next";
import { DS_FALLBACK_CSS } from "@plataforma-xvia/ds-core/fallback-css";
import { DS_THEMES_CSS, DS_TOKENS_CSS } from "@plataforma-xvia/ds-tokens/css-text";

const CRITICAL_CSS = `${DS_TOKENS_CSS}\n${DS_THEMES_CSS}\n${DS_FALLBACK_CSS}`;

export const metadata: Metadata = {
  title: "POC Design System MS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
