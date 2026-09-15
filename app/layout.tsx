import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "LangWeather — Monitoramento de risco de alagamento",
  description:
    "Protótipo de visualização de áreas de risco de alagamento na zona rural de Araranguá e Criciúma (SC), com dados hipotéticos de chuva, vento e sugestões de drenagem.",
};

const THEME_INIT = `
try {
  var stored = localStorage.getItem('langweather-theme');
  if (stored !== 'light') document.documentElement.classList.add('dark');
} catch (e) {
  document.documentElement.classList.add('dark');
}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
      </head>
      <body className="font-sans bg-ink text-paper antialiased transition-colors">
        {children}
      </body>
    </html>
  );
}
