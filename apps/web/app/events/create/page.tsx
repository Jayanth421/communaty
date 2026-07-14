"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Input } from "@repo/ui/input"
import { Badge } from "@repo/ui/badge"
import { CalendarPlus, Globe, Users } from "lucide-react"
import { db } from "@repo/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

export default function CreateEventPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, "events"), {
        title,
        date,
        time,
        location,
        description,
        category: "Workshop",
        featured: false,
        attendees: 0,
        createdAt: serverTimestamp(),
      })
      router.push("/events")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Badge variant="secondary" className="w-fit">Host an Event</Badge>
        <h1 className="text-3xl font-bold">Create an event</h1>
        <p className="text-sm text-muted-foreground">
          Any authenticated user can create an event. Public access can be served at `events.` subdomain or `/events`.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarPlus className="h-4 w-4" />
            Event details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <div className="grid gap-4 md:grid-cols-3">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              <Input placeholder="Location or link" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <textarea
              className="min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm"
              placeholder="Describe the event, agenda, speakers, and audience"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish event"}</Button>
              <Button variant="outline" asChild><Link href="/events">Back to events</Link></Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Users, title: "Open to anyone", text: "Event creators can publish community events from the browser." },
          { icon: Globe, title: "Subdomain ready", text: "Use `events.yourdomain.com` through host-based rewrites." },
          { icon: CalendarPlus, title: "Fast publish", text: "Store events in Firestore and render them immediately." },
        ].map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardContent className="p-4">
              <Icon className="h-4 w-4 text-primary" />
              <p className="mt-3 font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
