"use client"

import { useLanguage } from "@/lib/language-context"

export default function About() {
  const { t } = useLanguage()
  return (
    <section className="py-16 md:py-24 bg-background relative">
      {/* Decorative Border */}
      <div className="absolute inset-0 border-t-4 border-b-4 border-primary/30"></div>
      <div className="absolute inset-0 border-l-4 border-r-4 border-primary/30 hidden md:block"></div>
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-primary rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-primary rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary rounded-br-3xl"></div>
      
      {/* Decorative Corner Accents */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-4">
            {t("about.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-slideInLeft">
            <img
              src="/king-cash-carry-store-interior-groceries.jpg"
              alt="King Cash & Carry Store"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          {/* Content Card */}
          <div className="animate-slideInRight">
            <div className="bg-gradient-to-br from-card via-card to-card/80 border-2 border-primary/20 rounded-3xl p-8 md:p-10 shadow-2xl hover:border-primary transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-balance">
                    {t("about.heading")} <span className="text-primary">{t("about.authentic")}</span>
                  </h2>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("about.description")}
                </p>

                <div className="space-y-4 pt-4 border-t border-border">
                  {[
                    { icon: "✓", titleKey: "about.premium_quality", descKey: "about.premium_quality_desc" },
                    { icon: "✓", titleKey: "about.fresh_guarantee", descKey: "about.fresh_guarantee_desc" },
                    { icon: "✓", titleKey: "about.best_prices", descKey: "about.best_prices_desc" },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4 animate-fadeInUp hover:bg-background/50 p-3 rounded-lg transition-all duration-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="text-primary text-2xl font-bold flex-shrink-0">{feature.icon}</div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{t(feature.titleKey)}</h3>
                        <p className="text-muted-foreground">{t(feature.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                    {t("about.explore_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
