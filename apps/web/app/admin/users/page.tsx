"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Input } from "@repo/ui/input"
import { Search, MoreVertical, Shield, Ban, Mail, Loader2 } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-red-500/10 text-red-600 border-red-500/20",
  instructor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  institute: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  moderator: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  student: "",
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        // Query users collection
        const q = query(collection(db, "users"))
        const querySnapshot = await getDocs(q)
        const fetchedUsers: any[] = []
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() })
        })
        setUsers(fetchedUsers)
      } catch (error) {
        console.error("Error fetching users from Firestore:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filtered = users.filter((u) => 
    (u.displayName || "").toLowerCase().includes(search.toLowerCase()) || 
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            {loading ? "Loading users..." : `${users.length} total users registered on the platform.`}
          </p>
        </div>
        <Button variant="outline" size="sm"><Mail className="mr-1.5 h-3.5 w-3.5" />Export CSV</Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["All", "Admin", "Institute", "Instructor", "Moderator", "Student"].map((f) => (
            <Badge key={f} variant={f === "All" ? "default" : "secondary"} className="cursor-pointer">{f}</Badge>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-muted-foreground">User</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Role</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground hidden sm:table-cell">Plan</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground hidden md:table-cell">Courses</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground hidden lg:table-cell">Joined</th>
                  <th className="text-right p-4 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p>Fetching from Firebase...</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                            {u.displayName ? u.displayName.slice(0, 2) : u.email?.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium">{u.displayName || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={`text-xs border capitalize ${ROLE_COLORS[u.role] ?? ""}`}>
                          {u.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                          {u.role || "student"}
                        </Badge>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <Badge variant="secondary" className="text-xs">Free</Badge>
                      </td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">0</td>
                      <td className="p-4 hidden lg:table-cell text-muted-foreground text-xs">
                        {u.createdAt ? new Date(u.createdAt?.seconds * 1000).toLocaleDateString() : "Just now"}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Make Admin"><Shield className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:text-red-600" title="Ban User"><Ban className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
