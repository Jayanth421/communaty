"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Settings, Globe, Shield, Bell, Palette, Database } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="h-6 w-6" />Platform Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global platform settings and preferences.</p>
      </div>

      {/* General */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" />General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform Name</label>
            <Input defaultValue="COMMUNTAY" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tagline</label>
            <Input defaultValue="Learn • Build • Connect • Earn" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Support Email</label>
            <Input defaultValue="support@communtay.com" />
          </div>
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" />Security & Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            ["Enable user registration", "Allow new users to sign up", true],
            ["Require email verification", "Users must verify email before accessing the platform", true],
            ["Enable two-factor authentication", "Allow users to enable 2FA for extra security", false],
            ["Auto-ban spam accounts", "Automatically ban accounts flagged by the spam detection system", true],
          ].map(([label, desc, checked]) => (
            <div key={label as string} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{label as string}</p>
                <p className="text-xs text-muted-foreground">{desc as string}</p>
              </div>
              <input type="checkbox" defaultChecked={checked as boolean} className="mt-1 rounded cursor-pointer" />
            </div>
          ))}
          <Button size="sm" variant="outline">Update Security Settings</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" />Admin Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            ["New user signups", "Get notified when a new user joins the platform"],
            ["New reports", "Get notified when a new report is filed"],
            ["Course submissions", "Get notified when an instructor submits a new course for review"],
            ["Revenue milestones", "Get notified when revenue milestones are hit"],
          ].map(([label, desc]) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="mt-1 rounded cursor-pointer" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Palette className="h-4 w-4" />Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Theme</label>
            <div className="flex gap-3">
              {["System", "Light", "Dark"].map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="theme" defaultChecked={t === "System"} className="rounded" />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Color</label>
            <div className="flex gap-2">
              {["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
                <button key={c} className="w-8 h-8 rounded-full border-2 border-transparent hover:border-foreground/30 transition-colors" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger */}
      <Card className="border-destructive/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-destructive flex items-center gap-2"><Database className="h-4 w-4" />Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Take the platform offline for maintenance.</p>
            </div>
            <Button size="sm" variant="outline">Enable</Button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-destructive">Reset Platform Data</p>
              <p className="text-xs text-muted-foreground">This will permanently delete all user data. Cannot be undone.</p>
            </div>
            <Button size="sm" variant="destructive">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
