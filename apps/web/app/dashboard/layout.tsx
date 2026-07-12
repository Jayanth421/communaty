"use client"

import { useAuth } from "../../context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { BookOpen, MessageSquare, Bell, Award, Settings, User, LayoutDashboard, TrendingUp, Users } from "lucide-react"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/my-courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/teams", label: "Teams", icon: Users },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/achievements", label: "Achievements", icon: Award },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-muted-foreground text-sm animate-pulse">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-border pt-6 px-3 gap-1 sticky top-14 h-[calc(100vh-3.5rem)]">
        <div className="px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/50 to-primary text-primary-foreground font-bold text-sm flex items-center justify-center mb-1">
            {user.displayName?.charAt(0) ?? user.email?.charAt(0) ?? "U"}
          </div>
          <p className="font-semibold text-sm truncate">{user.displayName ?? "Student"}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </aside>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">{children}</main>
    </div>
  )
}
