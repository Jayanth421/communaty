import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { ArrowLeft, ArrowRight, Circle, CheckCircle } from "lucide-react"
import Link from "next/link"

const CONTENT: Record<string, { title: string; category: string; sections: { heading: string; body: string; code?: string }[] }> = {
  "html-basics": {
    title: "HTML Basics",
    category: "Web",
    sections: [
      { heading: "What is HTML?", body: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a page using elements and tags." },
      { heading: "Your First HTML Page", body: "Every HTML document starts with a <!DOCTYPE html> declaration, followed by the root <html> element.", code: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n  </body>\n</html>` },
      { heading: "HTML Elements", body: "HTML elements are the building blocks of pages. They consist of a start tag, content, and an end tag.", code: `<p>This is a paragraph.</p>\n<a href="https://example.com">This is a link</a>\n<img src="image.jpg" alt="An image" />` },
    ],
  },
  "css-flexbox": {
    title: "CSS Flexbox",
    category: "Web",
    sections: [
      { heading: "Introduction to Flexbox", body: "CSS Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns." },
      { heading: "Creating a Flex Container", body: "Apply display: flex to a parent element to make it a flex container. All its direct children become flex items.", code: `.container {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  align-items: center;\n}` },
    ],
  },
}

const DEFAULT_CONTENT = {
  title: "Tutorial",
  category: "Web",
  sections: [
    { heading: "Introduction", body: "Welcome to this tutorial! This content covers the foundational concepts you need to get started.", code: `// Example code block\nconsole.log("Hello, COMMUNTAY!");` },
    { heading: "Core Concepts", body: "In this section we go deeper into the topic with practical examples and hands-on code." },
    { heading: "Practice Exercise", body: "Try building a small project using what you've learned so far. Apply the concepts to solidify your understanding.", code: `// Your exercise\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet("World"));` },
  ],
}

const TOC = ["Introduction", "Core Concepts", "Practice Exercise"]

export default function TutorialReaderPage({ params }: { params: { slug: string } }) {
  const content = CONTENT[params.slug] ?? { ...DEFAULT_CONTENT, title: params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* TOC Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border pt-8 px-4 gap-2 sticky top-14 h-[calc(100vh-3.5rem)]">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">On This Page</h3>
        {content.sections.map((s, i) => (
          <a key={i} href={`#section-${i}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
            {i === 0 ? <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> : <Circle className="h-3.5 w-3.5 shrink-0" />}
            {s.heading}
          </a>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 space-y-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/learn/tutorials" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Tutorials
            </Link>
            <span className="text-muted-foreground">/</span>
            <Badge variant="secondary" className="text-xs">{content.category}</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        </div>

        {content.sections.map((section, i) => (
          <section id={`section-${i}`} key={i} className="space-y-4">
            <h2 className="text-xl font-bold">{section.heading}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            {section.code && (
              <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto border border-border font-mono leading-relaxed">
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}

        <div className="flex gap-3 pt-8 border-t border-border">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/learn/tutorials"><ArrowLeft className="mr-2 h-4 w-4" />All Tutorials</Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/learn/tutorials">Next Tutorial <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
