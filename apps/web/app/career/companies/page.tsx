"use client"

import { useState, useEffect } from "react"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"
import { Briefcase, MapPin, Users, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const q = query(collection(db, "companies"))
        const snapshot = await getDocs(q)
        const fetchedCompanies: any[] = []
        snapshot.forEach((doc) => {
          fetchedCompanies.push({ id: doc.id, ...doc.data() })
        })
        setCompanies(fetchedCompanies)
      } catch (error) {
        console.error("Error fetching companies:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl space-y-8">
      <div>
        <Badge variant="secondary" className="mb-3">Career</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Company Directory</h1>
        <p className="text-muted-foreground mt-2">Explore top tech companies and discover who's hiring.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading companies...</p>
        </div>
      ) : companies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <Sparkles className="h-10 w-10 mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No companies found</h3>
          <p className="max-w-md text-center mb-6">There are no companies listed in the directory at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((c) => (
            <Card key={c.id} className="hover:border-foreground/20 transition-all hover:shadow-sm group">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center font-bold text-xl shrink-0 bg-muted">
                    {c.logo || "🏢"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.industry}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs text-green-600 border-green-500/30">
                    {c.openRoles || 0} open roles
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.size} employees</span>
                </div>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href="/career/jobs">View Open Roles</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
