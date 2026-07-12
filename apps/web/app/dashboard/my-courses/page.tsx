"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Clock, Star, Loader2, BookOpen } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    async function fetchCourses() {
      try {
        const q = query(collection(db, "courses"))
        const snapshot = await getDocs(q)
        const fetchedCourses: any[] = []
        snapshot.forEach((doc, i) => {
          // Assign mock progress since we don't have user-specific enrollments yet
          const progress = [45, 72, 10, 100, 28, 60][fetchedCourses.length % 6] ?? 0
          fetchedCourses.push({ id: doc.id, ...doc.data(), progress })
        })
        setCourses(fetchedCourses)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filtered = courses.filter((c) => {
    if (filter === "All") return true
    if (filter === "Completed") return c.progress === 100
    if (filter === "In Progress") return c.progress > 0 && c.progress < 100
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Courses</h1>
        <p className="text-muted-foreground mt-1">Track your learning progress across all enrolled courses.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "In Progress", "Completed", "Bookmarked"].map((f) => (
          <Badge
            key={f}
            variant={f === filter ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setFilter(f)}
          >
            {f}
          </Badge>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading your courses...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <BookOpen className="h-8 w-8 mb-3 opacity-50" />
          <p className="text-sm">No courses found.</p>
          <Button variant="link" size="sm" asChild className="mt-1">
            <Link href="/learn/courses">Browse courses</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((course) => (
            <Card key={course.id} className="hover:border-foreground/20 transition-all">
              <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"}
                  alt={course.title}
                  className="w-full sm:w-28 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold">{course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.instructor || "Platform Instructor"}</p>
                    </div>
                    <Badge variant={course.progress === 100 ? "default" : "secondary"} className="text-xs shrink-0">
                      {course.progress === 100 ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{course.progress}% complete</span>
                      {course.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>}
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {course.rating > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{course.rating}
                      </span>
                    )}
                    {course.progress === 100 ? (
                      <Button size="sm" variant="outline" className="h-7 text-xs">View Certificate</Button>
                    ) : (
                      <Button size="sm" className="h-7 text-xs" asChild>
                        <Link href={`/learn/courses/${course.id}`}>Continue</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
