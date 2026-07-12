import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

const BLOG_DATA: Record<string, { title: string; author: string; date: string; readTime: string; tag: string; content: string }> = {
  "top-languages-2025": {
    title: "Top Programming Languages to Learn in 2025",
    author: "Alex K.", date: "Jul 10, 2025", readTime: "5 min read", tag: "Career",
    content: `The tech industry moves fast. What's hot today can be irrelevant tomorrow. So which languages should you invest your learning time in for 2025?\n\n## 1. TypeScript\n\nTypeScript has cemented itself as the default choice for any serious web project. With React, Next.js, and the entire Node.js ecosystem embracing it fully, learning TypeScript is no longer optional — it's expected.\n\n## 2. Python\n\nPython's dominance in AI, data science, and automation isn't slowing down. Whether you're building LLM applications with LangChain, data pipelines, or simple scripts, Python is the most versatile language of our era.\n\n## 3. Rust\n\nRust is the most admired programming language for the 8th year running. As WebAssembly grows and systems programming becomes more accessible, Rust is a fantastic second language for experienced developers.\n\n## 4. Go (Golang)\n\nSimple, fast, and opinionated — Go is the language of backend services and DevOps tools. Companies like Cloudflare, Uber, and Google rely heavily on Go for performance-critical systems.\n\n## Conclusion\n\nFocus on one language deeply before branching out. TypeScript for web, Python for AI, Go for backend systems — pick your path and commit.`,
  },
}

const DEFAULT_BLOG = {
  title: "Blog Post",
  author: "COMMUNTAY Team", date: "Jul 12, 2025", readTime: "5 min read", tag: "General",
  content: `This is a detailed article from the COMMUNTAY community blog. We cover topics ranging from career development and coding tutorials to open source and freelancing.\n\n## Introduction\n\nWelcome to COMMUNTAY's blog. Our mission is to share high-quality, actionable insights that help developers, designers, and learners grow professionally.\n\n## Key Takeaways\n\nEvery article on our platform is peer-reviewed and community-approved. We focus on practical, real-world knowledge over theoretical fluff.\n\n## Conclusion\n\nStay curious, keep building, and remember — the best time to start was yesterday. The second best time is right now.`,
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = BLOG_DATA[params.slug] ?? { ...DEFAULT_BLOG, title: params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }

  const paragraphs = blog.content.split("\n\n")

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8">
        <Link href="/resources/blogs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <Badge variant="secondary">{blog.tag}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3.5 w-3.5" />{blog.readTime}</span>
          <span className="text-sm text-muted-foreground">{blog.date}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">{blog.title}</h1>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
            {blog.author.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="font-medium text-sm">{blog.author}</span>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-5">
        {paragraphs.map((p, i) => {
          if (p.startsWith("## ")) {
            return <h2 key={i} className="text-xl font-bold mt-8 mb-3">{p.replace("## ", "")}</h2>
          }
          return <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
        })}
      </div>

      <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-sm text-muted-foreground">Did you find this article helpful?</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">👍 Yes</Button>
          <Button variant="outline" size="sm">👎 No</Button>
        </div>
      </div>
    </div>
  )
}
