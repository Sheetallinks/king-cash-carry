"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

export default function LanguageSync() {
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "pt" ? "pt-PT" : "en"
    }
  }, [language])

  return null
}

