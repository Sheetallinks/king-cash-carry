"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ShoppingCart, Search, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { categoryProducts } from "@/lib/products-data"

interface NavbarTopProps {
  cartCount: number
  onCartClick: () => void
}

// Flatten all products from all categories
const allProducts = Object.values(categoryProducts).flat()

export default function NavbarTop({ cartCount, onCartClick }: NavbarTopProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showLanguages, setShowLanguages] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<typeof allProducts>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Português (Portugal)" },
  ]

  // Update suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        .slice(0, 8) // Show max 8 suggestions
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false)
    setSearchQuery("")
    router.push(`/product/${productId}`)
  }

  const handleViewAllResults = () => {
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border animate-fadeInUp">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 animate-slideInLeft flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/king%20cash%20and%20carry%20logo-6HnJhkyrSYy8V1xsFsVUmMHWbRZZWZ.jpeg"
              alt="King Cash & Carry Logo"
              width={140}
              height={140}
              className="w-32 h-32 md:w-36 md:h-36 object-contain"
            />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden sm:flex">
            <div ref={searchRef} className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <input
                type="text"
                placeholder={t("search.search_products")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
                className="w-full pl-10 pr-4 py-2 bg-card border-2 border-primary/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.id)}
                        className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150 flex items-center gap-3 group"
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground group-hover:text-primary truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                          <p className="text-sm font-bold text-primary mt-1">€{product.price}</p>
                        </div>
                      </button>
                    ))}
                    {searchQuery.trim().length > 0 && (
                      <button
                        onClick={handleViewAllResults}
                        className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150 text-sm font-medium text-primary border-t border-border mt-2 pt-3"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3 animate-slideInRight">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-3 py-2 bg-card hover:bg-card/80 border border-border rounded-lg transition-all duration-300 group"
              >
                <Globe className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{language.toUpperCase()}</span>
              </button>
              {showLanguages && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg animate-fadeInUp z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "pt")
                        setShowLanguages(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 ${
                        language === lang.code ? "text-primary font-bold" : "text-foreground"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 bg-card hover:bg-card/80 rounded-lg transition-all duration-300 animate-glow group"
            >
              <ShoppingCart className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="sm:hidden mt-3">
          <div ref={searchRef} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
            <input
              type="text"
              placeholder={t("search.search_products")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
              className="w-full pl-9 pr-3 py-2 bg-card border-2 border-primary/30 rounded-lg text-sm focus:outline-none focus:border-primary transition-all duration-300"
            />
            
            {/* Mobile Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl max-h-80 overflow-y-auto z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150 flex items-center gap-2 group"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-foreground group-hover:text-primary truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                        <p className="text-xs font-bold text-primary">€{product.price}</p>
                      </div>
                    </button>
                  ))}
                  {searchQuery.trim().length > 0 && (
                    <button
                      onClick={handleViewAllResults}
                      className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150 text-xs font-medium text-primary border-t border-border mt-2 pt-2"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
