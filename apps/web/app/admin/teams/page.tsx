"use client"

import Link from "next/link"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Building2, Plus, Users, UserRound, ShieldCheck, MessageSquare } from "lucide-react"

const teams = [
  { name: "Product Builders", org: "COMMUNTAY", members: 18, department: "Engineering", status: "Active" },
  { name: "Community Ops", org: "COMMUNTAY", members: 11, department: "Support", status: "Active" },
  { name: "Learning Guild", org: "COMMUNTAY", members: 24, department: "Academics", status: "Active" },
]

export default function AdminTeamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary" className="w-fit">Team Management</Badge>
          <h1 className="text-3xl font-bold">Organizations and teams</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Create organizations, manage departments, invite members, and review activity from one admin place.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/teams/create">
            <Plus className="mr-2 h-4 w-4" />
            Create team
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Organizations", value: "12", icon: Building2 },
          { label: "Teams", value: "36", icon: Users },
          { label: "Members", value: "248", icon: UserRound },
          { label: "Open invites", value: "9", icon: MessageSquare },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">{value}</Badge>
              </div>
              <p className="mt-3 text-sm font-medium">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Team directory</CardTitle>
          <Button variant="outline" size="sm">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Review permissions
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {teams.map((team) => (
            <div key={team.name} className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="font-medium">{team.name}</p>
                <p className="text-sm text-muted-foreground">{team.org} · {team.department}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{team.members} members</Badge>
                <Badge variant="outline">{team.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
