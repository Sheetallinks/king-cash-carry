"use client"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background via-card to-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        {/* Content */}
        <div className="flex-1 animate-slideInLeft">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-primary text-sm font-semibold tracking-widest">PREMIUM QUALITY</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              Experience the <span className="text-primary">Authentic Taste</span> of India
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover premium Indian groceries, fresh produce, aromatic spices, and traditional snacks delivered fresh
              to your doorstep.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95">
                Shop Now
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 animate-slideInRight">
          <div className="relative w-full h-96 md:h-full">
            <img
              src="/indian-spices-and-vegetables-premium-arrangement.jpg"
              alt="Premium Indian groceries"
              className="w-full h-full object-cover rounded-2xl shadow-2xl animate-glow"
            />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}
