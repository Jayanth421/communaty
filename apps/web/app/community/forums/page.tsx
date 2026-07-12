"use client"

import { useState, useEffect } from "react"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { MessageSquare, Hash, TrendingUp, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function ForumsPage() {
  const [forums, setForums] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchForums() {
      try {
        const q = query(collection(db, "forums"))
        const snapshot = await getDocs(q)
        const fetchedForums: any[] = []
        snapshot.forEach((doc) => {
          fetchedForums.push({ id: doc.id, ...doc.data() })
        })
        setForums(fetchedForums)
      } catch (error) {
        console.error("Error fetching forums:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchForums()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-3">Community</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Forums</h1>
          <p className="text-muted-foreground mt-2">Ask questions, share knowledge, and help each other grow.</p>
        </div>
        <Button>+ New Thread</Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[["0", "Members Online"], ["0", "Threads Today"], ["0", "Total Replies"]].map(([val, label]) => (
          <Card key={label} className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{val}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category list */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Loading forums...</p>
          </div>
        ) : forums.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
            <Sparkles className="h-10 w-10 mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No forums found</h3>
            <p className="max-w-md text-center mb-6">Create the first forum category to get discussions started!</p>
            <Button>+ Create Category</Button>
          </div>
        ) : (
          forums.map((cat) => (
            <Card key={cat.id} className="hover:border-foreground/20 transition-all cursor-pointer group">
              <CardContent className="p-5 flex items-start gap-5">
                <div className="text-3xl shrink-0">{cat.emoji || "💬"}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{cat.description}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-muted-foreground space-y-1 hidden sm:block">
                  <div className="flex items-center gap-1 justify-end"><Hash className="h-3 w-3" />{(cat.threads || 0).toLocaleString()} threads</div>
                  <div className="flex items-center gap-1 justify-end"><MessageSquare className="h-3 w-3" />{(cat.replies || 0).toLocaleString()} replies</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Trending threads */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Trending Threads</h2>
        <div className="space-y-2">
          <Card className="border-dashed border-2 bg-muted/20">
            <CardContent className="p-8 text-center text-muted-foreground text-sm">
              No trending threads right now. Start a discussion!
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
