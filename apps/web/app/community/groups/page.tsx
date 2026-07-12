"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Users, MessageSquare, TrendingUp, Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

const categories = ["All", "Frontend", "AI/ML", "Design", "Community", "Infrastructure", "Mobile", "Career", "Security"]

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    async function fetchGroups() {
      try {
        const q = query(collection(db, "groups"))
        const snapshot = await getDocs(q)
        const fetchedGroups: any[] = []
        snapshot.forEach((doc) => {
          fetchedGroups.push({ id: doc.id, ...doc.data() })
        })
        setGroups(fetchedGroups)
      } catch (error) {
        console.error("Error fetching groups:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGroups()
  }, [])

  const filtered = selectedCategory === "All" ? groups : groups.filter(g => g.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-3">Community</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Discover Groups</h1>
          <p className="text-muted-foreground mt-2">Find your community and start collaborating.</p>
        </div>
        <Button>+ Create Group</Button>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((c) => (
          <Badge 
            key={c} 
            variant={c === selectedCategory ? "default" : "secondary"} 
            className="cursor-pointer"
            onClick={() => setSelectedCategory(c)}
          >
            {c}
          </Badge>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading groups...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <Sparkles className="h-10 w-10 mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No groups found</h3>
          <p className="max-w-md text-center mb-6">There are no groups in this category yet. Be the first to create one and start a new community!</p>
          <Button>+ Create Group</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((g) => (
            <Card key={g.id} className="flex flex-col hover:border-foreground/20 transition-all hover:shadow-sm">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{g.emoji || "🌐"}</div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{g.name}</CardTitle>
                  <Badge variant="outline" className="text-xs shrink-0">{g.category || "Community"}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <p className="text-sm text-muted-foreground flex-1">{g.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{(g.members || 0).toLocaleString()}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{(g.posts || 0).toLocaleString()} posts</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" />Active</span>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/community/feed">Join Group</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
