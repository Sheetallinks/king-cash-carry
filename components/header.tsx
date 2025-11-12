"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, Search } from "lucide-react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border animate-fadeInUp">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 animate-slideInLeft">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary">King Cash & Carry</h1>
              <p className="text-xs text-muted-foreground">Premium Indian Groceries</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            {["Home", "Shop", "About", "Contact"].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4 animate-slideInRight">
            <button className="hidden md:block p-2 hover:bg-card rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-card rounded-lg transition-colors animate-glow"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fadeInUp">
            {["Home", "Shop", "About", "Contact"].map((item, idx) => (
              <a key={idx} href="#" className="block py-2 text-foreground hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
