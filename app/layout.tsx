import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { CartProvider } from "@/lib/cart-context"
import LanguageSync from "@/components/language-sync"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "King Cash & Carry - Indian Groceries, Spices & Dry Fruits",
  description:
    "Premium Indian groceries, fresh vegetables, spices, dry fruits, chips, biscuits and beverages at the best prices.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <LanguageSync />
            {children}
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
