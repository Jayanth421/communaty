"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@repo/ui/button"
import { Moon, Sun, Bell, MessageSquare, UserCircle } from "lucide-react"
import { useAuth } from "../context/auth-context"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const { user, role, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              COPEX
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/explore"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Explore
            </Link>
            <Link
              href="/learn"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Learn
            </Link>
            <Link
              href="/community"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Community
            </Link>
            <Link
              href="/career"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Career
            </Link>
            <Link
              href="/resources"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Resources
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button
              className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            >
              <span className="hidden lg:inline-flex">Search documentation...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="w-9 px-0 hidden lg:flex">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>

                <Button variant="ghost" size="icon" className="w-9 px-0 hidden lg:flex">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Messages</span>
                </Button>

                <Button variant="ghost" size="icon" className="w-9 px-0" onClick={() => signOut()}>
                  <UserCircle className="h-5 w-5 text-primary" />
                  <span className="sr-only">Profile</span>
                </Button>
                {role === "admin" && (
                  <Button size="sm" variant="outline" className="border-red-500/50 text-red-600 hover:bg-red-500/10" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="w-9 px-0"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
