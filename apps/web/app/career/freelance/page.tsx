"use client"

import { useState, useEffect } from "react"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"
import { DollarSign, Clock, Star, MapPin, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function FreelancePage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "freelance_projects"))
        const snapshot = await getDocs(q)
        const fetchedProjects: any[] = []
        snapshot.forEach((doc) => {
          fetchedProjects.push({ id: doc.id, ...doc.data() })
        })
        setProjects(fetchedProjects)
      } catch (error) {
        console.error("Error fetching freelance projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-3">Career</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Freelance Marketplace</h1>
          <p className="text-muted-foreground mt-2">Post a project or find freelance work in the COMMUNTAY community.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild><Link href="/signup">Browse Freelancers</Link></Button>
          <Button asChild><Link href="/signup">+ Post Project</Link></Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
            <Sparkles className="h-10 w-10 mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="max-w-md text-center mb-6">There are no freelance projects posted right now.</p>
          </div>
        ) : (
          projects.map((p) => (
            <Card key={p.id} className="hover:border-foreground/20 transition-all group">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
                  {p.remote && <Badge variant="secondary">Remote</Badge>}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{p.budget}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.duration}</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{p.proposals || 0} proposals</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />Client: {p.client || "Confidential"}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {(p.tags || []).map((t: string) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/signup">Submit Proposal</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
