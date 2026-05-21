import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "FastFood | Restaurante Digital",
    template: "%s | FastFood",
  },
  description:
    "Proyecto full stack con Next.js, Prisma, MongoDB y una demo navegable pensada para portfolio técnico y entrevistas.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Prisma",
    "MongoDB",
    "portfolio",
    "full stack",
    "restaurante digital",
  ],
  openGraph: {
    title: "FastFood | Restaurante Digital",
    description:
      "Quiosco digital con panel admin, server actions, validación tipada y modo demo tolerante a fallos para reviews técnicas.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${manrope.className} bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}
