import PageLayout from "@/components/page-layout"

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-slideInLeft">
          <h1 className="text-4xl font-bold text-primary mb-8">About King Cash & Carry</h1>

          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-8 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-foreground leading-relaxed">
                King Cash & Carry was founded with a vision to bring premium quality Indian groceries, spices, and
                everyday essentials to your doorstep at the most competitive prices. We understand that quality and
                freshness are paramount when it comes to groceries, which is why we directly source our products from
                trusted farmers and manufacturers.
              </p>
            </div>

            <div
              className="bg-card border border-border rounded-lg p-8 animate-fadeInUp"
              style={{ animationDelay: "100ms" }}
            >
              <h2 className="text-2xl font-bold text-primary mb-4">Why Choose Us?</h2>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Premium Quality Products - Sourced directly from farmers and manufacturers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Competitive Prices - Bulk buying discounts available</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Wide Selection - Over 200+ products in different categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Fast Delivery - Same day delivery available in selected areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Customer Support - 24/7 customer service</span>
                </li>
              </ul>
            </div>

            <div
              className="bg-card border border-border rounded-lg p-8 animate-fadeInUp"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-2xl font-bold text-primary mb-4">Our Values</h2>
              <p className="text-foreground leading-relaxed">
                Quality, Integrity, and Customer Satisfaction are the core values that drive us. We are committed to
                providing the best products at the best prices while maintaining the highest standards of service and
                ethical business practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
