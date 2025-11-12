"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export default function Newsletter() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setSubmitted(false)
    }, 2000)
  }

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-3xl mx-auto px-4 text-center animate-fadeInUp">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
          {t("newsletter.title")} <span className="text-primary">{t("newsletter.exclusive_offers")}</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          {t("newsletter.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder={t("newsletter.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {submitted ? t("newsletter.subscribed") : t("newsletter.subscribe")}
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-4">{t("newsletter.privacy")}</p>
      </div>
    </section>
  )
}
