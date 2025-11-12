"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const heroSlides = [
  {
    image: "/fresh-vegetables-indian-market.jpg",
    titleKey: "cat.vegetables",
  },
  {
    image: "/fresh-fruits-apples-mangoes-oranges.jpg",
    titleKey: "cat.fruits",
  },
  {
    image: "/indian-spices-turmeric-cumin-cinnamon.jpg",
    titleKey: "cat.spices",
  },
  {
    image: "/dry-fruits-almonds-cashews-raisins.jpg",
    titleKey: "cat.dryfruits",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  return (
    <section className="relative h-96 md:h-screen bg-background overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img 
            src={slide.image || "/placeholder.svg"} 
            alt={t(slide.titleKey)} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className={`text-left max-w-2xl transform transition-all duration-1000 ${
                index === currentSlide ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}>
                <div className="inline-block mb-4">
                  <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-widest">
                    {t("hero.premium_quality")}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
                  {t(slide.titleKey)}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">{t("hero.description")}</p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl">
                    {t("hero.shop_now")}
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
                    {t("hero.learn_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-background/90 backdrop-blur-md hover:bg-background border-2 border-primary/30 hover:border-primary rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-background/90 backdrop-blur-md hover:bg-background border-2 border-primary/30 hover:border-primary rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-10 shadow-lg shadow-primary/50" : "bg-white/50 hover:bg-white/75 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
