import Link from "next/link"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Users, MessageSquare, ArrowRight, Flame } from "lucide-react"

const FEATURED_GROUPS = [
  { name: "React Developers", members: 12400, posts: 890, emoji: "⚛️" },
  { name: "Python & AI", members: 9800, posts: 1240, emoji: "🐍" },
  { name: "UI/UX Designers", members: 7300, posts: 540, emoji: "🎨" },
  { name: "Open Source", members: 15200, posts: 2100, emoji: "💻" },
]

const TRENDING_POSTS = [
  { id: "1", author: "Sarah Chen", avatar: "SC", title: "How I built a full-stack SaaS in 30 days using Next.js and Firebase", likes: 248, comments: 42, tag: "Web Dev" },
  { id: "2", author: "Arjun Patel", avatar: "AP", title: "My experience getting the AWS Solutions Architect certification", likes: 184, comments: 36, tag: "Cloud" },
  { id: "3", author: "Maria Silva", avatar: "MS", title: "10 VSCode extensions every developer should install in 2025", likes: 521, comments: 89, tag: "Tools" },
  { id: "4", author: "James Wu", avatar: "JW", title: "Understanding React Server Components — a deep dive", likes: 310, comments: 57, tag: "React" },
]

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-xl space-y-16">
      {/* Hero */}
      <section className="text-center space-y-5">
        <Badge variant="secondary">Community</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Learn together. Grow together.
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join communities of developers, designers, and learners who share knowledge, ask questions, and build things together.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg" asChild><Link href="/community/feed">Explore Feed</Link></Button>
          <Button size="lg" variant="outline" asChild><Link href="/community/groups">Browse Groups</Link></Button>
        </div>
      </section>

      {/* Trending Posts */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2"><Flame className="h-5 w-5 text-orange-500" />Trending Discussions</h2>
            <p className="text-muted-foreground mt-1">What the community is talking about</p>
          </div>
          <Button variant="ghost" className="group hidden sm:flex" asChild>
            <Link href="/community/feed">See all <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>
        <div className="space-y-4">
          {TRENDING_POSTS.map((post) => (
            <Card key={post.id} className="hover:border-foreground/20 transition-all cursor-pointer group">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{post.author}</span>
                    <Badge variant="outline" className="text-xs">{post.tag}</Badge>
                  </div>
                  <p className="font-semibold group-hover:text-primary transition-colors line-clamp-1">{post.title}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span>❤️ {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{post.comments}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Groups */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Groups</h2>
            <p className="text-muted-foreground mt-1">Find your tribe and build together</p>
          </div>
          <Button variant="ghost" className="group hidden sm:flex" asChild>
            <Link href="/community/groups">All groups <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_GROUPS.map((g) => (
            <Card key={g.name} className="hover:shadow-md transition-all cursor-pointer group">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{g.emoji}</div>
                <CardTitle className="text-base group-hover:text-primary transition-colors">{g.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{g.members.toLocaleString()} members</div>
                <div className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{g.posts.toLocaleString()} posts</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
