import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started with learning.",
    features: [
      "Access to free courses",
      "Community forum access",
      "5 project submissions / month",
      "Basic portfolio page",
      "Join up to 3 communities",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: 19,
    description: "For serious learners and career builders.",
    features: [
      "Everything in Free",
      "Unlimited premium courses",
      "AI-powered learning assistant",
      "Verified certificates",
      "Unlimited project submissions",
      "Job & internship applications",
      "Priority mentor sessions",
      "Advanced portfolio tools",
    ],
    cta: "Start Pro",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Teams",
    price: 49,
    description: "For organizations, bootcamps & companies.",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom learning paths",
      "Bulk seat management",
      "Analytics & reporting",
      "API access",
      "Dedicated support",
      "Custom branding",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-screen-xl">
      <div className="text-center mb-16 space-y-4">
        <Badge variant="secondary">Pricing</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works for you. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg shadow-primary/10 scale-105" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-4 py-1">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
              <div className="mt-4">
                <span className="text-5xl font-extrabold">${plan.price}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-6">
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-auto"
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-10">Still have questions? <Link href="#" className="underline underline-offset-4">Contact us</Link></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {[
            ["Can I cancel anytime?", "Yes. You can cancel your subscription at any time from your account settings. You'll retain access until your billing period ends."],
            ["Do you offer student discounts?", "Yes! Students with a valid .edu email get 50% off the Pro plan. Contact our support team to apply."],
            ["What payment methods do you accept?", "We accept all major credit cards, PayPal, and select regional payment methods via Stripe."],
            ["Are certificates recognized by employers?", "Our verified certificates are issued on the blockchain and recognized by 500+ partner companies."],
          ].map(([q, a]) => (
            <div key={q} className="space-y-2">
              <h3 className="font-semibold">{q}</h3>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
