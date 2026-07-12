"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { BookOpen, Star, Zap, TrendingUp, ArrowRight, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query, limit } from "firebase/firestore"

export default function DashboardPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Real stats would be fetched from a user document in a production app
  const STATS = [
    { label: "Courses Enrolled", value: "4", icon: BookOpen, color: "text-blue-500" },
    { label: "Hours Learned", value: "28h", icon: TrendingUp, color: "text-green-500" },
    { label: "Badges Earned", value: "7", icon: Star, color: "text-amber-500" },
    { label: "Streak", value: "12 days", icon: Zap, color: "text-violet-500" },
  ]

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const q = query(collection(db, "courses"), limit(4))
        const snapshot = await getDocs(q)
        const fetchedCourses: any[] = []
        snapshot.forEach((doc) => {
          fetchedCourses.push({ id: doc.id, ...doc.data() })
        })
        setCourses(fetchedCourses)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const enrolled = courses.slice(0, 2)
  const recommended = courses.slice(2, 4)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.displayName || user?.email?.split('@')[0] || "Student"} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your learning today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`${color} bg-current/10 p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue learning */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Continue Learning</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/my-courses">See all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </div>
        
        {enrolled.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
            <BookOpen className="h-8 w-8 mb-3 opacity-50" />
            <p className="text-sm">You haven't enrolled in any courses yet.</p>
            <Button variant="link" size="sm" asChild className="mt-1">
              <Link href="/learn/courses">Browse courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolled.map((course) => (
              <Card key={course.id} className="hover:border-foreground/20 transition-all">
                <CardContent className="p-5 flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"} alt={course.title} className="w-20 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="font-semibold text-sm line-clamp-1">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.instructor || "Platform Instructor"}</p>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "45%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">45% complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Recommended for You</h2>
        {recommended.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
            <Sparkles className="h-8 w-8 mb-3 opacity-50" />
            <p className="text-sm">No recommendations available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommended.map((course) => (
              <Card key={course.id} className="hover:border-foreground/20 transition-all">
                <CardContent className="p-4 flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"} alt={course.title} className="w-16 h-12 rounded-md object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{course.title}</p>
                    <Badge variant="secondary" className="text-xs mt-1">{course.difficulty || "Beginner"}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
