"use client"

import { useMemo, useState } from "react"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Input } from "@repo/ui/input"
import { CheckSquare, CopyPlus, Plus, PlaySquare, Trash2 } from "lucide-react"

type Field = { id: number; label: string; type: string; required: boolean }

export default function AdminFormsPage() {
  const [fields] = useState<Field[]>([
    { id: 1, label: "Full name", type: "Short answer", required: true },
    { id: 2, label: "Email address", type: "Email", required: true },
    { id: 3, label: "Reason for joining", type: "Paragraph", required: false },
  ])

  const stats = useMemo(
    () => [
      { label: "Published forms", value: "11" },
      { label: "Responses", value: "4.8k" },
      { label: "Conversion", value: "62%" },
    ],
    []
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Badge variant="secondary" className="w-fit">Form Builder</Badge>
          <h1 className="text-3xl font-bold">Google-Form style admin forms</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Build registration forms, surveys, and onboarding flows with drag-and-drop style field blocks and publish controls.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><CopyPlus className="mr-2 h-4 w-4" />Template</Button>
          <Button><Plus className="mr-2 h-4 w-4" />New form</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs uppercase text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Field blocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Short answer", "Paragraph", "Multiple choice", "Checkboxes", "Dropdown", "File upload", "Date", "Rating"].map((item) => (
              <button key={item} className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm hover:bg-muted">
                {item}
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
            <Button variant="outline" className="w-full">
              <PlaySquare className="mr-2 h-4 w-4" />
              Preview form
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Form canvas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input defaultValue="Event registration" />
              <Input defaultValue="Collect registrations quickly with a polished intake flow." />
            </div>
            {fields.map((field) => (
              <div key={field.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{field.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {field.type}{field.required ? " · required" : ""}
                    </p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <Button className="w-full">
              <CheckSquare className="mr-2 h-4 w-4" />
              Publish form
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
