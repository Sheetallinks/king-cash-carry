"use client"

import Link from "next/link"

export default function NavbarCategories() {
  const categories = [
    { name: "Vegetables", slug: "vegetables" },
    { name: "Fruits", slug: "fruits" },
    { name: "Spices", slug: "spices" },
    { name: "Dairy", slug: "dairy" },
    { name: "Beverages", slug: "beverages" },
    { name: "Dry Fruits", slug: "dry-fruits" },
    { name: "Chips", slug: "chips" },
    { name: "Biscuits", slug: "biscuits" },
    { name: "Soaps", slug: "soaps" },
    { name: "Namkeen", slug: "namkeen" },
  ]

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 py-3 overflow-x-auto md:overflow-x-visible md:justify-center md:flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="flex-shrink-0 px-4 py-2 bg-card hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary rounded-lg transition-all duration-300 whitespace-nowrap text-sm font-semibold text-foreground hover:shadow-lg hover:scale-105 transform"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
