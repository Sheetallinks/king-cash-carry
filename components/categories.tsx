"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Category {
  id: string
  name: string
  icon: string
  image: string
  products: Product[]
}

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface CategoriesProps {
  onAddToCart: (product: any) => void
}

function CategoryProductSlider({ 
  category, 
  categoryName, 
  onAddToCart, 
  getProductName, 
  t 
}: { 
  category: Category
  categoryName: string
  onAddToCart: (product: any) => void
  getProductName: (name: string) => string
  t: (key: string) => string
}) {
  const [productScrollPosition, setProductScrollPosition] = useState(0)
  const productScrollRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)

  const scrollProducts = (direction: "left" | "right") => {
    if (productScrollRef.current) {
      const scrollAmount = 320
      const newPosition = direction === "left" 
        ? scrollPositionRef.current - scrollAmount 
        : scrollPositionRef.current + scrollAmount
      const maxScroll = productScrollRef.current.scrollWidth - productScrollRef.current.clientWidth
      const finalPosition = Math.max(0, Math.min(newPosition, maxScroll))
      scrollPositionRef.current = finalPosition
      setProductScrollPosition(finalPosition)
      productScrollRef.current.scrollTo({ left: finalPosition, behavior: "smooth" })
    }
  }

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (productScrollRef.current) {
        const scrollAmount = 320
        const maxScroll = productScrollRef.current.scrollWidth - productScrollRef.current.clientWidth
        const newPosition = scrollPositionRef.current + scrollAmount
        
        if (newPosition >= maxScroll) {
          // Loop back to the beginning
          scrollPositionRef.current = 0
          setProductScrollPosition(0)
          productScrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          // Scroll to next position
          scrollPositionRef.current = newPosition
          setProductScrollPosition(newPosition)
          productScrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
        }
      }
    }, 2000) // Every 2 seconds

    return () => clearInterval(autoScroll)
  }, [])

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{category.icon}</div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-primary mb-1">
              {categoryName}
            </h3>
            <p className="text-muted-foreground">{t("categories.best_products")}</p>
          </div>
        </div>
        <Link
          href={`/category/${category.id === "dryfruits" ? "dry-fruits" : category.id}`}
          className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
        >
          {t("categories.view_all")}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="relative">
        <div
          ref={productScrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {category.products.map((product, idx) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-card via-card to-card/80 rounded-2xl border-2 border-border overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group flex-shrink-0 w-72 animate-scaleIn"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  {t("common.new")}
                </div>
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-bold">4.8</span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {getProductName(product.name)}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-black text-primary">€{product.price}</span>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-5 py-2.5 rounded-xl font-bold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {t("common.add")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Product navigation buttons */}
        <button
          onClick={() => scrollProducts("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-md hover:bg-background border-2 border-primary/30 hover:border-primary rounded-full p-2.5 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <button
          onClick={() => scrollProducts("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-md hover:bg-background border-2 border-primary/30 hover:border-primary rounded-full p-2.5 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  )
}

// Category products matching the category pages - all 10 products per category
const categoryProductsData: Record<string, any[]> = {
  vegetables: [
    { id: "v1", name: "Fresh Tomato", price: 40, image: "/fresh-red-tomato.jpg" },
    { id: "v2", name: "Golden Onion", price: 35, image: "/golden-onion.jpg" },
    { id: "v3", name: "Fresh Spinach", price: 30, image: "/fresh-green-spinach.jpg" },
    { id: "v4", name: "Orange Carrot", price: 45, image: "/orange-carrot.png" },
    { id: "v5", name: "Green Capsicum", price: 60, image: "/fresh-green-capsicum.jpg" },
    { id: "v6", name: "Fresh Garlic", price: 50, image: "/fresh-garlic-bulbs.jpg" },
    { id: "v7", name: "Green Beans", price: 55, image: "/fresh-organic-vegetables.png" },
    { id: "v8", name: "Cauliflower", price: 50, image: "/fresh-organic-vegetables.png" },
    { id: "v9", name: "Broccoli", price: 70, image: "/fresh-organic-vegetables.png" },
    { id: "v10", name: "Potato", price: 40, image: "/fresh-organic-vegetables.png" },
  ],
  fruits: [
    { id: "f1", name: "Fresh Red Apple", price: 80, image: "/fresh-red-apple.png" },
    { id: "f2", name: "Yellow Bananas", price: 50, image: "/yellow-banana-bunch.png" },
    { id: "f3", name: "Orange", price: 60, image: "/images/orange.png" },
    { id: "f4", name: "Ripe Mango", price: 100, image: "/ripe-mango-fruit.jpg" },
    { id: "f5", name: "Fresh Grapes", price: 90, image: "/assorted-fresh-fruits.jpg" },
    { id: "f6", name: "Watermelon", price: 70, image: "/assorted-fresh-fruits.jpg" },
    { id: "f7", name: "Pomegranate", price: 120, image: "/assorted-fresh-fruits.jpg" },
    { id: "f8", name: "Papaya", price: 55, image: "/assorted-fresh-fruits.jpg" },
    { id: "f9", name: "Guava", price: 45, image: "/assorted-fresh-fruits.jpg" },
    { id: "f10", name: "Pineapple", price: 85, image: "/assorted-fresh-fruits.jpg" },
  ],
  spices: [
    { id: "s1", name: "Turmeric Powder", price: 120, image: "/turmeric-powder.png" },
    { id: "s2", name: "Cumin Seeds", price: 150, image: "/cumin-seeds-spice.jpg" },
    { id: "s3", name: "Chili Powder", price: 100, image: "/red-chili-powder.jpg" },
    { id: "s4", name: "Coriander", price: 130, image: "/coriander-powder.jpg" },
    { id: "s5", name: "Garam Masala", price: 180, image: "/indian-spices-turmeric-cumin-cinnamon.jpg" },
    { id: "s6", name: "Black Pepper", price: 140, image: "/indian-spices-colorful-arrangement.jpg" },
    { id: "s7", name: "Cardamom", price: 200, image: "/indian-spices-colorful-arrangement.jpg" },
    { id: "s8", name: "Cinnamon", price: 160, image: "/indian-spices-turmeric-cumin-cinnamon.jpg" },
    { id: "s9", name: "Fenugreek Seeds", price: 110, image: "/indian-spices-colorful-arrangement.jpg" },
    { id: "s10", name: "Mustard Seeds", price: 90, image: "/indian-spices-colorful-arrangement.jpg" },
  ],
  dairy: [
    { id: "d1", name: "Fresh Milk", price: 65, image: "/fresh-milk-carton.jpg" },
    { id: "d2", name: "Yogurt", price: 50, image: "/yogurt-container.jpg" },
    { id: "d3", name: "Cheese Block", price: 250, image: "/cheese-block.png" },
    { id: "d4", name: "Butter", price: 180, image: "/butter-pack.jpg" },
    { id: "d5", name: "Paneer", price: 200, image: "/fresh-milk-carton.jpg" },
    { id: "d6", name: "Cream", price: 120, image: "/fresh-milk-carton.jpg" },
    { id: "d7", name: "Ghee", price: 350, image: "/butter-pack.jpg" },
    { id: "d8", name: "Curd", price: 45, image: "/yogurt-container.jpg" },
    { id: "d9", name: "Mozzarella Cheese", price: 280, image: "/cheese-block.png" },
    { id: "d10", name: "Cottage Cheese", price: 150, image: "/cheese-block.png" },
  ],
  beverages: [
    { id: "b1", name: "Orange Juice", price: 80, image: "/orange-juice-bottle.jpg" },
    { id: "b2", name: "Premium Tea", price: 200, image: "/premium-tea-leaves.jpg" },
    { id: "b3", name: "Coffee Beans", price: 250, image: "/coffee-beans-roasted.jpg" },
    { id: "b4", name: "Mineral Water", price: 30, image: "/mineral-water-bottle.jpg" },
    { id: "b5", name: "Apple Juice", price: 85, image: "/orange-juice-bottle.jpg" },
    { id: "b6", name: "Green Tea", price: 180, image: "/premium-tea-leaves.jpg" },
    { id: "b7", name: "Instant Coffee", price: 150, image: "/coffee-beans-roasted.jpg" },
    { id: "b8", name: "Coconut Water", price: 40, image: "/mineral-water-bottle.jpg" },
    { id: "b9", name: "Lemonade", price: 45, image: "/orange-juice-bottle.jpg" },
    { id: "b10", name: "Herbal Tea", price: 220, image: "/premium-tea-leaves.jpg" },
  ],
  "dry-fruits": [
    { id: "df1", name: "California Almonds", price: 500, image: "/california-almonds-nuts.jpg" },
    { id: "df2", name: "Cashew Nuts", price: 450, image: "/cashew-nuts-roasted.jpg" },
    { id: "df3", name: "Black Raisins", price: 200, image: "/black-raisins-dried.jpg" },
    { id: "df4", name: "Premium Dates", price: 300, image: "/premium-dates-fruit.jpg" },
    { id: "df5", name: "Walnuts", price: 550, image: "/dry-fruits-almonds-cashews-raisins.jpg" },
    { id: "df6", name: "Pistachios", price: 600, image: "/dry-fruits-almonds-cashews-raisins.jpg" },
    { id: "df7", name: "Apricots", price: 350, image: "/black-raisins-dried.jpg" },
    { id: "df8", name: "Figs", price: 400, image: "/premium-dates-fruit.jpg" },
    { id: "df9", name: "Hazelnuts", price: 520, image: "/california-almonds-nuts.jpg" },
    { id: "df10", name: "Prunes", price: 280, image: "/black-raisins-dried.jpg" },
  ],
  chips: [
    { id: "c1", name: "Potato Chips", price: 40, image: "/crispy-potato-chips.jpg" },
    { id: "c2", name: "Corn Chips", price: 45, image: "/roasted-corn-chips.jpg" },
    { id: "c3", name: "Prawn Chips", price: 80, image: "/spicy-prawn-chips.jpg" },
    { id: "c4", name: "Vegetable Chips", price: 50, image: "/healthy-vegetable-chips.jpg" },
    { id: "c5", name: "Onion Rings", price: 55, image: "/crispy-potato-chips.jpg" },
    { id: "c6", name: "Banana Chips", price: 60, image: "/roasted-corn-chips.jpg" },
    { id: "c7", name: "Tortilla Chips", price: 48, image: "/roasted-corn-chips.jpg" },
    { id: "c8", name: "Cheese Chips", price: 65, image: "/crispy-potato-chips.jpg" },
    { id: "c9", name: "Salt & Vinegar Chips", price: 42, image: "/crispy-potato-chips.jpg" },
    { id: "c10", name: "Barbecue Chips", price: 45, image: "/spicy-prawn-chips.jpg" },
  ],
  biscuits: [
    { id: "bi1", name: "Digestive Biscuits", price: 60, image: "/whole-wheat-digestive-biscuits.jpg" },
    { id: "bi2", name: "Marie Biscuits", price: 50, image: "/light-crispy-marie-biscuits.jpg" },
    { id: "bi3", name: "Chocolate Biscuits", price: 70, image: "/chocolate-biscuits.jpg" },
    { id: "bi4", name: "Wafer Biscuits", price: 65, image: "/wafer-biscuits.jpg" },
    { id: "bi5", name: "Butter Cookies", price: 75, image: "/chocolate-biscuits.jpg" },
    { id: "bi6", name: "Cream Biscuits", price: 68, image: "/whole-wheat-digestive-biscuits.jpg" },
    { id: "bi7", name: "Oreo Biscuits", price: 80, image: "/chocolate-biscuits.jpg" },
    { id: "bi8", name: "Coconut Biscuits", price: 62, image: "/light-crispy-marie-biscuits.jpg" },
    { id: "bi9", name: "Glucose Biscuits", price: 45, image: "/whole-wheat-digestive-biscuits.jpg" },
    { id: "bi10", name: "Honey Biscuits", price: 58, image: "/wafer-biscuits.jpg" },
  ],
  soaps: [
    { id: "so1", name: "Natural Soap Bar", price: 80, image: "/natural-soap-bar.jpg" },
    { id: "so2", name: "Herbal Shampoo", price: 150, image: "/herbal-shampoo.jpg" },
    { id: "so3", name: "Body Wash", price: 120, image: "/body-wash.jpg" },
    { id: "so4", name: "Hand Wash", price: 100, image: "/hand-wash.jpg" },
    { id: "so5", name: "Face Wash", price: 130, image: "/natural-soap-bar.jpg" },
    { id: "so6", name: "Conditioner", price: 140, image: "/herbal-shampoo.jpg" },
    { id: "so7", name: "Liquid Soap", price: 90, image: "/hand-wash.jpg" },
    { id: "so8", name: "Shower Gel", price: 110, image: "/body-wash.jpg" },
    { id: "so9", name: "Baby Soap", price: 70, image: "/natural-soap-bar.jpg" },
    { id: "so10", name: "Antiseptic Soap", price: 85, image: "/natural-soap-bar.jpg" },
  ],
  namkeen: [
    { id: "n1", name: "Bhujia", price: 60, image: "/bhujia-snack.jpg" },
    { id: "n2", name: "Mathri", price: 70, image: "/mathri-snack.jpg" },
    { id: "n3", name: "Chakli", price: 80, image: "/chakli-snack.jpg" },
    { id: "n4", name: "Sev", price: 65, image: "/sev-snack.jpg" },
    { id: "n5", name: "Namkeen Mix", price: 75, image: "/indian-namkeen-snacks-mix.jpg" },
    { id: "n6", name: "Kachori", price: 85, image: "/mathri-snack.jpg" },
    { id: "n7", name: "Farsan", price: 68, image: "/indian-namkeen-snacks-mix.jpg" },
    { id: "n8", name: "Mixture", price: 72, image: "/indian-namkeen-snacks-mix.jpg" },
    { id: "n9", name: "Khatta Meetha", price: 78, image: "/bhujia-snack.jpg" },
    { id: "n10", name: "Masala Peanuts", price: 55, image: "/indian-namkeen-snacks-mix.jpg" },
  ],
}

const categories: Category[] = [
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    icon: "🥬",
    image: "/fresh-organic-vegetables.png",
    products: categoryProductsData.vegetables,
  },
  {
    id: "fruits",
    name: "Fresh Fruits",
    icon: "🍎",
    image: "/assorted-fresh-fruits.jpg",
    products: categoryProductsData.fruits,
  },
  {
    id: "spices",
    name: "Premium Spices",
    icon: "🌶️",
    image: "/indian-spices-colorful-arrangement.jpg",
    products: categoryProductsData.spices,
  },
  {
    id: "dairy",
    name: "Dairy",
    icon: "🥛",
    image: "/fresh-milk-carton.jpg",
    products: categoryProductsData.dairy,
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "🥤",
    image: "/orange-juice-bottle.jpg",
    products: categoryProductsData.beverages,
  },
  {
    id: "dryfruits",
    name: "Dry Fruits",
    icon: "🥜",
    image: "/dry-fruits-almonds-cashews-raisins.jpg",
    products: categoryProductsData["dry-fruits"],
  },
  {
    id: "chips",
    name: "Chips",
    icon: "🍟",
    image: "/crispy-potato-chips.jpg",
    products: categoryProductsData.chips,
  },
  {
    id: "biscuits",
    name: "Biscuits",
    icon: "🍪",
    image: "/chocolate-biscuits.jpg",
    products: categoryProductsData.biscuits,
  },
  {
    id: "soaps",
    name: "Soaps",
    icon: "🧼",
    image: "/natural-soap-bar.jpg",
    products: categoryProductsData.soaps,
  },
  {
    id: "namkeen",
    name: "Namkeen",
    icon: "🥨",
    image: "/indian-namkeen-snacks-mix.jpg",
    products: categoryProductsData.namkeen,
  },
]

export default function Categories({ onAddToCart }: CategoriesProps) {
  const { t } = useLanguage()
  
  const categoryNames: Record<string, string> = {
    vegetables: t("categories.fresh_vegetables"),
    fruits: t("categories.fresh_fruits"),
    spices: t("categories.premium_spices"),
    dairy: t("categories.dairy"),
    beverages: t("categories.beverages"),
    dryfruits: t("categories.dry_fruits"),
    chips: t("categories.chips"),
    biscuits: t("categories.biscuits"),
    soaps: t("categories.soaps"),
    namkeen: t("categories.namkeen"),
  }

  const productNameMap: Record<string, string> = {
    // Vegetables
    "Fresh Tomato": "product.fresh_tomato",
    "Golden Onion": "product.golden_onion",
    "Fresh Spinach": "product.fresh_spinach",
    "Orange Carrot": "product.orange_carrot",
    "Green Capsicum": "product.green_capsicum",
    "Fresh Garlic": "product.garlic",
    "Green Beans": "product.green_beans",
    "Cauliflower": "product.cauliflower",
    "Broccoli": "product.broccoli",
    "Potato": "product.potato",
    // Fruits
    "Fresh Red Apple": "product.fresh_red_apple",
    "Yellow Bananas": "product.yellow_bananas",
    "Orange": "product.fresh_orange",
    "Ripe Mango": "product.ripe_mango",
    "Fresh Grapes": "product.fresh_grapes",
    "Watermelon": "product.watermelon",
    "Pomegranate": "product.pomegranate",
    "Papaya": "product.papaya",
    "Guava": "product.guava",
    "Pineapple": "product.pineapple",
    // Spices
    "Turmeric Powder": "product.turmeric_powder",
    "Cumin Seeds": "product.cumin_seeds",
    "Chili Powder": "product.red_chili_powder",
    "Coriander": "product.coriander_powder",
    "Garam Masala": "product.garam_masala",
    "Black Pepper": "product.black_pepper",
    "Cardamom": "product.cardamom",
    "Cinnamon": "product.cinnamon",
    "Fenugreek Seeds": "product.fenugreek_seeds",
    "Mustard Seeds": "product.mustard_seeds",
    // Dairy
    "Fresh Milk": "product.fresh_milk",
    "Yogurt": "product.greek_yogurt",
    "Cheese Block": "product.cheddar_cheese",
    "Butter": "product.butter",
    "Paneer": "product.paneer",
    "Cream": "product.cream",
    "Ghee": "product.ghee",
    "Curd": "product.curd",
    "Mozzarella Cheese": "product.mozzarella_cheese",
    "Cottage Cheese": "product.cottage_cheese",
    // Beverages
    "Orange Juice": "product.orange_juice",
    "Premium Tea": "product.premium_tea",
    "Coffee Beans": "product.coffee_beans",
    "Mineral Water": "product.mineral_water",
    "Apple Juice": "product.apple_juice",
    "Green Tea": "product.green_tea",
    "Instant Coffee": "product.instant_coffee",
    "Coconut Water": "product.coconut_water",
    "Lemonade": "product.lemonade",
    "Herbal Tea": "product.herbal_tea",
    // Dry Fruits
    "California Almonds": "product.california_almonds",
    "Cashew Nuts": "product.cashew_nuts",
    "Black Raisins": "product.black_raisins",
    "Premium Dates": "product.dates_pack",
    "Walnuts": "product.walnuts",
    "Pistachios": "product.pistachios",
    "Apricots": "product.apricots",
    "Figs": "product.figs",
    "Hazelnuts": "product.hazelnuts",
    "Prunes": "product.prunes",
    // Chips
    "Potato Chips": "product.potato_chips",
    "Corn Chips": "product.corn_chips",
    "Prawn Chips": "product.prawn_chips",
    "Vegetable Chips": "product.vegetable_chips",
    "Onion Rings": "product.onion_rings",
    "Banana Chips": "product.banana_chips",
    "Tortilla Chips": "product.tortilla_chips",
    "Cheese Chips": "product.cheese_chips",
    "Salt & Vinegar Chips": "product.salt_vinegar_chips",
    "Barbecue Chips": "product.barbecue_chips",
    // Biscuits
    "Digestive Biscuits": "product.digestive_biscuits",
    "Marie Biscuits": "product.marie_biscuits",
    "Chocolate Biscuits": "product.chocolate_biscuits",
    "Wafer Biscuits": "product.wafer_biscuits",
    "Butter Cookies": "product.butter_cookies",
    "Cream Biscuits": "product.cream_biscuits",
    "Oreo Biscuits": "product.oreo_biscuits",
    "Coconut Biscuits": "product.coconut_biscuits",
    "Glucose Biscuits": "product.glucose_biscuits",
    "Honey Biscuits": "product.honey_biscuits",
    // Soaps
    "Natural Soap Bar": "product.natural_soap_bar",
    "Herbal Shampoo": "product.herbal_shampoo",
    "Body Wash": "product.body_wash",
    "Hand Wash": "product.hand_wash",
    "Face Wash": "product.face_wash",
    "Conditioner": "product.conditioner",
    "Liquid Soap": "product.liquid_soap",
    "Shower Gel": "product.shower_gel",
    "Baby Soap": "product.baby_soap",
    "Antiseptic Soap": "product.antiseptic_soap",
    // Namkeen
    "Bhujia": "product.bhujia",
    "Mathri": "product.mathri",
    "Chakli": "product.chakli",
    "Sev": "product.sev",
    "Namkeen Mix": "product.namkeen_mix",
    "Kachori": "product.kachori",
    "Farsan": "product.farsan",
    "Mixture": "product.mixture",
    "Khatta Meetha": "product.khatta_meetha",
    "Masala Peanuts": "product.masala_peanuts",
  }

  const getProductName = (name: string) => {
    const key = productNameMap[name]
    if (!key) return name
    const translated = t(key)
    // If translation returns the key itself (meaning translation doesn't exist), return original name
    return translated === key ? name : translated
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {t("categories.title")} <span className="text-primary">{t("categories.categories")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("categories.subtitle")}</p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {categories.map((category, idx) => {
            const categorySlug = category.id === "dryfruits" ? "dry-fruits" : category.id
            return (
              <Link
                key={category.id}
                href={`/category/${categorySlug}`}
                className="group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative h-64 rounded-xl overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 group-hover:shadow-xl">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold text-primary">{categoryNames[category.id] || category.name}</h3>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured products from categories - Slider style */}
        <div className="space-y-16">
          {categories.map((category, catIdx) => (
            <CategoryProductSlider
              key={category.id}
              category={category}
              categoryName={categoryNames[category.id] || category.name}
              onAddToCart={onAddToCart}
              getProductName={getProductName}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
