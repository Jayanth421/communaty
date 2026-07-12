"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Calendar, MapPin, Users, Clock, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

const CATEGORY_COLORS: Record<string, string> = {
  Conference: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Hackathon: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Workshop: "bg-green-500/10 text-green-600 border-green-500/20",
  AMA: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "In-Person": "bg-red-500/10 text-red-600 border-red-500/20",
}

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(db, "events"))
        const snapshot = await getDocs(q)
        const fetchedEvents: any[] = []
        snapshot.forEach((doc) => {
          fetchedEvents.push({ id: doc.id, ...doc.data() })
        })
        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const featured = events.filter((e) => e.featured)
  const rest = events.filter((e) => !e.featured)

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-3">Events</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Upcoming Events</h1>
          <p className="text-muted-foreground mt-2">Conferences, hackathons, workshops and live AMAs.</p>
        </div>
        <Button>+ Host an Event</Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <Sparkles className="h-10 w-10 mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No upcoming events</h3>
          <p className="max-w-md text-center mb-6">There are no events scheduled at the moment. Why not host your own?</p>
          <Button>+ Host an Event</Button>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold">🌟 Featured Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((e) => (
                  <Card key={e.id} className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{e.title}</CardTitle>
                        <Badge className={`text-xs border ${CATEGORY_COLORS[e.category] ?? ""} bg-transparent`}>{e.category || "General"}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{e.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{e.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{e.location}</span>
                        <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{(e.attendees || 0).toLocaleString()} attending</span>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href="/signup">Register Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All events */}
          {rest.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold">All Upcoming Events</h2>
              <div className="space-y-3">
                {rest.map((e) => (
                  <Card key={e.id} className="hover:border-foreground/20 transition-all">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`text-xs border ${CATEGORY_COLORS[e.category] ?? ""} bg-transparent`}>{e.category || "General"}</Badge>
                        </div>
                        <h3 className="font-semibold">{e.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{e.date}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{e.location}</span>
                          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{(e.attendees || 0).toLocaleString()} attending</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/signup">Register</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
