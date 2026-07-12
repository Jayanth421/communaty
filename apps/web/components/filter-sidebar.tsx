"use client"

import { Input } from "@repo/ui/input"
import { Checkbox } from "@repo/ui/checkbox"
import { Search } from "lucide-react"

export function FilterSidebar() {
  return (
    <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search courses..." className="pl-9" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2.5">
          {["Development", "Design", "Business", "Marketing", "IT & Software"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={`cat-${item}`} />
              <label
                htmlFor={`cat-${item}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Difficulty</h3>
        <div className="space-y-2.5">
          {["Beginner", "Intermediate", "Advanced"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={`diff-${item}`} />
              <label
                htmlFor={`diff-${item}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price</h3>
        <div className="space-y-2.5">
          {["Free", "Paid"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={`price-${item}`} />
              <label
                htmlFor={`price-${item}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
