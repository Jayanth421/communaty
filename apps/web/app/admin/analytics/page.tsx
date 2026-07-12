"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { BarChart3, Users, BookOpen, Globe, TrendingUp, Activity, Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query, limit } from "firebase/firestore"

export default function AdminAnalyticsPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const MONTHLY_DATA = [
    { month: "Jan", signups: 820, courses: 12, revenue: 8400 },
    { month: "Feb", signups: 940, courses: 15, revenue: 9200 },
    { month: "Mar", signups: 1100, courses: 18, revenue: 12800 },
    { month: "Apr", signups: 1350, courses: 22, revenue: 15600 },
    { month: "May", signups: 1680, courses: 25, revenue: 19200 },
    { month: "Jun", signups: 2100, courses: 28, revenue: 22400 },
    { month: "Jul", signups: 2480, courses: 32, revenue: 24680 },
  ]

  const TRAFFIC = [
    { country: "🇺🇸 United States", users: "34%", sessions: "42k" },
    { country: "🇮🇳 India", users: "22%", sessions: "28k" },
    { country: "🇬🇧 United Kingdom", users: "12%", sessions: "15k" },
    { country: "🇩🇪 Germany", users: "8%", sessions: "10k" },
    { country: "🇧🇷 Brazil", users: "6%", sessions: "7.5k" },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, "courses"), limit(5)) 
        const snapshot = await getDocs(q)
        const fetchedCourses: any[] = []
        snapshot.forEach((doc) => {
          fetchedCourses.push({ id: doc.id, ...doc.data() })
        })
        setCourses(fetchedCourses)

        // Simple approximation for demo
        const uQ = query(collection(db, "users"), limit(100))
        const uSnap = await getDocs(uQ)
        setUsersCount(uSnap.size) 
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const maxSignups = Math.max(...MONTHLY_DATA.map((d) => d.signups))

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading analytics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6" />Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform-wide metrics and growth insights.</p>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: usersCount > 0 ? usersCount.toString() : "0", icon: Users },
          { label: "Active Courses", value: courses.length.toString(), icon: BookOpen },
          { label: "Avg Session", value: "14m 32s", icon: Activity },
          { label: "Countries", value: "42", icon: Globe },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-5 flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Signup Growth Chart */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4" />User Signups (2025)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-foreground">{(d.signups / 1000).toFixed(1)}k</span>
                <div className="w-full bg-primary rounded-t-md transition-all hover:bg-primary/80" style={{ height: `${(d.signups / maxSignups) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Top Courses by Enrollment</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {courses.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p>No courses available.</p>
              </div>
            ) : (
              courses.map((c, i) => {
                const enrollments = c.students || 0
                const completion = Math.floor(Math.random() * 40) + 40 // Mock completion rate
                return (
                  <div key={c.id || c.title} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                        {c.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{enrollments.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${completion}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{completion}% avg completion</p>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* Traffic by Country */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" />Traffic by Country</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {TRAFFIC.map((t) => (
              <div key={t.country} className="flex items-center justify-between">
                <span className="font-medium text-sm">{t.country}</span>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">{t.sessions} sessions</Badge>
                  <span className="text-sm font-bold w-10 text-right">{t.users}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
