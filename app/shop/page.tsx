"use client"

import { useState } from "react"
import Link from "next/link"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/lib/language-context"

const allProducts = [
  // Vegetables
  {
    id: "v1",
    name: "Fresh Tomato",
    category: "Vegetables",
    price: 40,
    rating: 4.5,
    image: "/fresh-red-tomato.jpg",
    description: "Fresh and juicy red tomatoes from local farms",
  },
  {
    id: "v2",
    name: "Golden Onion",
    category: "Vegetables",
    price: 35,
    rating: 4.3,
    image: "/golden-onion.jpg",
    description: "Premium quality onions with perfect golden color",
  },
  {
    id: "v3",
    name: "Fresh Spinach",
    category: "Vegetables",
    price: 30,
    rating: 4.6,
    image: "/fresh-green-spinach.jpg",
    description: "Organic fresh spinach leaves",
  },
  {
    id: "v4",
    name: "Orange Carrot",
    category: "Vegetables",
    price: 45,
    rating: 4.4,
    image: "/orange-carrot.png",
    description: "Sweet and crunchy carrots",
  },

  // Fruits
  {
    id: "f1",
    name: "Red Apple",
    category: "Fruits",
    price: 80,
    rating: 4.7,
    image: "/fresh-red-apple.png",
    description: "Crispy red apples imported from Kashmir",
  },
  {
    id: "f2",
    name: "Yellow Banana",
    category: "Fruits",
    price: 50,
    rating: 4.5,
    image: "/yellow-banana-bunch.png",
    description: "Fresh and ripe banana bunch",
  },
  {
    id: "f3",
    name: "Fresh Orange",
    category: "Fruits",
    price: 60,
    rating: 4.6,
    image: "/images/orange.png",
    description: "Juicy sweet oranges",
  },
  {
    id: "f4",
    name: "Ripe Mango",
    category: "Fruits",
    price: 70,
    rating: 4.8,
    image: "/ripe-mango-fruit.jpg",
    description: "Premium Alphonso mangoes",
  },

  // Spices
  {
    id: "s1",
    name: "Turmeric Powder",
    category: "Spices",
    price: 120,
    rating: 4.9,
    image: "/turmeric-powder.png",
    description: "Pure organic turmeric powder",
  },
  {
    id: "s2",
    name: "Cumin Seeds",
    category: "Spices",
    price: 150,
    rating: 4.7,
    image: "/cumin-seeds.jpg",
    description: "Aromatic cumin seeds from Gujarat",
  },
  {
    id: "s3",
    name: "Red Chili Powder",
    category: "Spices",
    price: 100,
    rating: 4.6,
    image: "/red-chili-powder.jpg",
    description: "Hot and flavorful chili powder",
  },
  {
    id: "s4",
    name: "Coriander Powder",
    category: "Spices",
    price: 110,
    rating: 4.8,
    image: "/coriander-powder.jpg",
    description: "Aromatic coriander powder",
  },

  // Dairy
  {
    id: "d1",
    name: "Fresh Milk 1L",
    category: "Dairy",
    price: 55,
    rating: 4.7,
    image: "/fresh-milk-carton.jpg",
    description: "Pure fresh milk",
  },
  {
    id: "d2",
    name: "Greek Yogurt",
    category: "Dairy",
    price: 80,
    rating: 4.5,
    image: "/yogurt-container.jpg",
    description: "Creamy Greek yogurt",
  },
  {
    id: "d3",
    name: "Cheddar Cheese",
    category: "Dairy",
    price: 200,
    rating: 4.6,
    image: "/cheddar-cheese-block.png",
    description: "Premium cheddar cheese",
  },
  {
    id: "d4",
    name: "Butter 200g",
    category: "Dairy",
    price: 120,
    rating: 4.8,
    image: "/butter-pack.jpg",
    description: "Pure homemade butter",
  },

  // Beverages
  {
    id: "b1",
    name: "Orange Juice",
    category: "Beverages",
    price: 90,
    rating: 4.6,
    image: "/orange-juice-bottle.jpg",
    description: "Fresh squeezed orange juice",
  },
  {
    id: "b2",
    name: "Premium Tea",
    category: "Beverages",
    price: 250,
    rating: 4.8,
    image: "/premium-tea-leaves.jpg",
    description: "Darjeeling premium tea",
  },
  {
    id: "b3",
    name: "Coffee Beans",
    category: "Beverages",
    price: 300,
    rating: 4.7,
    image: "/coffee-beans-roasted.jpg",
    description: "Arabica coffee beans",
  },
  {
    id: "b4",
    name: "Mineral Water 1L",
    category: "Beverages",
    price: 25,
    rating: 4.5,
    image: "/mineral-water-bottle.jpg",
    description: "Pure mineral water",
  },

  // Dry Fruits
  {
    id: "df1",
    name: "California Almonds",
    category: "Dry Fruits",
    price: 500,
    rating: 4.9,
    image: "/california-almonds-nuts.jpg",
    description: "Premium California almonds",
  },
  {
    id: "df2",
    name: "Cashew Nuts",
    category: "Dry Fruits",
    price: 600,
    rating: 4.8,
    image: "/cashew-nuts-roasted.jpg",
    description: "Roasted cashew nuts",
  },
  {
    id: "df3",
    name: "Black Raisins",
    category: "Dry Fruits",
    price: 200,
    rating: 4.7,
    image: "/black-raisins-dried.jpg",
    description: "Sweetest black raisins",
  },
  {
    id: "df4",
    name: "Dates Pack",
    category: "Dry Fruits",
    price: 250,
    rating: 4.8,
    image: "/premium-dates-fruit.jpg",
    description: "Premium date fruits",
  },

  // Chips
  {
    id: "c1",
    name: "Potato Chips",
    category: "Chips",
    price: 30,
    rating: 4.4,
    image: "/crispy-potato-chips.jpg",
    description: "Crispy and salty potato chips",
  },
  {
    id: "c2",
    name: "Corn Chips",
    category: "Chips",
    price: 35,
    rating: 4.3,
    image: "/roasted-corn-chips.jpg",
    description: "Roasted corn chips",
  },
  {
    id: "c3",
    name: "Prawn Chips",
    category: "Chips",
    price: 45,
    rating: 4.5,
    image: "/spicy-prawn-chips.jpg",
    description: "Spicy prawn chips",
  },
  {
    id: "c4",
    name: "Vegetable Chips",
    category: "Chips",
    price: 40,
    rating: 4.6,
    image: "/healthy-vegetable-chips.jpg",
    description: "Healthy vegetable chips",
  },

  // Biscuits
  {
    id: "bi1",
    name: "Digestive Biscuits",
    category: "Biscuits",
    price: 50,
    rating: 4.5,
    image: "/whole-wheat-digestive-biscuits.jpg",
    description: "Whole wheat digestive biscuits",
  },
  {
    id: "bi2",
    name: "Marie Biscuits",
    category: "Biscuits",
    price: 40,
    rating: 4.4,
    image: "/light-crispy-marie-biscuits.jpg",
    description: "Light and crispy marie biscuits",
  },
  {
    id: "bi3",
    name: "Chocolate Biscuits",
    category: "Biscuits",
    price: 60,
    rating: 4.7,
    image: "/chocolate-biscuits.jpg",
    description: "Chocolate-filled biscuits",
  },
  {
    id: "bi4",
    name: "Wafer Biscuits",
    category: "Biscuits",
    price: 55,
    rating: 4.6,
    image: "/wafer-biscuits.jpg",
    description: "Crispy wafer cookies",
  },

  // Soaps
  {
    id: "so1",
    name: "Soap Bar 100g",
    category: "Soaps",
    price: 30,
    rating: 4.3,
    image: "/natural-soap-bar.jpg",
    description: "Natural herbal soap bar",
  },
  {
    id: "so2",
    name: "Shampoo 200ml",
    category: "Soaps",
    price: 80,
    rating: 4.5,
    image: "/herbal-shampoo.jpg",
    description: "Herbal shampoo for all hair types",
  },
  {
    id: "so3",
    name: "Body Wash 250ml",
    category: "Soaps",
    price: 100,
    rating: 4.6,
    image: "/body-wash.jpg",
    description: "Moisturizing body wash",
  },
  {
    id: "so4",
    name: "Handwash 500ml",
    category: "Soaps",
    price: 60,
    rating: 4.7,
    image: "/hand-wash.jpg",
    description: "Antibacterial handwash",
  },

  // Namkeen
  {
    id: "n1",
    name: "Bhujia Snack",
    category: "Namkeen",
    price: 40,
    rating: 4.5,
    image: "/bhujia-snack.jpg",
    description: "Traditional bhujia snack",
  },
  {
    id: "n2",
    name: "Mathri Crackers",
    category: "Namkeen",
    price: 50,
    rating: 4.6,
    image: "/mathri-snack.jpg",
    description: "Crispy mathri crackers",
  },
  {
    id: "n3",
    name: "Chakli Pack",
    category: "Namkeen",
    price: 45,
    rating: 4.4,
    image: "/chakli-snack.jpg",
    description: "Spiral chakli snack",
  },
  {
    id: "n4",
    name: "Sev Pack",
    category: "Namkeen",
    price: 35,
    rating: 4.5,
    image: "/sev-snack.jpg",
    description: "Crispy sev noodles",
  },
]

