"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Users, BookOpen, Loader2, Plus } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, courses: 0 })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentReports, setRecentReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch users count
        const usersSnap = await getDocs(collection(db, "users"))
        const coursesSnap = await getDocs(collection(db, "courses"))
        setStats({
          users: usersSnap.size,
          courses: coursesSnap.size,
        })

        // Recent users
        const recentUsersArr: any[] = []
        usersSnap.forEach((doc) => {
          recentUsersArr.push({ id: doc.id, ...doc.data() })
        })
        setRecentUsers(recentUsersArr.slice(0, 4))

        // Recent reports
        const reportsSnap = await getDocs(collection(db, "reports"))
        const reportsArr: any[] = []
        reportsSnap.forEach((doc) => {
          reportsArr.push({ id: doc.id, ...doc.data() })
        })
        setRecentReports(reportsArr.slice(0, 3))
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const STATS_CONFIG = [
    { label: "Total Users", value: loading ? "..." : stats.users.toLocaleString(), icon: Users, color: "text-blue-500" },
    { label: "Active Courses", value: loading ? "..." : stats.courses.toLocaleString(), icon: BookOpen, color: "text-green-500" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and key metrics.</p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/courses/create"><Plus className="mr-1.5 h-3.5 w-3.5" />New Course</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {STATS_CONFIG.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Users</CardTitle>
            <Button size="sm" variant="ghost" asChild><Link href="/admin/users">View all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : recentUsers.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-6">No users found.</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                    {u.displayName ? u.displayName.slice(0, 2) : (u.email?.slice(0, 2) || "U?")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{u.displayName || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{u.email || "No email"}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={u.role === "admin" ? "default" : "secondary"} className="text-xs capitalize">{u.role || "student"}</Badge>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {u.createdAt ? new Date(u.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Reports</CardTitle>
            <Button size="sm" variant="ghost" asChild><Link href="/admin/reports">View all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : recentReports.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-6">No reports found.</p>
            ) : (
              recentReports.map((r) => {
                const status = r.status || "Pending"
                return (
                  <div key={r.id} className="flex items-start gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${status === "Pending" ? "bg-amber-500" : "bg-green-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{r.target || "Unknown target"}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-xs">{r.type || "Other"}</Badge>
                        <span className="text-xs text-muted-foreground">{r.time || "Recently"}</span>
                      </div>
                    </div>
                    <Badge variant={status === "Pending" ? "secondary" : "default"} className="text-xs shrink-0">{status}</Badge>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>


    </div>
  )
}

