import HeroSection         from '@/components/sections/HeroSection'
import SocialProofBar      from '@/components/sections/SocialProofBar'
import PackagesSection     from '@/components/sections/PackagesSection'
import OttawaProofSection  from '@/components/sections/OttawaProofSection'
import PortfolioPreview    from '@/components/sections/PortfolioPreview'
import EliteDuoSection     from '@/components/sections/EliteDuoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
// ScarcityBanner removed — not rendering
import ContactSection      from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <SocialProofBar />
      <PackagesSection />
      <OttawaProofSection />
      <PortfolioPreview />
      <EliteDuoSection compact />
      <TestimonialsSection />
      {/* ScarcityBanner removed */}
      <ContactSection />
    </main>
  )
}
