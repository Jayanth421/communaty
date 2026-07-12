import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const roadmaps = [
  { emoji: "🌐", title: "Frontend Developer", stages: ["HTML & CSS", "JavaScript", "React", "TypeScript", "Next.js"], color: "border-blue-500/30 bg-blue-500/5" },
  { emoji: "⚙️", title: "Backend Developer", stages: ["Python / Node.js", "Databases", "REST APIs", "Authentication", "Deployment"], color: "border-green-500/30 bg-green-500/5" },
  { emoji: "📱", title: "Mobile Developer", stages: ["Flutter Basics", "Dart Language", "UI/Navigation", "State Management", "App Store"], color: "border-violet-500/30 bg-violet-500/5" },
  { emoji: "🤖", title: "AI/ML Engineer", stages: ["Python", "Statistics", "NumPy & Pandas", "Machine Learning", "Deep Learning"], color: "border-orange-500/30 bg-orange-500/5" },
  { emoji: "🔐", title: "Cyber Security", stages: ["Networking Fundamentals", "Linux CLI", "Ethical Hacking", "OWASP Top 10", "Certifications"], color: "border-red-500/30 bg-red-500/5" },
  { emoji: "☁️", title: "DevOps / Cloud", stages: ["Linux", "Git & CI/CD", "Docker", "Kubernetes", "AWS / GCP"], color: "border-sky-500/30 bg-sky-500/5" },
]

export default function RoadmapsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-xl space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="secondary">Roadmaps</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight">Learning Roadmaps</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Visual, step-by-step career paths. Follow a roadmap to go from beginner to job-ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {roadmaps.map((rm) => (
          <Card key={rm.title} className={`transition-all hover:shadow-md ${rm.color}`}>
            <CardHeader>
              <div className="text-4xl mb-2">{rm.emoji}</div>
              <CardTitle className="text-xl">{rm.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="space-y-2">
                {rm.stages.map((stage, i) => (
                  <li key={stage} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full border-2 border-primary/50 flex items-center justify-center text-xs font-bold shrink-0 text-primary">{i + 1}</span>
                    <span>{stage}</span>
                  </li>
                ))}
              </ol>
              <Button size="sm" variant="outline" className="w-full group" asChild>
                <Link href="/learn/courses">
                  Start Path <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
