"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Flag, CheckCircle, XCircle, AlertTriangle, MessageSquare, Loader2 } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

const SEVERITY_COLORS: Record<string, string> = {
  High: "bg-red-500/10 text-red-600 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Low: "bg-green-500/10 text-green-600 border-green-500/20",
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Pending: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />,
  Resolved: <CheckCircle className="h-3.5 w-3.5 text-green-500" />,
  Dismissed: <XCircle className="h-3.5 w-3.5 text-muted-foreground" />,
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("Pending")

  useEffect(() => {
    async function fetchReports() {
      try {
        const q = query(collection(db, "reports"))
        const snapshot = await getDocs(q)
        const fetchedReports: any[] = []
        snapshot.forEach((doc) => {
          fetchedReports.push({ id: doc.id, ...doc.data() })
        })
        setReports(fetchedReports)
      } catch (error) {
        console.error("Error fetching reports:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const pendingCount = reports.filter((r) => (r.status || "Pending") === "Pending").length
  const filtered = reports.filter((r) => filter === "All" || (r.status || "Pending") === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Flag className="h-6 w-6" />Reports</h1>
          <p className="text-muted-foreground mt-1">
            {loading ? "Loading reports..." : `${pendingCount} pending reports require your attention.`}
          </p>
        </div>
        <div className="flex gap-2">
          {["All", "Pending", "Resolved", "Dismissed"].map((f) => (
            <Badge 
              key={f} 
              variant={f === filter ? "default" : "secondary"} 
              className="cursor-pointer"
              onClick={() => setFilter(f)}
            >
              {f} {f === "Pending" && !loading && `(${pendingCount})`}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Loading reports...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
            <CheckCircle className="h-8 w-8 mb-3 opacity-50" />
            <p>No reports found in this category.</p>
          </div>
        ) : (
          filtered.map((r) => {
            const status = r.status || "Pending"
            const severity = r.severity || "Medium"
            
            return (
              <Card key={r.id} className={`transition-all ${status === "Pending" ? "border-amber-500/30 bg-amber-500/5" : ""}`}>
                <CardContent className="p-5 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {STATUS_ICONS[status] || STATUS_ICONS["Pending"]}
                      <span className="font-mono text-xs text-muted-foreground">{r.id.substring(0, 8)}...</span>
                      <Badge variant="outline" className={`text-xs border ${SEVERITY_COLORS[severity] || SEVERITY_COLORS["Medium"]}`}>{severity}</Badge>
                      <Badge variant="outline" className="text-xs">{r.type || "Other"}</Badge>
                    </div>
                    <p className="font-semibold text-sm">{r.target || "Unknown target"}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Reported by: {r.reporter || "Anonymous"}</span>
                      <span>Target: {r.targetType || "Unknown"}</span>
                      <span>{r.time || new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  {status === "Pending" && (
                    <div className="flex gap-2 shrink-0 self-start">
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        <CheckCircle className="mr-1 h-3 w-3" />Resolve
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground">
                        Dismiss
                      </Button>
                      <Button size="sm" variant="destructive" className="h-8 text-xs">
                        Ban User
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
