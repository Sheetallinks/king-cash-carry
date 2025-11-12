"use client"

import PageLayout from "@/components/page-layout"
import HeroCarousel from "@/components/hero-carousel"
import Categories from "@/components/categories"
import Featured from "@/components/featured-products"
import About from "@/components/about"
import Newsletter from "@/components/newsletter"
import { useCart } from "@/lib/cart-context"

export default function Home() {
  const { addToCart } = useCart()

  return (
    <PageLayout>
      <HeroCarousel />
      <Categories onAddToCart={addToCart} />
      <Featured onAddToCart={addToCart} />
      <About />
      <Newsletter />
    </PageLayout>
  )
}
