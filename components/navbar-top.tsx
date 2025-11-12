"use client"

import type React from "react"
import { useState } from "react"
import { ShoppingCart, Search, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

interface NavbarTopProps {
  cartCount: number
  onCartClick: () => void
}

export default function NavbarTop({ cartCount, onCartClick }: NavbarTopProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showLanguages, setShowLanguages] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Português (Portugal)" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
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
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={t("search.search_products")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border-2 border-primary/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
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
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder={t("search.search_products")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-card border-2 border-primary/30 rounded-lg text-sm focus:outline-none focus:border-primary transition-all duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
