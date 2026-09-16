import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeniffer Souza | Cílios e Sobrancelhas em Rio Branco",
  description:
    "Cílios Look Francês e design de sobrancelhas com Jeniffer Souza, Arte no Olhar, em Rio Branco - AC. Escolha um serviço e consulte horários pelo WhatsApp.",
  openGraph: {
    title: "Jeniffer Souza | Cílios e Sobrancelhas em Rio Branco",
    description:
      "Portfólio profissional de Jeniffer Souza, Arte no Olhar, especialista em cílios e sobrancelhas em Rio Branco - AC.",
    locale: "pt_BR",
    siteName: "Jeniffer Souza | Arte no Olhar",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeniffer Souza | Cílios e Sobrancelhas em Rio Branco",
    description:
      "Conheça os serviços de cílios e sobrancelhas da Arte no Olhar e converse pelo WhatsApp."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF6F2"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
