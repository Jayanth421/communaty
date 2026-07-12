import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { ArrowRight, BookOpen, FileText, Lightbulb } from "lucide-react"
import Link from "next/link"

const RECENT_BLOGS = [
  { slug: "top-languages-2025", title: "Top Programming Languages to Learn in 2025", author: "Alex K.", date: "Jul 10, 2025", readTime: "5 min read", tag: "Career" },
  { slug: "ai-tools-for-devs", title: "10 AI Tools Every Developer Should Be Using Right Now", author: "Priya S.", date: "Jul 8, 2025", readTime: "7 min read", tag: "AI" },
  { slug: "open-source-guide", title: "How to Start Contributing to Open Source Today", author: "Marcus T.", date: "Jul 6, 2025", readTime: "4 min read", tag: "Open Source" },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-screen-xl space-y-20">
      <section className="text-center space-y-5">
        <Badge variant="secondary">Resources</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Every resource you need
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Curated guides, blogs, cheat sheets, and tools to accelerate your learning and career growth.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: FileText, title: "Blog", desc: "In-depth articles, tutorials, and opinions from community experts.", href: "/resources/blogs" },
          { icon: BookOpen, title: "Cheat Sheets", desc: "Quick-reference cards for your favourite languages, tools and frameworks.", href: "/resources/blogs" },
          { icon: Lightbulb, title: "Tips & Tricks", desc: "Community-sourced dev tips, shortcuts and productivity hacks.", href: "/resources/blogs" },
        ].map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href} className="group">
            <Card className="h-full transition-all hover:border-foreground/30 hover:shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors flex items-center justify-between">
                  {title} <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Latest from the Blog</h2>
        <div className="space-y-4">
          {RECENT_BLOGS.map((b) => (
            <Link key={b.slug} href={`/resources/blogs/${b.slug}`} className="group block">
              <Card className="hover:border-foreground/20 transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{b.tag}</Badge>
                      <span className="text-xs text-muted-foreground">{b.readTime}</span>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{b.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">By {b.author} · {b.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Button variant="outline" asChild>
          <Link href="/resources/blogs">View all articles <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>
    </div>
  )
}
