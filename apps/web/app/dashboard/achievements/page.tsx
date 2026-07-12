"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Trophy, Star, Zap, BookOpen, Users, Award, Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"

export default function AchievementsPage() {
  const { user } = useAuth()
  const [badges, setBadges] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const badgesQ = query(collection(db, "badges"))
        const badgesSnap = await getDocs(badgesQ)
        const fetchedBadges: any[] = []
        badgesSnap.forEach((doc) => {
          fetchedBadges.push({ id: doc.id, ...doc.data() })
        })
        setBadges(fetchedBadges)

        // Try to fetch leaderboard, fallback gracefully if it doesn't exist
        const lbQ = query(collection(db, "leaderboard"), orderBy("points", "desc"), limit(10))
        const lbSnap = await getDocs(lbQ)
        const fetchedLb: any[] = []
        lbSnap.forEach((doc) => {
          fetchedLb.push({ id: doc.id, ...doc.data() })
        })
        setLeaderboard(fetchedLb)
      } catch (error) {
        console.error("Error fetching achievements data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // In a real app, you would fetch the user's specific XP and stats.
  const userStats = {
    xp: 2840,
    rank: 4,
    level: 8,
    title: "Pro Learner",
    progress: 68
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading achievements...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Achievements</h1>
        <p className="text-muted-foreground mt-1">Your badges, XP, and leaderboard ranking.</p>
      </div>

      {/* XP Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-extrabold">{userStats.xp.toLocaleString()} XP</p>
            <p className="text-muted-foreground text-sm">Rank #{userStats.rank} · Level {userStats.level} · {userStats.title}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${userStats.progress}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{userStats.progress}% to Level {userStats.level + 1}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Badges</h2>
        {badges.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg bg-muted/20">
            <Award className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>No badges available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((b) => (
              <Card key={b.id || b.name} className={`text-center transition-all ${b.earned ? "hover:border-foreground/20" : "opacity-40"}`}>
                <CardContent className="p-5 space-y-2">
                  <div className="text-3xl">{b.emoji}</div>
                  <p className="font-semibold text-sm">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                  {b.earned && <Badge variant="secondary" className="text-xs">Earned</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Monthly Leaderboard</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {leaderboard.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>No leaderboard data available.</p>
              </div>
            ) : (
              leaderboard.map((entry, index) => {
                const rank = index + 1
                return (
                  <div key={entry.id || rank} className={`flex items-center gap-4 p-4 ${entry.isUser || entry.userId === user?.uid ? "bg-primary/5" : ""}`}>
                    <span className={`font-bold text-sm w-5 text-center ${rank <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                      {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {entry.avatar || "👤"}
                    </div>
                    <span className="flex-1 font-medium text-sm">
                      {entry.name} {(entry.isUser || entry.userId === user?.uid) && <Badge variant="outline" className="text-xs ml-1">You</Badge>}
                    </span>
                    <span className="font-bold text-sm text-primary">{(entry.points || 0).toLocaleString()} XP</span>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