export default function ShopPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("popular")

  const categories = Array.from(new Set(allProducts.map((p) => p.category)))
  const filteredProducts = selectedCategory ? allProducts.filter((p) => p.category === selectedCategory) : allProducts

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  const categoryTranslations: Record<string, string> = {
    Vegetables: t("cat.vegetables"),
    Fruits: t("cat.fruits"),
    Spices: t("cat.spices"),
    Dairy: t("cat.dairy"),
    Beverages: t("cat.beverages"),
    "Dry Fruits": t("cat.dryfruits"),
    Chips: t("cat.chips"),
    Biscuits: t("cat.biscuits"),
    Soaps: t("cat.soaps"),
    Namkeen: t("cat.namkeen"),
  }

  const productNameMap: Record<string, string> = {
    "Fresh Tomato": "product.fresh_tomato",
    "Golden Onion": "product.golden_onion",
    "Fresh Spinach": "product.fresh_spinach",
    "Orange Carrot": "product.orange_carrot",
    "Red Apple": "product.red_apple",
    "Yellow Banana": "product.yellow_banana",
    "Fresh Orange": "product.fresh_orange",
    "Ripe Mango": "product.ripe_mango",
    "Turmeric Powder": "product.turmeric_powder",
    "Cumin Seeds": "product.cumin_seeds",
    "Red Chili Powder": "product.red_chili_powder",
    "Coriander Powder": "product.coriander_powder",
    "Fresh Milk 1L": "product.fresh_milk",
    "Greek Yogurt": "product.greek_yogurt",
    "Cheddar Cheese": "product.cheddar_cheese",
    "Butter 200g": "product.butter",
    "Orange Juice": "product.orange_juice",
    "Premium Tea": "product.premium_tea",
    "Coffee Beans": "product.coffee_beans",
    "Mineral Water 1L": "product.mineral_water",
    "California Almonds": "product.california_almonds",
    "Cashew Nuts": "product.cashew_nuts",
    "Black Raisins": "product.black_raisins",
    "Dates Pack": "product.dates_pack",
    "Potato Chips": "product.potato_chips",
    "Corn Chips": "product.corn_chips",
    "Prawn Chips": "product.prawn_chips",
    "Vegetable Chips": "product.vegetable_chips",
    "Digestive Biscuits": "product.digestive_biscuits",
    "Marie Biscuits": "product.marie_biscuits",
    "Chocolate Biscuits": "product.chocolate_biscuits",
    "Wafer Biscuits": "product.wafer_biscuits",
    "Soap Bar 100g": "product.soap_bar",
    "Shampoo 200ml": "product.shampoo",
    "Body Wash 250ml": "product.body_wash",
    "Handwash 500ml": "product.handwash",
    "Bhujia Snack": "product.bhujia_snack",
    "Mathri Crackers": "product.mathri_crackers",
    "Chakli Pack": "product.chakli_pack",
    "Sev Pack": "product.sev_pack",
  }

  const getProductName = (name: string) => {
    const key = productNameMap[name]
    return key ? t(key) : name
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 animate-slideInLeft">{t("shop.title")}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="md:w-48 animate-slideInLeft">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-primary mb-4">{t("shop.categories")}</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-background"
                  }`}
                >
                  {t("shop.all_products")}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-background"
                    }`}
                  >
                    {categoryTranslations[category] || category}
                  </button>
                ))}
              </div>

              <h2 className="text-lg font-bold text-primary mt-6 mb-4">{t("shop.sort_by")}</h2>
              <div className="space-y-2">
                {[
                  { value: "popular", labelKey: "shop.popular" },
                  { value: "price-low", labelKey: "shop.price_low" },
                  { value: "price-high", labelKey: "shop.price_high" },
                  { value: "rating", labelKey: "shop.highest_rated" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      sortBy === option.value ? "bg-primary text-primary-foreground" : "hover:bg-background"
                    }`}
                  >
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
              {sortedProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-slideInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative overflow-hidden h-48 bg-background">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{categoryTranslations[product.category] || product.category}</p>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{getProductName(product.name)}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary">€{product.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-foreground">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
