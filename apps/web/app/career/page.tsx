import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { ArrowRight, Briefcase, GraduationCap, Code2, Building2 } from "lucide-react"
import Link from "next/link"

const modules = [
  { icon: Briefcase, title: "Jobs", desc: "Browse full-time, part-time, and remote roles from verified companies.", href: "/career/jobs", count: "1,240 openings" },
  { icon: GraduationCap, title: "Internships", desc: "Structured internship opportunities at startups and top tech companies.", href: "/career/internships", count: "320 internships" },
  { icon: Code2, title: "Freelance Projects", desc: "Find freelance gigs or post your project for proposals from our community.", href: "/career/freelance", count: "540 projects" },
  { icon: Building2, title: "Companies", desc: "Explore company profiles, culture, and open roles at a glance.", href: "/career/companies", count: "180 companies" },
]

export default function CareerPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-screen-xl space-y-20">
      <section className="text-center space-y-5">
        <Badge variant="secondary">Career</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Launch your tech career
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find jobs, internships, freelance gigs, and connect with companies who are hiring from the COMMUNTAY community.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {modules.map(({ icon: Icon, title, desc, href, count }) => (
          <Link key={title} href={href} className="group">
            <Card className="h-full transition-all hover:border-foreground/30 hover:shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
                  {title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{desc}</p>
                <Badge variant="secondary">{count}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <section className="bg-muted/40 rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Career Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: "📝", title: "Resume Builder", desc: "AI-powered resume builder with templates reviewed by hiring managers." },
            { emoji: "🎯", title: "Interview Prep", desc: "Practice mock interviews, system design, and behavioral questions." },
            { emoji: "💡", title: "Salary Insights", desc: "See real salary ranges for thousands of tech roles by location and experience." },
          ].map((item) => (
            <div key={item.title} className="text-center space-y-2">
              <div className="text-4xl">{item.emoji}</div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
