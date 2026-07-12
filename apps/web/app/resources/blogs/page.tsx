"use client"

import { useState, useEffect } from "react"
import { Badge } from "@repo/ui/badge"
import { Card, CardContent } from "@repo/ui/card"
import { ArrowRight, Clock, Loader2, BookOpen } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [tags, setTags] = useState<string[]>(["All"])

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, "blogs"))
        const snapshot = await getDocs(q)
        const fetchedBlogs: any[] = []
        const uniqueTags = new Set<string>()
        
        snapshot.forEach((doc) => {
          const data = doc.data()
          fetchedBlogs.push({ id: doc.id, slug: doc.id, ...data })
          if (data.tag) {
            uniqueTags.add(data.tag)
          }
        })
        
        setBlogs(fetchedBlogs)
        setTags(["All", ...Array.from(uniqueTags)])
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter(b => filter === "All" || b.tag === filter)

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">Resources</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-2">In-depth articles from the COMMUNTAY community and expert contributors.</p>
      </div>

      {!loading && blogs.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {tags.map((t) => (
            <Badge 
              key={t} 
              variant={t === filter ? "default" : "secondary"} 
              className="cursor-pointer"
              onClick={() => setFilter(t)}
            >
              {t}
            </Badge>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading blogs...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <BookOpen className="h-8 w-8 mb-3 opacity-50" />
          <p>No blogs found for the selected category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((b, i) => (
            <Link key={b.slug || b.id} href={`/resources/blogs/${b.slug || b.id}`} className="group">
              <Card className={`h-full hover:border-foreground/20 transition-all hover:shadow-sm ${i === 0 ? "md:col-span-2" : ""}`}>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{b.tag || "General"}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />{b.readTime || "5 min read"}
                    </span>
                  </div>
                  <h2 className={`font-bold group-hover:text-primary transition-colors ${i === 0 ? "text-2xl" : "text-lg"}`}>{b.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{b.excerpt || "Click to read more about this topic."}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                        {b.avatar || (b.author ? b.author.slice(0, 2).toUpperCase() : "AD")}
                      </div>
                      <span className="font-medium">{b.author || "Admin"}</span>
                      <span className="text-muted-foreground">· {b.date || new Date().toLocaleDateString()}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
