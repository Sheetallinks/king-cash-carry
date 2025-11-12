"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function NavbarMain() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { nameKey: "nav.home", href: "/" },
    { nameKey: "nav.shop", href: "/shop" },
    { nameKey: "nav.about", href: "/about" },
    { nameKey: "nav.deals", href: "/deals" },
    { nameKey: "nav.founders", href: "/founders" },
    { nameKey: "nav.contact", href: "/contact" },
  ]

  return (
    <nav className="bg-card border-b border-border animate-slideInLeft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-14">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.nameKey}
                href={item.href}
                className="relative text-foreground hover:text-primary transition-colors duration-300 font-medium text-sm group"
              >
                {t(item.nameKey)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden w-full flex justify-between items-center">
            <div />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-background rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeInUp">
            {navItems.map((item) => (
              <Link
                key={item.nameKey}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-background rounded-lg transition-all duration-200"
              >
                {t(item.nameKey)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
