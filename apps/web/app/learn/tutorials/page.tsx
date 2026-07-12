"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@repo/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Clock, Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

const categories = ["All", "Web", "React", "Python", "Database", "Tools"]

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    async function fetchTutorials() {
      try {
        const q = query(collection(db, "tutorials"))
        const snapshot = await getDocs(q)
        const fetchedTutorials: any[] = []
        snapshot.forEach((doc) => {
          fetchedTutorials.push({ id: doc.id, ...doc.data() })
        })
        setTutorials(fetchedTutorials)
      } catch (error) {
        console.error("Error fetching tutorials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTutorials()
  }, [])

  const filteredTutorials = activeCategory === "All" 
    ? tutorials 
    : tutorials.filter(t => t.category === activeCategory)

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Tutorials</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Tutorials</h1>
        <p className="text-muted-foreground mt-2">Short, hands-on coding tutorials on specific topics.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-52 shrink-0">
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Categories</h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted ${cat === activeCategory ? "bg-primary text-primary-foreground hover:bg-primary" : ""}`}>
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Loading tutorials...</p>
            </div>
          ) : filteredTutorials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
              <Sparkles className="h-10 w-10 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No tutorials found</h3>
              <p className="max-w-md text-center mb-6">There are no tutorials available in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredTutorials.map((t) => (
                <Link key={t.id} href={`/learn/tutorials/${t.slug || t.id}`} className="group">
                  <Card className="h-full transition-all hover:border-foreground/30 hover:shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="secondary" className="text-xs">{t.category}</Badge>
                        <Badge variant="outline" className="text-xs">{t.difficulty}</Badge>
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{t.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-3">
                      <p>{t.description}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{t.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
