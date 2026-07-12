"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { Search, Send, Loader2, Sparkles } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, query } from "firebase/firestore"

export default function MessagesPage() {
  const [active, setActive] = useState<string | null>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchConversations() {
      try {
        const q = query(collection(db, "conversations"))
        const snapshot = await getDocs(q)
        const fetchedConvos: any[] = []
        snapshot.forEach((doc) => {
          fetchedConvos.push({ id: doc.id, ...doc.data() })
        })
        setConversations(fetchedConvos)
        if (fetchedConvos.length > 0) {
          setActive(fetchedConvos[0].id)
        }
      } catch (error) {
        console.error("Error fetching conversations:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchConversations()
  }, [])

  const activeConvo = conversations.find((c) => c.id === active)
  const activeMessages = activeConvo?.messages || []

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="flex h-[calc(100vh-14rem)] border border-border rounded-xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border flex flex-col bg-background">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 h-8 text-sm" placeholder="Search messages..." />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                <p className="text-sm">Loading...</p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground px-4 text-center space-y-2">
                <Sparkles className="h-6 w-6 opacity-50" />
                <p className="text-sm">No conversations</p>
              </div>
            ) : (
              conversations.map((c) => (
                <button key={c.id} onClick={() => setActive(c.id)}
                  className={`w-full p-3 flex gap-3 text-left hover:bg-muted transition-colors ${active === c.id ? "bg-muted" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    {c.avatar || "👤"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate pr-2">{c.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMsg || "Started a conversation"}</p>
                  </div>
                  {(c.unread || 0) > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">{c.unread}</span>
                  )}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-background">
          {activeConvo ? (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                  {activeConvo.avatar || "👤"}
                </div>
                <span className="font-semibold">{activeConvo.name}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    No messages yet. Say hello!
                  </div>
                ) : (
                  activeMessages.map((msg: any, i: number) => (
                    <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${msg.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t border-border flex gap-2">
                <Input className="flex-1" placeholder="Type a message..." />
                <Button size="icon"><Send className="h-4 w-4" /></Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
