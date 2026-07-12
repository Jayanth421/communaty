"use client"

import * as React from "react"
import { Command } from "cmdk"
import { Search, User, BookOpen, Users, Briefcase, X } from "lucide-react"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-xl overflow-hidden flex flex-col mx-4 h-[60vh] max-h-[500px]">
        <Command
          className="flex flex-col w-full h-full"
          label="Global Command Menu"
          shouldFilter={false}
        >
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <Command.Input
              className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground focus:ring-0"
              placeholder="Search courses, communities, jobs, mentors..."
              autoFocus
            />
            <button
              onClick={() => setOpen(false)}
              className="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <Command.List className="flex-1 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found. Try something else.
            </Command.Empty>

            <Command.Group heading="Suggestions" className="px-2 py-2 text-xs font-semibold text-muted-foreground">
              <Command.Item className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm font-medium">
                <BookOpen className="mr-3 h-4 w-4" />
                <span>Next.js 15 Masterclass</span>
              </Command.Item>
              <Command.Item className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm font-medium">
                <Users className="mr-3 h-4 w-4" />
                <span>React Developers Community</span>
              </Command.Item>
              <Command.Item className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm font-medium">
                <Briefcase className="mr-3 h-4 w-4" />
                <span>Frontend Engineer - Vercel</span>
              </Command.Item>
              <Command.Item className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm font-medium">
                <User className="mr-3 h-4 w-4" />
                <span>Book a Mentor Session</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
