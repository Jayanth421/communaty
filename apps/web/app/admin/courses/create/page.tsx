"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { db } from "@repo/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function CreateCoursePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    title: "",
    instructor: "",
    description: "",
    difficulty: "Beginner",
    category: "",
    duration: "",
    price: "",
    thumbnail: "",
    status: "Pending Review",
    featured: false,
    rating: 0,
    students: 0,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.instructor) return

    setSaving(true)
    try {
      await addDoc(collection(db, "courses"), {
        ...form,
        price: form.price ? parseFloat(form.price) : 0,
        createdAt: serverTimestamp(),
      })
      setSaved(true)
      setTimeout(() => router.push("/admin/courses"), 1500)
    } catch (error) {
      console.error("Error creating course:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link href="/admin/courses"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Add a new course to the Firestore database.</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-green-600 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm">
          <CheckCircle className="h-4 w-4" />
          Course created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Basic Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Course Title <span className="text-red-500">*</span></label>
              <Input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Next.js 15 Full Stack Masterclass" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Instructor Name <span className="text-red-500">*</span></label>
              <Input name="instructor" value={form.instructor} onChange={handleChange} placeholder="e.g. John Doe" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of the course..."
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {["Beginner", "Intermediate", "Advanced"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {["Pending Review", "Published", "Flagged"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <Input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Web Development" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Duration</label>
                <Input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 12 hours" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Price (USD)</label>
                <Input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0 for free" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Thumbnail URL</label>
                <Input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="rounded"
              />
              <span className="font-medium">Feature this course on homepage</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving || saved} className="flex-1">
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Create Course"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/courses">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
