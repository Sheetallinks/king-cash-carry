"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PageLayout from "@/components/page-layout"
import Link from "next/link"

const allProducts = [
  { id: "v1", name: "Fresh Tomato", price: 40, image: "/fresh-red-tomato.jpg", category: "Vegetables", rating: 4.5 },
  { id: "v2", name: "Golden Onion", price: 35, image: "/golden-onion.jpg", category: "Vegetables", rating: 4.3 },
  {
    id: "v3",
    name: "Fresh Spinach",
    price: 30,
    image: "/fresh-green-spinach.jpg",
    category: "Vegetables",
    rating: 4.7,
  },
  { id: "v4", name: "Orange Carrot", price: 45, image: "/orange-carrot.png", category: "Vegetables", rating: 4.6 },
  { id: "f1", name: "Fresh Red Apple", price: 80, image: "/fresh-red-apple.png", category: "Fruits", rating: 4.8 },
  { id: "f2", name: "Yellow Bananas", price: 50, image: "/yellow-banana-bunch.png", category: "Fruits", rating: 4.6 },
  { id: "f3", name: "Orange", price: 60, image: "/images/orange.png", category: "Fruits", rating: 4.5 },
  { id: "f4", name: "Ripe Mango", price: 100, image: "/ripe-mango-fruit.jpg", category: "Fruits", rating: 4.9 },
  { id: "s1", name: "Turmeric Powder", price: 120, image: "/turmeric-powder.png", category: "Spices", rating: 4.7 },
  { id: "s2", name: "Cumin Seeds", price: 150, image: "/cumin-seeds-spice.jpg", category: "Spices", rating: 4.6 },
  { id: "s3", name: "Chili Powder", price: 100, image: "/red-chili-powder.jpg", category: "Spices", rating: 4.8 },
  { id: "s4", name: "Coriander", price: 130, image: "/coriander-powder.jpg", category: "Spices", rating: 4.5 },
  { id: "d1", name: "Fresh Milk", price: 65, image: "/fresh-milk-carton.jpg", category: "Dairy", rating: 4.7 },
  { id: "d2", name: "Yogurt", price: 50, image: "/yogurt-container.jpg", category: "Dairy", rating: 4.6 },
  { id: "d3", name: "Cheese Block", price: 250, image: "/cheese-block.png", category: "Dairy", rating: 4.8 },
  { id: "d4", name: "Butter", price: 180, image: "/butter-pack.jpg", category: "Dairy", rating: 4.5 },
  { id: "b1", name: "Orange Juice", price: 80, image: "/orange-juice-bottle.jpg", category: "Beverages", rating: 4.6 },
  { id: "b2", name: "Premium Tea", price: 200, image: "/premium-tea-leaves.jpg", category: "Beverages", rating: 4.8 },
  {
    id: "b3",
    name: "Coffee Beans",
    price: 250,
    image: "/coffee-beans-roasted.jpg",
    category: "Beverages",
    rating: 4.9,
  },
  {
    id: "b4",
    name: "Mineral Water",
    price: 30,
    image: "/mineral-water-bottle.jpg",
    category: "Beverages",
    rating: 4.4,
  },
  {
    id: "df1",
    name: "California Almonds",
    price: 500,
    image: "/california-almonds-nuts.jpg",
    category: "Dry Fruits",
    rating: 4.9,
  },
  {
    id: "df2",
    name: "Cashew Nuts",
    price: 450,
    image: "/cashew-nuts-roasted.jpg",
    category: "Dry Fruits",
    rating: 4.8,
  },
  {
    id: "df3",
    name: "Black Raisins",
    price: 200,
    image: "/black-raisins-dried.jpg",
    category: "Dry Fruits",
    rating: 4.6,
  },
  {
    id: "df4",
    name: "Premium Dates",
    price: 300,
    image: "/premium-dates-fruit.jpg",
    category: "Dry Fruits",
    rating: 4.7,
  },
  { id: "c1", name: "Potato Chips", price: 40, image: "/crispy-potato-chips.jpg", category: "Chips", rating: 4.5 },
  { id: "c2", name: "Corn Chips", price: 45, image: "/roasted-corn-chips.jpg", category: "Chips", rating: 4.6 },
  { id: "c3", name: "Prawn Chips", price: 80, image: "/spicy-prawn-chips.jpg", category: "Chips", rating: 4.7 },
  {
    id: "c4",
    name: "Vegetable Chips",
    price: 50,
    image: "/healthy-vegetable-chips.jpg",
    category: "Chips",
    rating: 4.8,
  },
  {
    id: "bi1",
    name: "Digestive Biscuits",
    price: 60,
    image: "/whole-wheat-digestive-biscuits.jpg",
    category: "Biscuits",
    rating: 4.6,
  },
  {
    id: "bi2",
    name: "Marie Biscuits",
    price: 50,
    image: "/light-crispy-marie-biscuits.jpg",
    category: "Biscuits",
    rating: 4.5,
  },
  {
    id: "bi3",
    name: "Chocolate Biscuits",
    price: 70,
    image: "/chocolate-biscuits.jpg",
    category: "Biscuits",
    rating: 4.7,
  },
  {
    id: "bi4",
    name: "Wafer Biscuits",
    price: 65,
    image: "/wafer-biscuits.jpg",
    category: "Biscuits",
    rating: 4.6,
  },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const results = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
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
