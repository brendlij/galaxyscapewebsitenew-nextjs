"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, ImageIcon, FileText } from "lucide-react"

interface AdminHeaderProps {
  activeTab: "photos" | "blog"
}

export function AdminHeader({ activeTab }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/admin/login")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-light tracking-wider">
            GalaxyScape
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">Admin</span>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant={activeTab === "photos" ? "secondary" : "ghost"} size="sm" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Photos
            </Button>
          </Link>
          <Link href="/admin/dashboard/blog">
            <Button variant={activeTab === "blog" ? "secondary" : "ghost"} size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Blog
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-4">
            <LogOut className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  )
}
