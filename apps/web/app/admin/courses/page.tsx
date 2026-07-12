"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Input } from "@repo/ui/input"
import { Search, Star, Eye, EyeOff, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

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

  const filtered = courses.filter((c) => {
    const matchesSearch = (c.title || "").toLowerCase().includes(search.toLowerCase()) || 
                          (c.instructor || "").toLowerCase().includes(search.toLowerCase())
    if (filter === "All") return matchesSearch
    
    const status = c.status || "Published"
    return matchesSearch && status === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-muted-foreground mt-1">Approve, feature, or remove courses from the platform.</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/create">Create Course</Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search courses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Published", "Pending Review", "Flagged"].map((f) => (
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
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Course</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground hidden sm:table-cell">Students</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground hidden md:table-cell">Rating</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p>Fetching courses...</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No courses found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => {
                    const status = c.status || "Published"
                    return (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {c.title}
                              {c.featured && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                            </p>
                            <p className="text-xs text-muted-foreground">By {c.instructor || "Unknown"}</p>
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell text-muted-foreground">{(c.students || 0).toLocaleString()}</td>
                        <td className="p-4 hidden md:table-cell">
                          {c.rating > 0 ? (
                            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{c.rating}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge variant={status === "Published" ? "default" : status === "Pending Review" ? "secondary" : "destructive"} className="text-xs">
                            {status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {status === "Pending Review" && (
                              <Button size="sm" variant="outline" className="h-7 text-xs">Approve</Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Toggle featured">
                              <Star className={`h-3.5 w-3.5 ${c.featured ? "fill-amber-400 text-amber-400" : ""}`} />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Toggle visibility">
                              {status === "Flagged" ? <EyeOff className="h-3.5 w-3.5 text-red-500" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500" title="Delete">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
