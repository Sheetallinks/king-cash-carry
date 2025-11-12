"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface FeaturedProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  discount: number
  rating: number
}

interface FeaturedProps {
  onAddToCart: (product: any) => void
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: "fp1",
    name: "Premium Basmati Rice (5kg)",
    price: 450,
    originalPrice: 550,
    image: "/white-basmati-rice-premium.jpg",
    discount: 18,
    rating: 4.8,
  },
  {
    id: "fp2",
    name: "Masala Chai Tea (250g)",
    price: 200,
    originalPrice: 280,
    image: "/indian-chai-masala-tea.jpg",
    discount: 28,
    rating: 4.9,
  },
  {
    id: "fp3",
    name: "Mixed Namkeen (1kg)",
    price: 320,
    originalPrice: 420,
    image: "/indian-namkeen-snacks-mix.jpg",
    discount: 23,
    rating: 4.7,
  },
  {
    id: "fp4",
    name: "Coconut Oil (500ml)",
    price: 280,
    originalPrice: 380,
    image: "/pure-coconut-oil-premium.jpg",
    discount: 26,
    rating: 4.9,
  },
]

export default function Featured({ onAddToCart }: FeaturedProps) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)
    return () => clearInterval(autoSlide)
  }, [])

  const productNameMap: Record<string, string> = {
    "Premium Basmati Rice (5kg)": "product.premium_basmati_rice",
    "Masala Chai Tea (250g)": "product.masala_chai_tea",
    "Mixed Namkeen (1kg)": "product.mixed_namkeen",
    "Coconut Oil (500ml)": "product.coconut_oil",
  }

  const getProductName = (name: string) => {
    const key = productNameMap[name]
    return key ? t(key) : name
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Banner Header */}
        <div className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-8 md:p-12 mb-12 overflow-hidden shadow-2xl animate-fadeInUp">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
                <span className="text-yellow-300 text-sm font-bold tracking-widest uppercase">{t("featured.special_offers")}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
                {t("featured.flash_deals")} <span className="text-yellow-300">{t("featured.deals")}</span>
              </h2>
              <p className="text-white/90 text-lg mb-4">{t("featured.subtitle")}</p>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{t("featured.ends_in")}: {formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{t("featured.up_to")}</div>
                  <div className="text-6xl font-black text-yellow-300 mb-2">28%</div>
                  <div className="text-xl font-bold text-white">{t("featured.off")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProducts.map((product, idx) => (
                <div key={product.id} className="min-w-full px-2">
                  <div className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl overflow-hidden border-2 border-primary/20 hover:border-primary shadow-xl group">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                        <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-bounce">
                          -{product.discount}% {t("common.off")}
                        </div>
                        <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="font-bold text-lg">{product.rating}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-card to-background">
                        <div className="mb-6">
                          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                            {getProductName(product.name)}
                          </h3>
                          <p className="text-muted-foreground text-lg mb-6">{t("featured.premium_quality")}</p>
                        </div>

                        <div className="mb-8">
                          <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-5xl md:text-6xl font-black text-primary">€{product.price}</span>
                            <span className="text-2xl text-muted-foreground line-through">€{product.originalPrice}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t("featured.you_save")} €{product.originalPrice - product.price}
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-xl font-bold text-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                          <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          {t("common.add_to_cart")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-md hover:bg-background border-2 border-primary/30 hover:border-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-md hover:bg-background border-2 border-primary/30 hover:border-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-primary/30 w-3 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
