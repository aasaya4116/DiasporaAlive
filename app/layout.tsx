import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

const description =
  "Trace the global impact of African diaspora cultures on an interactive map — music, cuisine, religion, language, and festivals across the Americas, Caribbean, and Europe, with an AI guide that curates journeys through the history."

export const metadata: Metadata = {
  metadataBase: new URL("https://diaspora-alive.vercel.app"),
  title: "Diaspora Alive — Interactive African Diaspora Culture Map",
  description,
  applicationName: "Diaspora Alive",
  openGraph: {
    title: "Diaspora Alive",
    description,
    url: "/",
    siteName: "Diaspora Alive",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diaspora Alive",
    description,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${jetbrainsMono.variable} ${dmSerif.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
