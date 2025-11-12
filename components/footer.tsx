"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="animate-fadeInUp">
            <h3 className="text-2xl font-bold text-primary mb-4">King Cash & Carry</h3>
            <p className="text-muted-foreground mb-4">
              {t("footer.brand_description")}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.quick_links")}</h4>
            <ul className="space-y-2">
              {[
                { key: "nav.home", href: "/" },
                { key: "nav.shop", href: "/shop" },
                { key: "footer.about", href: "/about" },
                { key: "nav.founders", href: "/founders" },
                { key: "nav.contact", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.support")}</h4>
            <ul className="space-y-2">
              {[
                { key: "footer.faq" },
                { key: "footer.shipping_info" },
                { key: "footer.returns" },
                { key: "footer.track_order" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.contact_us")}</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>+351 910 140 143</span>
              </li>
              <li className="flex gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>info@kinginternationals.com</span>
              </li>
              <li className="flex gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Rua Campo do Rio, 2680-128, Camarate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col items-center text-muted-foreground text-sm animate-fadeInUp space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            <p>&copy; 2025 King Cash & Carry. {t("footer.all_rights")}.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                {t("footer.privacy_policy")}
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
          <p className="text-center">
            Crafted by{" "}
            <a
              href="https://bonusitsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              Bonus IT Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
