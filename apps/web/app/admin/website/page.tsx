"use client"

import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Input } from "@repo/ui/input"
import { Globe, Palette, Shield, Upload } from "lucide-react"
import { BrandMark } from "../../../components/brand-mark"

const brandColors = ["#0f172a", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function WebsiteSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Badge variant="secondary" className="w-fit">Website Management</Badge>
        <h1 className="text-3xl font-bold">Branding, logo, and website controls</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          This is the admin control surface for the public identity of the platform. Change the logo, favicon, colors, and site identity without code edits.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform name</label>
                <Input defaultValue="COMMUNTAY" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tagline</label>
                <Input defaultValue="Learn. Build. Connect. Earn." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo upload</label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Favicon upload</label>
                <Input type="file" accept="image/*,.ico" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo size</label>
                <Input type="range" min="24" max="96" defaultValue="36" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo position</label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>Left</option>
                  <option>Center</option>
                  <option>Right</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Font settings</label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>Inter</option>
                  <option>Manrope</option>
                  <option>Space Grotesk</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <p className="text-xs uppercase text-muted-foreground">Desktop logo</p>
                <div className="mt-3">
                  <BrandMark />
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-xs uppercase text-muted-foreground">Mobile logo</p>
                <div className="mt-3">
                  <BrandMark compact />
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-xs uppercase text-muted-foreground">Footer mark</p>
                <p className="mt-3 text-sm text-muted-foreground">Supports separate footer identity and icon-only mode.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors and modes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary color</label>
              <div className="flex flex-wrap gap-2">
                {brandColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select ${color}`}
                    className="h-9 w-9 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Theme mode</label>
              <div className="grid gap-2 sm:grid-cols-3">
                {["System", "Light", "Dark"].map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
                    <input type="radio" name="theme-mode" defaultChecked={item === "System"} />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom CSS</label>
              <textarea
                className="min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm"
                defaultValue={`:root {\n  --primary: 210 100% 50%;\n}`}
              />
            </div>

            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Save branding
            </Button>

            <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              <Shield className="mb-2 h-4 w-4 text-primary" />
              Branding changes are designed to be safe for fast rollout and can later be wired to storage or CMS persistence.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
