"use client"

import { useState, useEffect } from "react"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"
import { Input } from "@repo/ui/input"
import { MapPin, Briefcase, DollarSign, Clock, Search, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const q = query(collection(db, "jobs"))
        const snapshot = await getDocs(q)
        const fetchedJobs: any[] = []
        snapshot.forEach((doc) => {
          fetchedJobs.push({ id: doc.id, ...doc.data() })
        })
        setJobs(fetchedJobs)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">Career</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
        <p className="text-muted-foreground mt-2">Remote-first tech jobs from verified companies.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Job title, company, or keyword..." />
        </div>
        <div className="relative flex-1 max-w-xs">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Location or 'Remote'" />
        </div>
        <Button className="shrink-0">Search Jobs</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-56 shrink-0 space-y-5">
          {[
            { label: "Job Type", opts: ["Full-time", "Part-time", "Contract", "Remote"] },
            { label: "Experience", opts: ["Entry Level", "Mid Level", "Senior", "Lead"] },
            { label: "Category", opts: ["Frontend", "Backend", "Full Stack", "AI/ML", "Design", "DevOps"] },
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

        {/* Listings */}
        <main className="flex-1 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
              <Sparkles className="h-10 w-10 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No jobs available</h3>
              <p className="max-w-md text-center mb-6">Check back later for new remote-first tech opportunities.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{jobs.length} jobs found</p>
              {jobs.map((job) => (
                <Card key={job.id} className="hover:border-foreground/20 transition-all cursor-pointer group">
                  <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
                    <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-2xl shrink-0 bg-muted">
                      {job.logo || "💼"}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs shrink-0">{job.type || "Full-time"}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location || "Remote"}</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{job.salary || "Competitive"}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.posted || "Recently"}</span>
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
              ))}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
