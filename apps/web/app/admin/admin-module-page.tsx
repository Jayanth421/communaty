"use client"

import Link from "next/link"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { CheckCircle2, ChevronRight, CircleDot, Plus, Settings2 } from "lucide-react"
import type { AdminModule } from "./admin-control-data"

type AdminModulePageProps = {
  module: AdminModule
}

export function AdminModulePage({ module }: AdminModulePageProps) {
  const Icon = module.icon

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{module.title}</h1>
                <Badge variant="secondary">{module.status}</Badge>
              </div>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{module.description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Create
          </Button>
          <Button size="sm" variant="outline">
            <Settings2 className="mr-1.5 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {module.metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Control Surface</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {module.actions.map((action) => (
              <button
                key={action}
                className="flex min-h-20 items-center justify-between rounded-lg border border-border bg-background p-4 text-left text-sm transition-colors hover:bg-muted"
              >
                <span className="font-medium">{action}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Operational Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {module.workflows.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Included Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {module.features.map((feature) => (
            <div key={feature} className="flex gap-3 rounded-lg border border-border p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-sm text-muted-foreground">{feature}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Production Readiness</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          {["Responsive UI", "Permission guarded", "Audit ready", "Export ready"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
              <CircleDot className="h-4 w-4 text-primary" />
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
