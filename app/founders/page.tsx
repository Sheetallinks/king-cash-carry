"use client"

import Image from "next/image"
import { useState } from "react"
import { GraduationCap, Briefcase, Award, Users, Building2, Globe } from "lucide-react"
import PageLayout from "@/components/page-layout"
import { useLanguage } from "@/lib/language-context"

export default function FoundersPage() {
  const { t } = useLanguage()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const founders = [
    {
      id: "marcelo",
      name: "Marcelo Araújo",
      role: "CEO / Founder",
      image: "/MARCELO ARAÚJO founder king.jpg",
      description: "Marcelo Araújo holds a degree in Sociology from the University of Porto and a Business Management diploma from ITFI. He also completed a Master's in Human Resources Management from the University of Braga.",
      career: "Marcelo's career spans over 25 years, including roles as a hypermarket manager, teacher, and career counsellor. With a decade of experience as a technical director at temporary employment agencies, he brings extensive expertise in business human resource management.",
      highlights: [
        { icon: GraduationCap, text: "Degree in Sociology - University of Porto" },
        { icon: Award, text: "Master's in Human Resources Management - University of Braga" },
        { icon: Briefcase, text: "25+ years of professional experience" },
        { icon: Users, text: "10 years as Technical Director at employment agencies" },
      ],
    },
    {
      id: "romy",
      name: "Romy King",
      role: "Co-Founder / Director",
      image: "/ROMY KING co founder king.jpg",
      description: "Romy King, the visionary leader behind King Internationals, brings extensive experience in human resources and international recruitment.",
      career: "Under his leadership, King Internationals has become a trusted partner for businesses and job seekers worldwide. Romy also plays a crucial role in expanding the King brand's supermarket and cash-and-carry operations, as well as supporting regional agriculture production. Additionally, he is the president and founder of Work Supply Trabalho Temporário Lda, where he oversees the provision of high-quality staffing solutions across Europe. His commitment to excellence and innovation drives the company's success and keeps it at the forefront of the recruitment and retail industries.",
      highlights: [
        { icon: Globe, text: "International recruitment expertise" },
        { icon: Building2, text: "President & Founder of Work Supply Trabalho Temporário Lda" },
        { icon: Briefcase, text: "Expanding King brand operations globally" },
        { icon: Users, text: "Trusted partner for businesses worldwide" },
      ],
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/20 via-background to-primary/10 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center animate-fadeInUp">
              <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-tight">
                {t("founders.title") || "Meet Our Founders"}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("founders.subtitle") || "Visionary leaders driving innovation and excellence in retail and recruitment"}
              </p>
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="space-y-24">
            {founders.map((founder, index) => (
              <div
                key={founder.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section */}
                <div
                  className={`animate-fadeInUp ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-card to-card/80 rounded-3xl p-8 border-2 border-primary/20 group-hover:border-primary transition-all duration-500 overflow-hidden">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-transparent relative">
                        {!imageErrors[founder.id] ? (
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            unoptimized
                            onError={() => {
                              setImageErrors((prev) => ({ ...prev, [founder.id]: true }))
                            }}
                            onLoadingComplete={(result) => {
                              if (result.naturalWidth === 0) {
                                setImageErrors((prev) => ({ ...prev, [founder.id]: true }))
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <div className="text-center p-4">
                              <Users className="w-16 h-16 text-primary/50 mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Image not found</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                        {founder.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={`animate-fadeInUp space-y-6 ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                  style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
                >
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
                      {founder.name}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-6 font-semibold">
                      {founder.role}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg text-foreground leading-relaxed">
                      {founder.description}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {founder.career}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    {founder.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-4 hover:border-primary transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <highlight.icon className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-sm text-foreground leading-relaxed pt-1">
                            {highlight.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t("founders.mission_title") || "Our Mission"}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("founders.mission_text") || "Together, we are committed to delivering exceptional value, fostering innovation, and building lasting relationships with our customers and partners across the globe."}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

