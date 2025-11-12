"use client"

import type React from "react"

import NavbarTop from "./navbar-top"
import NavbarMain from "./navbar-main"
import NavbarCategories from "./navbar-categories"
import Footer from "./footer"
import Cart from "./cart"
import WhatsAppButton from "./whatsapp-button"
import BackToTop from "./back-to-top"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { cartItems, removeFromCart } = useCart()
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <NavbarTop cartCount={cartItems.length} onCartClick={() => {}} />
      <NavbarMain />
      <NavbarCategories />

      {showCart && <Cart items={cartItems} onRemove={removeFromCart} onClose={() => setShowCart(false)} />}

      <main className="flex-1">{children}</main>

      <Footer />
      
      {/* WhatsApp and Back to Top buttons */}
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}
