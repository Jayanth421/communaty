"use client"

import { useAuth } from "../../context/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { adminNavGroups } from "./admin-control-data"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login")
      }
      else if (role !== "admin") {
        router.replace("/dashboard")
      }
    }
  }, [user, role, loading, router])

  if (loading || !user || role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground animate-pulse text-sm">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border pt-5 px-3 gap-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div className="px-3 py-2 mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">Control Center</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
        </div>
        {adminNavGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{group.label}</p>
            {group.items.map(({ href, label, icon: Icon }) => {
              const active = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              )
            })}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {adminNavGroups.flatMap((group) => group.items).map(({ href, label, icon: Icon }) => {
            const active = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </div>
        {children}
      </main>
    </div>
  )
}
