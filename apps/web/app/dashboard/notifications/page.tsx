"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Bell, BookOpen, Star, MessageSquare, Award, Zap, Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

const getIconConfig = (title: string) => {
  if (title.includes("Course Update")) return { icon: BookOpen, iconColor: "text-blue-500 bg-blue-500/10" }
  if (title.includes("New Reply") || title.includes("Message")) return { icon: MessageSquare, iconColor: "text-green-500 bg-green-500/10" }
  if (title.includes("Badge")) return { icon: Award, iconColor: "text-amber-500 bg-amber-500/10" }
  if (title.includes("Recommendation")) return { icon: Star, iconColor: "text-violet-500 bg-violet-500/10" }
  if (title.includes("Streak")) return { icon: Zap, iconColor: "text-orange-500 bg-orange-500/10" }
  return { icon: Bell, iconColor: "text-muted-foreground bg-muted" }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const q = query(collection(db, "notifications"))
        const snapshot = await getDocs(q)
        const fetchedNotifs: any[] = []
        snapshot.forEach((doc) => {
          fetchedNotifs.push({ id: doc.id, ...doc.data() })
        })
        setNotifications(fetchedNotifs)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay up to date with your courses, community, and achievements.</p>
        </div>
        {!loading && <Badge>{notifications.filter((n) => n.unread).length} new</Badge>}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
            <Bell className="h-10 w-10 mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">You're all caught up!</h3>
            <p className="max-w-md text-center mb-6">No new notifications at the moment.</p>
          </div>
        ) : (
          notifications.map((n) => {
            const { icon: Icon, iconColor } = getIconConfig(n.title || "")
            return (
              <Card key={n.id} className={`transition-all hover:border-foreground/20 ${n.unread ? "border-primary/30 bg-primary/5" : ""}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.iconColor || iconColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{n.title}</p>
                      {n.unread && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.msg || n.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
