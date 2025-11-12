"use client"

import { X, Trash2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartProps {
  items: CartItem[]
  onRemove: (id: string) => void
  onClose: () => void
}

export default function Cart({ items, onRemove, onClose }: CartProps) {
  const { t } = useLanguage()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Map of all possible product names to translation keys
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
    "Organic Tomatoes": "product.organic_tomatoes",
    "Green Capsicum": "product.green_capsicum",
    "Onions (1kg)": "product.onions",
    "Garlic (500g)": "product.garlic",
    "Mangoes (6pcs)": "product.mangoes",
    "Bananas (1kg)": "product.bananas",
    "Apples (1kg)": "product.apples",
    "Oranges (1kg)": "product.oranges",
    "Premium Basmati Rice (5kg)": "product.premium_basmati_rice",
    "Masala Chai Tea (250g)": "product.masala_chai_tea",
    "Mixed Namkeen (1kg)": "product.mixed_namkeen",
    "Coconut Oil (500ml)": "product.coconut_oil",
    "Fresh Red Apple": "product.fresh_red_apple",
    "Yellow Bananas": "product.yellow_bananas",
    "Natural Soap Bar": "product.natural_soap_bar",
    "Herbal Shampoo": "product.herbal_shampoo",
    "Hand Wash": "product.hand_wash",
    "Bhujia": "product.bhujia",
    "Mathri": "product.mathri",
    "Chakli": "product.chakli",
    "Sev": "product.sev",
  }

  const getProductName = (name: string) => {
    const key = productNameMap[name]
    return key ? t(key) : name
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40 animate-fadeInUp">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card border-l border-border animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">{t("cart.your_cart")}</h2>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[calc(100vh-280px)]">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t("cart.empty")}</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border animate-fadeInUp"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{getProductName(item.name)}</h3>
                  <p className="text-sm text-muted-foreground">
                    €{item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>{t("cart.total")}:</span>
              <span className="text-primary">€{total}</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
