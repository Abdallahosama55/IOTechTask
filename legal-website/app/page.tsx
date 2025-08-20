import { Navigation } from "@/components/navigation"

import { ClientTestimonialsSection } from "@/components/client-testimonials"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TeamSection } from "@/components/team-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Navigation /> */}
      <HeroSection />
      <TeamSection />
      <ClientTestimonialsSection />
      {/* <Footer /> */}
    </main>
  )
}
