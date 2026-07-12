"use client"

import { useAuth } from "../../context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, BookOpen, Flag, BarChart3, Settings, Shield } from "lucide-react"

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/reports", label: "Reports", icon: Flag },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login")
      }
      // Temporarily disabled role check so you can access the admin page
      // else if (role !== "admin") {
      //   router.replace("/dashboard")
      // }
    }
  }, [user, role, loading, router])

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground animate-pulse text-sm">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-border pt-6 px-3 gap-1 sticky top-14 h-[calc(100vh-3.5rem)]">
        <div className="px-3 py-2 mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">Admin Panel</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
        </div>
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">{children}</main>
    </div>
  )
}
