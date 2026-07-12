"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Users, Plus, ArrowRight, Settings, Loader2 } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function TeamsPage() {
  const { user } = useAuth()
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const q = query(collection(db, "teams"))
        const snapshot = await getDocs(q)
        const fetchedTeams: any[] = []
        snapshot.forEach((doc) => {
          fetchedTeams.push({ id: doc.id, ...doc.data() })
        })
        setTeams(fetchedTeams)
      } catch (error) {
        console.error("Error fetching teams:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Teams</h1>
          <p className="text-muted-foreground mt-1">Manage your teams and collaborate on projects.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/teams/create"><Plus className="mr-2 h-4 w-4" />Create Team</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading your teams...</p>
        </div>
      ) : teams.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No teams yet</h3>
            <p className="text-muted-foreground mb-4">Create a team to start collaborating with others.</p>
            <Button asChild><Link href="/dashboard/teams/create">Create Your First Team</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map((team) => (
            <Link key={team.id} href={`/dashboard/teams/${team.id}`} className="group">
              <Card className="h-full hover:border-foreground/20 hover:shadow-sm transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-1">{team.emoji || "👥"}</div>
                    <Badge variant={team.role === "Owner" ? "default" : "secondary"} className="text-xs">{team.role || "Member"}</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{team.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{team.members || 1} members</span>
                    <span>{team.projects || 0} projects</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs text-green-600 border-green-500/30">{team.activity || "Active"}</Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Discover teams */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Discover Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Open Source Contributors", emoji: "💻", members: 142, desc: "Collaborate on open source projects together." },
            { name: "Startup Builders", emoji: "🚀", members: 89, desc: "Build your next startup MVP with co-founders." },
          ].map((t) => (
            <Card key={t.name} className="hover:border-foreground/20 transition-all">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="text-2xl">{t.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />{t.members}</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Join</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
