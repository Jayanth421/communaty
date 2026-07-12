"use client"

import { useState, useEffect } from "react"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"
import { MapPin, Calendar, GraduationCap, Building2, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function InternshipsPage() {
  const [internships, setInternships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInternships() {
      try {
        const q = query(collection(db, "internships"))
        const snapshot = await getDocs(q)
        const fetchedInternships: any[] = []
        snapshot.forEach((doc) => {
          fetchedInternships.push({ id: doc.id, ...doc.data() })
        })
        setInternships(fetchedInternships)
      } catch (error) {
        console.error("Error fetching internships:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInternships()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">Career</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Internship Board</h1>
        <p className="text-muted-foreground mt-2">Paid internships at startups and top tech companies — all vetted for students.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-56 shrink-0 space-y-5">
          {[
            { label: "Duration", opts: ["6 weeks", "10 weeks", "12 weeks", "16 weeks"] },
            { label: "Location", opts: ["Remote", "On-site", "Hybrid"] },
            { label: "Field", opts: ["Engineering", "Design", "Data Science", "Security", "Product"] },
          ].map(({ label, opts }) => (
            <div key={label} className="space-y-2">
              <h3 className="font-semibold text-sm">{label}</h3>
              {opts.map((o) => (
                <label key={o} className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground text-muted-foreground">
                  <input type="checkbox" className="rounded" /> {o}
                </label>
              ))}
            </div>
          ))}
        </aside>

        <main className="flex-1 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Loading internships...</p>
            </div>
          ) : internships.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
              <Sparkles className="h-10 w-10 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No internships found</h3>
              <p className="max-w-md text-center mb-6">There are no open internship opportunities right now.</p>
            </div>
          ) : (
            internships.map((job) => (
              <Card key={job.id} className="hover:border-foreground/20 transition-all group">
                <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
                  <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center font-bold text-lg shrink-0 bg-muted">
                    {job.logo || "🎓"}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      {job.paid && <Badge className="bg-green-500/10 text-green-600 border-green-500/20 border bg-transparent text-xs">Paid</Badge>}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{job.duration}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Deadline: {job.deadline}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(job.tags || []).map((t: string) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                  <Button size="sm" className="shrink-0 self-start" asChild>
                    <Link href="/signup">Apply</Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </main>
      </div>
    </div>
  )
}
