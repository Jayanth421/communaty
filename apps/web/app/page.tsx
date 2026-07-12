"use client"

import { useState, useEffect } from "react"
import { Button } from "@repo/ui/button"
import { motion } from "framer-motion"
import { Search, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { CourseCard } from "../components/course-card"
import { db } from "@repo/firebase"
import { collection, getDocs, query, limit } from "firebase/firestore"

export default function Home() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const tags = [
    "React", "Next.js", "Python", "Artificial Intelligence", "Flutter",
    "Firebase", "Cyber Security", "UI/UX Design", "Cloud Computing", "Machine Learning"
  ]

  useEffect(() => {
    async function fetchCourses() {
      try {
        const q = query(collection(db, "courses"), limit(4))
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
    <div className="flex flex-col items-center justify-center px-4 pt-20 pb-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl space-y-8 text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Learn. <span className="text-muted-foreground">Build.</span><br />
          Connect. <span className="text-muted-foreground">Earn.</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          COMMUNTAY is an AI-powered platform where you can learn new skills, collaborate with others, build projects, and grow professionally.
        </p>

        <div className="mx-auto flex max-w-2xl items-center relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <input
            type="text"
            placeholder="Search for courses, tutorials, communities, jobs, or internships..."
            className="w-full rounded-full border border-input bg-background/50 px-12 py-4 text-base shadow-sm backdrop-blur transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary group-hover:border-foreground/20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button className="rounded-full rounded-l-none" size="sm">Search</Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
          <Button size="lg" className="rounded-full px-8 text-base h-12 w-full sm:w-auto">
            Start Learning
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12 w-full sm:w-auto">
            Explore Communities
          </Button>
        </div>

        <div className="pt-12 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto opacity-80 pb-20 border-b border-border/50">
          <span className="text-sm text-muted-foreground w-full mb-2">Trending Technologies</span>
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-muted cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <section className="w-full max-w-screen-2xl mx-auto py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Courses</h2>
            <p className="text-muted-foreground mt-1">Discover what the community is learning right now.</p>
          </div>
          <Button variant="ghost" className="group" asChild>
            <Link href="/explore">
              View all courses 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
