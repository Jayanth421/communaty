"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateTeamPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Save team to Firestore
    setTimeout(() => {
      router.push("/dashboard/teams")
    }, 500)
  }

  return (
    <div className="max-w-xl space-y-6">
      <Link href="/dashboard/teams" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Teams
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Create a Team</h1>
        <p className="text-muted-foreground mt-1">Start a new team and invite members to collaborate.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Team Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Project Phoenix"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="What is this team about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Team Visibility</label>
              <div className="flex gap-3">
                {["Public", "Private", "Invite-Only"].map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="visibility" defaultChecked={v === "Public"} className="rounded" />
                    {v}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Invite Members (Email)</label>
              <Input placeholder="Enter email addresses separated by commas" />
              <p className="text-xs text-muted-foreground">You can also invite members after creating the team.</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading || !name}>
                {loading ? "Creating..." : "Create Team"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/teams">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
