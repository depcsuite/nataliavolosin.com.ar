import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond, Arimo } from "next/font/google"
import "./globals.css"

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
})

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Natalia Volosin - La Justa",
  description: "Portal de análisis independiente",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${ebGaramond.variable} ${arimo.variable}`}>
      <body className="font-arimo antialiased">{children}</body>
    </html>
  )
}
