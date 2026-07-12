export type Course = {
  id: string
  title: string
  instructor: string
  rating: number
  students: number
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  thumbnail: string
  price: number
  tags: string[]
}

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Next.js 15 Full Stack Masterclass",
    instructor: "Lee Robinson",
    rating: 4.9,
    students: 12450,
    duration: "12 hours",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    price: 99,
    tags: ["React", "Next.js", "TypeScript"]
  },
  {
    id: "2",
    title: "Python for Data Science & Machine Learning",
    instructor: "Andrew Ng",
    rating: 4.8,
    students: 85200,
    duration: "24 hours",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    price: 49,
    tags: ["Python", "Machine Learning", "Data Science"]
  },
  {
    id: "3",
    title: "Advanced CSS and Tailwind V4",
    instructor: "Adam Wathan",
    rating: 4.9,
    students: 5430,
    duration: "8 hours",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    price: 0,
    tags: ["CSS", "Tailwind"]
  },
  {
    id: "4",
    title: "Complete Firebase Web Integration",
    instructor: "Fireship",
    rating: 4.7,
    students: 31200,
    duration: "5 hours",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    price: 29,
    tags: ["Firebase", "Backend"]
  },
  {
    id: "5",
    title: "UI/UX Design with Figma",
    instructor: "Gary Simon",
    rating: 4.6,
    students: 18900,
    duration: "15 hours",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    price: 59,
    tags: ["Design", "Figma", "UI/UX"]
  },
  {
    id: "6",
    title: "Cyber Security Fundamentals",
    instructor: "NetworkChuck",
    rating: 4.8,
    students: 42100,
    duration: "20 hours",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    price: 79,
    tags: ["Security", "Networking"]
  }
]
