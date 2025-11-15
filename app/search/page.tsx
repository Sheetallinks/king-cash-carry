"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PageLayout from "@/components/page-layout"
import Link from "next/link"
import { categoryProducts } from "@/lib/products-data"

// Flatten all products from all categories into a single array
const allProducts = Object.values(categoryProducts).flat()

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const results = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <PageLayout cartCount={0} onCartClick={() => {}}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="mb-12 text-center animate-fadeInUp">
          <h1 className="text-4xl font-bold text-primary mb-3">Search Results</h1>
          <p className="text-muted-foreground text-lg">
            Found {results.length} results for "<span className="font-semibold text-foreground">{query}</span>"
          </p>
        </div>

        {/* Products Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-2xl hover:border-primary transition-all duration-300 transform hover:scale-105">
                  {/* Product Image */}
                  <div className="relative h-48 bg-background overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-primary mb-3">{product.category}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < Math.floor(product.rating) ? "text-primary" : "text-muted-foreground"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.rating})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">€{product.price}</span>
                      <button className="px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No products found matching your search.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
