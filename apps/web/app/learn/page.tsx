import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { ArrowRight, BookOpen, Map, Layers } from "lucide-react"
import Link from "next/link"

const featuredPaths = [
  { icon: "🌐", title: "Full Stack Web Development", duration: "6 months", courses: 18, color: "from-blue-500/10" },
  { icon: "🤖", title: "AI & Machine Learning Engineer", duration: "9 months", courses: 24, color: "from-violet-500/10" },
  { icon: "📱", title: "Mobile App Developer", duration: "5 months", courses: 14, color: "from-green-500/10" },
  { icon: "🎨", title: "UI/UX Product Designer", duration: "4 months", courses: 12, color: "from-orange-500/10" },
  { icon: "🔐", title: "Cyber Security Analyst", duration: "8 months", courses: 20, color: "from-red-500/10" },
  { icon: "☁️", title: "Cloud & DevOps Engineer", duration: "7 months", courses: 16, color: "from-sky-500/10" },
]

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-xl space-y-20">

      {/* Hero */}
      <section className="text-center space-y-6">
        <Badge variant="secondary">Learn</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Your learning journey starts here
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Whether you are a beginner or an expert, we have structured courses, hands-on tutorials, and visual roadmaps to guide you to your goals.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg" asChild><Link href="/learn/courses">Browse Courses</Link></Button>
          <Button size="lg" variant="outline" asChild><Link href="/learn/roadmaps">View Roadmaps</Link></Button>
        </div>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: BookOpen, title: "Courses", desc: "Structured, instructor-led learning paths with video, quizzes & projects.", href: "/learn/courses" },
          { icon: Layers, title: "Tutorials", desc: "Short, hands-on, topic-specific guides. Perfect for quick skill boosts.", href: "/learn/tutorials" },
          { icon: Map, title: "Roadmaps", desc: "Visual, step-by-step career roadmaps to guide your full learning journey.", href: "/learn/roadmaps" },
        ].map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href} className="group">
            <Card className="h-full transition-all hover:border-foreground/30 hover:shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Learning Paths */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Learning Paths</h2>
            <p className="text-muted-foreground mt-1">Curated end-to-end career tracks to take you from zero to job-ready.</p>
          </div>
          <Button variant="ghost" className="group hidden sm:flex" asChild>
            <Link href="/learn/roadmaps">See all <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredPaths.map((path) => (
            <Card key={path.title} className={`bg-gradient-to-br ${path.color} to-transparent hover:shadow-md transition-all cursor-pointer group`}>
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{path.icon}</div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{path.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{path.courses} courses</span>
                <span>{path.duration}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
