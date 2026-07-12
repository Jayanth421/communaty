"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Input } from "@repo/ui/input"
import { ArrowLeft, Users, Settings, UserPlus, MoreVertical, Mail, Shield, Code2, Trash2, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeam() {
      try {
        const docRef = doc(db, "teams", params.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setTeam({ id: docSnap.id, ...docSnap.data() })
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.error("Error fetching team:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading team workspace...</p>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="space-y-8">
        <Link href="/dashboard/teams" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Teams
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <Shield className="h-10 w-10 mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Team not found</h3>
          <p className="max-w-md text-center mb-6">The team you are looking for does not exist or you do not have access.</p>
        </div>
      </div>
    )
  }

  const teamMembers = team.membersList || []
  const projects = team.projectsList || []
  const activity = team.activityList || []

  return (
    <div className="space-y-8">
      <Link href="/dashboard/teams" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Teams
      </Link>

      {/* Team Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{team.emoji || "👥"}</div>
          <div>
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p className="text-muted-foreground text-sm">{team.description || "No description provided."}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><UserPlus className="mr-1.5 h-3.5 w-3.5" />Invite</Button>
          <Button variant="outline" size="sm"><Settings className="mr-1.5 h-3.5 w-3.5" />Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Projects</CardTitle>
              <Button size="sm" variant="ghost" className="h-7 text-xs"><Code2 className="mr-1 h-3 w-3" />New Project</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {projects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-md bg-muted/20">
                  No projects yet. Create one to get started.
                </div>
              ) : (
                projects.map((p: any) => (
                  <div key={p.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Updated {p.updated}</p>
                    </div>
                    <Badge variant={p.status === "Completed" ? "default" : p.status === "In Progress" ? "secondary" : "outline"} className="text-xs">
                      {p.status}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {activity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-md bg-muted/20">
                  No recent activity.
                </div>
              ) : (
                activity.map((a: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="text-muted-foreground">{a.text}</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — Members */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" />Members ({teamMembers.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  You are the only member.
                </div>
              ) : (
                teamMembers.map((m: any) => (
                  <div key={m.email} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {m.avatar || "👤"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{m.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                    </div>
                    <Badge variant={m.role === "Owner" ? "default" : "secondary"} className="text-xs shrink-0">{m.role}</Badge>
                  </div>
                ))
              )}
              <Button variant="outline" size="sm" className="w-full mt-2">
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />Invite Member
              </Button>
            </CardContent>
          </Card>

          {/* Invite link */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4" />Invite Link</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Input value={`https://communtay.com/teams/invite/${team.id}`} readOnly className="text-xs" />
              <Button size="sm" variant="outline" className="w-full">Copy Link</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
