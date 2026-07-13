import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { Button } from "@repo/ui/button"
import { Star, Clock, Users } from "lucide-react"

type Course = {
  id: string
  title: string
  instructor?: string
  thumbnail?: string
  price?: number
  tags?: string[]
  rating?: number
  students?: number
  duration?: string
  [key: string]: any
}

export function CourseCard({ course }: { course: Course }) {
  const isFree = !course.price || course.price === 0
  const rating = course.rating ?? 0
  const students = course.students ?? 0

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-foreground/20 group">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"}
          alt={course.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant={isFree ? "default" : "secondary"} className="bg-background/90 backdrop-blur">
            {isFree ? "Free" : `$${course.price}`}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {course.tags.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <CardTitle className="text-lg line-clamp-2 leading-tight">
          {course.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{course.instructor || "Platform Instructor"}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{rating}</span>
            </div>
          )}
          {students > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{(students / 1000).toFixed(1)}k</span>
            </div>
          )}
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full font-semibold" variant="default">
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  )
}
