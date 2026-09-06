import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const title =
  "Nexistown . Sua agenda para de furar. Seu Google para de te esconder.";
const description =
  "Presença digital para clínicas e negócios de agenda em Parnaíba. A gente corrige o que espanta paciente no Google, faz a agenda parar de furar e chama de volta quem sumiu. Diagnóstico gratuito.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s . Nexistown",
  },
  description,
  applicationName: site.name,
  keywords: [
    "agência de marketing Parnaíba",
    "Google Meu Negócio para clínicas",
    "marketing para clínica odontológica Parnaíba",
    "presença digital Parnaíba",
    "reduzir falta de paciente",
    "site para clínica Parnaíba",
  ],
  authors: [{ name: site.founder }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/n-icon-white.png",
    apple: "/brand/n-icon-white.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1116",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-[4px] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-bone"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
