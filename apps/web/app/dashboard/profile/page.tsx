"use client"

import { useAuth } from "../../../context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Badge } from "@repo/ui/badge"

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your public profile and personal information.</p>
      </div>

      {/* Avatar */}
      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/50 to-primary text-primary-foreground font-bold text-2xl flex items-center justify-center shrink-0">
            {user?.displayName?.charAt(0) ?? user?.email?.charAt(0) ?? "U"}
          </div>
          <div className="space-y-2">
            <p className="font-semibold">{user?.displayName ?? "Your Name"}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <Button size="sm" variant="outline">Upload Photo</Button>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input defaultValue={user?.displayName?.split(" ")[0] ?? ""} placeholder="First name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input defaultValue={user?.displayName?.split(" ")[1] ?? ""} placeholder="Last name" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue={user?.email ?? ""} disabled className="opacity-60" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Tell the community about yourself..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input placeholder="e.g. San Francisco, CA" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Python", "Figma"].map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
            <Input placeholder="Add a skill and press Enter..." />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
