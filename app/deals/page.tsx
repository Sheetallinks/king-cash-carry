"use client"

import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/lib/language-context"

const deals = [
  {
    id: "d1",
    product: "California Almonds",
    discount: 25,
    originalPrice: 600,
    finalPrice: 450,
    image: "/california-almonds-nuts.jpg",
  },
  {
    id: "d2",
    product: "Premium Tea",
    discount: 30,
    originalPrice: 250,
    finalPrice: 175,
    image: "/premium-tea-leaves.jpg",
  },
  {
    id: "d3",
    product: "Turmeric Powder",
    discount: 20,
    originalPrice: 120,
    finalPrice: 96,
    image: "/turmeric-powder.png",
  },
  {
    id: "d4",
    product: "Coffee Beans",
    discount: 35,
    originalPrice: 300,
    finalPrice: 195,
    image: "/coffee-beans-roasted.jpg",
  },
  {
    id: "d5",
    product: "Cashew Nuts",
    discount: 22,
    originalPrice: 600,
    finalPrice: 468,
    image: "/cashew-nuts-roasted.jpg",
  },
  {
    id: "d6",
    product: "Cheddar Cheese",
    discount: 18,
    originalPrice: 200,
    finalPrice: 164,
    image: "/cheddar-cheese-block.png",
  },
  {
    id: "d7",
    product: "Red Apples",
    discount: 15,
    originalPrice: 80,
    finalPrice: 68,
    image: "/fresh-red-apple.png",
  },
  {
    id: "d8",
    product: "Greek Yogurt",
    discount: 20,
    originalPrice: 80,
    finalPrice: 64,
    image: "/yogurt-container.jpg",
  },
]

export default function DealsPage() {
  const { t } = useLanguage()
  
  const productNameMap: Record<string, string> = {
    "California Almonds": "product.california_almonds",
    "Premium Tea": "product.premium_tea",
    "Turmeric Powder": "product.turmeric_powder",
    "Coffee Beans": "product.coffee_beans",
    "Cashew Nuts": "product.cashew_nuts",
    "Cheddar Cheese": "product.cheddar_cheese",
    "Red Apples": "product.fresh_red_apple",
    "Greek Yogurt": "product.greek_yogurt",
  }

  const getProductName = (name: string) => {
    const key = productNameMap[name]
    return key ? t(key) : name
  }
  
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 animate-slideInLeft">{t("deals.title")}</h1>
        <p className="text-muted-foreground mb-12 animate-slideInLeft">
          {t("deals.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-slideInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden h-48 bg-background">
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.product}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {deal.discount}% {t("common.off")}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{getProductName(deal.product)}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg line-through text-muted-foreground">€{deal.originalPrice}</span>
                  <span className="text-2xl font-bold text-primary">€{deal.finalPrice}</span>
                </div>
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold">
                  {t("common.get_deal")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
