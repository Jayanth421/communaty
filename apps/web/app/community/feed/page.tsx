"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import { Input } from "@repo/ui/input"
import { Heart, MessageSquare, Share2, Bookmark, Search, Flame, TrendingUp, Sparkles, Loader2 } from "lucide-react"
import { db } from "@repo/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"

const filters = ["All", "Web Dev", "AI/ML", "Cloud", "Design", "React", "Career"]

export default function FeedPage() {
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, "posts"))
        // Note: For orderBy("createdAt", "desc") to work, an index might be needed or records must have createdAt
        const snapshot = await getDocs(q)
        const fetchedPosts: any[] = []
        snapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() })
        })
        setPosts(fetchedPosts)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const toggle = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Feed */}
        <main className="flex-1 space-y-6">
          {/* Filter bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search posts..." />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Hot", icon: Flame },
                { label: "Trending", icon: TrendingUp },
                { label: "New", icon: Sparkles },
              ].map(({ label, icon: Icon }) => (
                <Button key={label} variant={label === "Hot" ? "default" : "outline"} size="sm" className="gap-1">
                  <Icon className="h-3.5 w-3.5" />{label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tag filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <Badge key={f} variant={f === "All" ? "default" : "secondary"} className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">{f}</Badge>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 text-muted-foreground space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Loading feed...</p>
              </div>
            ) : posts.length === 0 ? (
              <Card className="border-dashed border-2 bg-muted/20">
                <CardContent className="p-12 text-center text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p className="font-medium text-foreground">No posts yet</p>
                  <p className="text-sm mt-1 mb-4">Be the first to share something with the community!</p>
                  <Button>Create Post</Button>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="hover:border-foreground/20 transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-primary text-primary-foreground font-bold text-sm flex items-center justify-center shrink-0 uppercase">
                        {post.avatar || (post.author ? post.author.slice(0, 2) : "U")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
                          <span className="font-semibold text-sm">{post.author || "Anonymous"}</span>
                          <span className="text-xs text-muted-foreground">{post.role || "Member"}</span>
                          <span className="text-xs text-muted-foreground">· {post.time || "Just now"}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">{post.tag || "General"}</Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{post.body}</p>
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <button onClick={() => toggle(post.id)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className={`h-4 w-4 ${liked.has(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                        {(post.likes || 0) + (liked.has(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <MessageSquare className="h-4 w-4" />{post.comments || 0}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Bookmark className="h-4 w-4" />{post.bookmarks || 0}
                      </button>
                      <button className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Share2 className="h-4 w-4" />Share
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-5">
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-sm">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["#nextjs", "#python", "#ai", "#ux", "#opensource", "#typescript", "#cloud", "#devops"].map((t) => (
                  <Badge key={t} variant="secondary" className="cursor-pointer">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-sm">Active Communities</h3>
              {["⚛️ React Devs", "🐍 Python & AI", "🎨 UI/UX Design", "☁️ Cloud & DevOps"].map((c) => (
                <div key={c} className="flex items-center justify-between text-sm">
                  <span>{c}</span>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">Join</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
