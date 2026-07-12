"use client"

import { useState, useEffect } from "react"
import { CourseCard } from "../../../components/course-card"
import { FilterSidebar } from "../../../components/filter-sidebar"
import { Badge } from "@repo/ui/badge"
import { Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const q = query(collection(db, "courses"))
        const snapshot = await getDocs(q)
        const fetchedCourses: any[] = []
        snapshot.forEach((doc) => {
          fetchedCourses.push({ id: doc.id, ...doc.data() })
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-2xl">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Learn</Badge>
        <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
        <p className="text-muted-foreground mt-2">
          Jumpstart your career with premium courses from industry experts and the community.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block">
          <FilterSidebar />
        </aside>
        
        <main className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
              <Sparkles className="h-10 w-10 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="max-w-md text-center mb-6">There are currently no courses available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
