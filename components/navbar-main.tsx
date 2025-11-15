"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { categoryProducts } from "@/lib/products-data"

export default function NavbarMain() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 })
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useLanguage()
  const router = useRouter()

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = (callback: () => void, delay: number = 200) => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(callback, delay)
  }

  useEffect(() => {
    const updateSubmenuPosition = () => {
      // Find the dropdown content element (it's in a portal)
      const dropdownContent = document.querySelector('[data-slot="dropdown-menu-content"]') as HTMLElement
      if (dropdownContent && hoveredCategory) {
        const rect = dropdownContent.getBoundingClientRect()
        setSubmenuPosition({
          top: rect.top,
          left: rect.right + 8, // 8px gap between dropdowns
        })
      }
    }

    if (isDropdownOpen && hoveredCategory) {
      // Small delay to ensure DOM is updated
      const timeout = setTimeout(updateSubmenuPosition, 10)
      window.addEventListener('scroll', updateSubmenuPosition, true)
      window.addEventListener('resize', updateSubmenuPosition)

      return () => {
        clearTimeout(timeout)
        window.removeEventListener('scroll', updateSubmenuPosition, true)
        window.removeEventListener('resize', updateSubmenuPosition)
      }
    }

    return () => {
      clearCloseTimeout()
    }
  }, [isDropdownOpen, hoveredCategory])

  const categories = [
    { name: "Flour", slug: "flour" },
    { name: "Rice", slug: "rice" },
    { name: "Pulses", slug: "pulses" },
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

  const navItems = [
    { nameKey: "nav.home", href: "/" },
    { nameKey: "nav.shop", href: "/shop" },
    { nameKey: "nav.about", href: "/about" },
    { nameKey: "nav.deals", href: "/deals" },
    { nameKey: "nav.founders", href: "/founders" },
    { nameKey: "nav.contact", href: "/contact" },
  ]

  const getProductsForCategory = (slug: string) => {
    return categoryProducts[slug] || []
  }

  return (
    <nav className="bg-card border-b border-border animate-slideInLeft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Category Dropdown */}
          <div className="hidden md:flex items-center pl-4 relative">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} modal={false}>
              <DropdownMenuTrigger
                onMouseEnter={() => {
                  clearCloseTimeout()
                  setIsDropdownOpen(true)
                }}
                onMouseLeave={(e) => {
                  // Check if mouse is moving to dropdown content
                  const relatedTarget = e.relatedTarget as HTMLElement
                  const isMovingToDropdown = relatedTarget?.closest('[data-slot="dropdown-menu-content"]')
                  
                  if (!isMovingToDropdown) {
                    // Close immediately if not moving to dropdown
                    clearCloseTimeout()
                    setIsDropdownOpen(false)
                    setHoveredCategory(null)
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 font-medium text-sm group"
              >
                Shop by Category
                <ChevronDown className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform duration-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-64 max-h-[600px] overflow-y-auto transition-all duration-200"
                onMouseEnter={() => {
                  clearCloseTimeout()
                  setIsDropdownOpen(true)
                }}
                onMouseLeave={(e) => {
                  // Check if mouse is moving to submenu
                  const relatedTarget = e.relatedTarget as HTMLElement
                  const isMovingToSubmenu = relatedTarget?.closest('[data-category]')
                  
                  if (!isMovingToSubmenu) {
                    // Close immediately if not moving to submenu
                    clearCloseTimeout()
                    setIsDropdownOpen(false)
                    setHoveredCategory(null)
                  }
                }}
              >
                {categories.map((category) => {
                  const products = getProductsForCategory(category.slug)
                  const hasProducts = products.length > 0

                  return (
                    <DropdownMenuItem
                      key={category.slug}
                      onMouseEnter={() => {
                        clearCloseTimeout()
                        setHoveredCategory(category.slug)
                      }}
                      onMouseLeave={(e) => {
                        // Check if mouse is moving to submenu
                        const relatedTarget = e.relatedTarget as HTMLElement
                        const isMovingToSubmenu = relatedTarget?.closest('[data-category]')
                        
                        if (!isMovingToSubmenu) {
                          // Close immediately if not moving to submenu
                          clearCloseTimeout()
                          setHoveredCategory(null)
                        }
                      }}
                      asChild
                    >
                      <Link
                        href={`/category/${category.slug}`}
                        className="cursor-pointer flex items-center justify-between w-full"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span>{category.name}</span>
                        {hasProducts && (
                          <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-200" />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Product Submenu - Separate box positioned to the right of dropdown */}
            {hoveredCategory && isDropdownOpen && (() => {
              const products = getProductsForCategory(hoveredCategory)
              if (products.length === 0) return null
              
              return (
                <div
                  data-category={hoveredCategory}
                  className="fixed w-64 bg-popover text-popover-foreground border border-border rounded-md shadow-xl max-h-[400px] overflow-y-auto z-[60] animate-in fade-in-0 zoom-in-95 slide-in-from-left-2 duration-200"
                  style={{
                    top: `${submenuPosition.top}px`,
                    left: `${submenuPosition.left}px`,
                  }}
                  onMouseEnter={() => {
                    clearCloseTimeout()
                    setHoveredCategory(hoveredCategory)
                    setIsDropdownOpen(true)
                  }}
                  onMouseLeave={() => {
                    // Close immediately when leaving submenu
                    clearCloseTimeout()
                    setHoveredCategory(null)
                    setIsDropdownOpen(false)
                  }}
                >
                  <div className="p-1">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="block px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150 cursor-pointer"
                        onClick={() => {
                          setIsDropdownOpen(false)
                          setHoveredCategory(null)
                        }}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center ml-[500px]">
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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 font-medium text-sm">
                Categories
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-[400px] overflow-y-auto">
                {categories.map((category) => {
                  const products = getProductsForCategory(category.slug)
                  const hasProducts = products.length > 0

                  return hasProducts ? (
                    <DropdownMenuSub key={category.slug}>
                      <DropdownMenuSubTrigger asChild>
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href={`/category/${category.slug}`}
                            className="flex-1 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            {category.name}
                          </Link>
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </div>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-56 max-h-[300px] overflow-y-auto">
                        {products.map((product) => (
                          <DropdownMenuItem key={product.id} asChild>
                            <Link
                              href={`/product/${product.id}`}
                              className="cursor-pointer"
                            >
                              {product.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ) : (
                    <DropdownMenuItem key={category.slug} asChild>
                      <Link
                        href={`/category/${category.slug}`}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
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
