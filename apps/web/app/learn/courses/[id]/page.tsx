"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Star, Clock, Users, BookOpen, Check, Play, ChevronDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { doc, getDoc } from "firebase/firestore"

const CURRICULUM = [
  { section: "Getting Started", lessons: ["Introduction & Setup", "Course Overview", "Quick Wins"] },
  { section: "Core Concepts", lessons: ["Fundamentals Deep Dive", "Architecture Patterns", "Real-World Examples", "Mini Project"] },
  { section: "Advanced Topics", lessons: ["Performance Optimization", "Testing Strategies", "Deployment Best Practices"] },
  { section: "Final Project", lessons: ["Project Brief", "Building the App", "Code Review", "Deployment & Wrap-Up"] },
]

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourse() {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      if (!id) return
      
      try {
        const docRef = doc(db, "courses", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() })
        }
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p>Loading course...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
        <BookOpen className="h-10 w-10 mb-4 opacity-50" />
        <p className="text-xl font-semibold">Course not found</p>
        <Button variant="link" asChild className="mt-2">
          <Link href="/learn/courses">Browse all courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {course.tags?.map((t: string) => <Badge key={t} variant="secondary">{t}</Badge>)}
              {course.difficulty && <Badge variant="outline">{course.difficulty}</Badge>}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              {course.description || "Master the art of modern development with this comprehensive, project-based course. Designed for learners who want to go from zero to production-ready."}
            </p>
            <div className="flex flex-wrap gap-5 mt-4 text-sm">
              {course.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <strong>{course.rating}</strong>
                  {course.students > 0 && <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>}
                </span>
              )}
              {course.duration && <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-muted-foreground" />{course.duration}</span>}
              {course.instructor && <span className="flex items-center gap-1"><Users className="h-4 w-4 text-muted-foreground" />By {course.instructor}</span>}
            </div>
          </div>

          {/* What you'll learn */}
          <Card>
            <CardHeader><CardTitle>What You'll Learn</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Build real-world production-ready apps", "Understand core architecture patterns", "Write clean, maintainable code", "Deploy to the cloud with CI/CD", "Testing and quality assurance", "Career-ready project portfolio"].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Curriculum */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Curriculum</h2>
            {CURRICULUM.map((section) => (
              <Card key={section.section}>
                <CardHeader className="pb-3 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{section.section}</CardTitle>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {section.lessons.map((lesson) => (
                    <div key={lesson} className="flex items-center gap-2 text-sm py-1.5 border-t border-border/50">
                      <Play className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{lesson}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: sticky purchase card */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden relative bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <Play className="h-6 w-6 text-black fill-black ml-1" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <span className="text-3xl font-extrabold">
                    {!course.price || course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/signup">Enroll Now</Link>
                </Button>
                <Button className="w-full" size="lg" variant="outline">
                  Try Free Preview
                </Button>
                <ul className="text-sm text-muted-foreground space-y-2 pt-2">
                  <li className="flex gap-2"><BookOpen className="h-4 w-4 shrink-0 mt-0.5" />Full lifetime access</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />Certificate of completion</li>
                  <li className="flex gap-2"><Users className="h-4 w-4 shrink-0 mt-0.5" />Community discussion access</li>
                  {course.duration && <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 mt-0.5" />{course.duration} of content</li>}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
