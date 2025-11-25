import type React from "react"
import type { Metadata, Viewport } from "next"
import { Anaheim, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const anaheim = Anaheim({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-anaheim",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GalaxyScape | Astrophotography by Julian Brendlin",
  description:
    "Capturing the cosmos and landscapes from the Black Forest, Germany. Fine art astrophotography and landscape photography prints.",
  keywords: ["astrophotography", "landscape photography", "Black Forest", "Germany", "fine art prints", "night sky"],
  authors: [{ name: "Julian Brendlin" }],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1f" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anaheim.className} ${playfair.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
