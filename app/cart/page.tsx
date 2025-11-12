"use client"

import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import PageLayout from "@/components/page-layout"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { t } = useLanguage()
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart()

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
    "Black Pepper": "product.black_pepper",
    "Cardamom": "product.cardamom",
    "Cinnamon": "product.cinnamon",
    "Fenugreek Seeds": "product.fenugreek_seeds",
    "Mustard Seeds": "product.mustard_seeds",
    "Paneer": "product.paneer",
    "Cream": "product.cream",
    "Ghee": "product.ghee",
    "Curd": "product.curd",
    "Mozzarella Cheese": "product.mozzarella_cheese",
    "Cottage Cheese": "product.cottage_cheese",
    "Apple Juice": "product.apple_juice",
    "Green Tea": "product.green_tea",
    "Instant Coffee": "product.instant_coffee",
    "Coconut Water": "product.coconut_water",
    "Lemonade": "product.lemonade",
    "Herbal Tea": "product.herbal_tea",
    "Pistachios": "product.pistachios",
    "Apricots": "product.apricots",
    "Figs": "product.figs",
    "Hazelnuts": "product.hazelnuts",
    "Prunes": "product.prunes",
    "Onion Rings": "product.onion_rings",
    "Banana Chips": "product.banana_chips",
    "Tortilla Chips": "product.tortilla_chips",
    "Cheese Chips": "product.cheese_chips",
    "Salt & Vinegar Chips": "product.salt_vinegar_chips",
    "Barbecue Chips": "product.barbecue_chips",
    "Butter Cookies": "product.butter_cookies",
    "Cream Biscuits": "product.cream_biscuits",
    "Oreo Biscuits": "product.oreo_biscuits",
    "Coconut Biscuits": "product.coconut_biscuits",
    "Glucose Biscuits": "product.glucose_biscuits",
    "Honey Biscuits": "product.honey_biscuits",
    "Face Wash": "product.face_wash",
    "Conditioner": "product.conditioner",
    "Liquid Soap": "product.liquid_soap",
    "Shower Gel": "product.shower_gel",
    "Baby Soap": "product.baby_soap",
    "Antiseptic Soap": "product.antiseptic_soap",
    "Namkeen Mix": "product.namkeen_mix",
    "Kachori": "product.kachori",
    "Farsan": "product.farsan",
    "Mixture": "product.mixture",
    "Khatta Meetha": "product.khatta_meetha",
    "Masala Peanuts": "product.masala_peanuts",
  }

  const getProductName = (name: string) => {
    const key = productNameMap[name]
    return key ? t(key) : name
  }

  const total = getTotal()

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8 animate-fadeInUp">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t("cart.continue_shopping") || "Continue Shopping"}</span>
            </Link>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary">{t("cart.your_cart")}</h1>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 animate-fadeInUp">
              <ShoppingBag className="w-24 h-24 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("cart.empty_cart") || "Your cart is empty"}</h2>
              <p className="text-muted-foreground mb-8">{t("cart.empty")}</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {t("cart.start_shopping") || "Start Shopping"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-background rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={getProductName(item.name)}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <ShoppingBag className="w-8 h-8 text-primary/50" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-2">{getProductName(item.name)}</h3>
                        <p className="text-2xl font-bold text-primary mb-4">€{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-background border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-primary/10 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold text-foreground min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-primary/10 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">{t("cart.subtotal") || "Subtotal"}</p>
                        <p className="text-2xl font-bold text-primary">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-8 animate-fadeInUp">
                  <h2 className="text-2xl font-bold text-foreground mb-6">{t("cart.order_summary") || "Order Summary"}</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t("cart.items") || "Items"}</span>
                      <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t("cart.subtotal") || "Subtotal"}</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t("cart.shipping") || "Shipping"}</span>
                      <span>{total >= 500 ? t("cart.free") || "Free" : "€10.00"}</span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-foreground">{t("cart.total")}</span>
                        <span className="text-3xl font-black text-primary">€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 rounded-lg font-bold text-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mb-4">
                    {t("cart.checkout")}
                  </button>

                  <Link
                    href="/shop"
                    className="block text-center text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    {t("cart.continue_shopping") || "Continue Shopping"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

