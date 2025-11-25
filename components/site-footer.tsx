"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail } from "lucide-react"

export function SiteFooter() {
  const pathname = usePathname()

  // Don't show footer on admin routes
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Julian Brendlin. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:hello@galaxyscape.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
