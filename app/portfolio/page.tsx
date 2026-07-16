import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import PortfolioFilter from '@/components/ui/PortfolioFilter'
import ContactSection from '@/components/sections/ContactSection'
import SectionWrapper from '@/components/ui/SectionWrapper'

export const metadata: Metadata = {
  title: 'Our Ottawa Landscaping & Interlock Portfolio',
  description: 'View our gallery of premium interlock driveways, custom stone patios, retaining walls, and beautiful landscaping projects completed across Ottawa.',
}

export default function PortfolioPage() {
  return (
    <main id="main-content">
      {/* Page header */}
      <section className="bg-brand-green py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Our Hardscaping Portfolio</h1>
          <h2 className="mt-4 text-lg text-white/80">
            Explore over 350+ completed driveway, patio, and landscape design projects across Ottawa&apos;s finest neighbourhoods.
          </h2>
        </div>
      </section>

      {/* Portfolio grid with filters — client component handles interactivity */}
      <SectionWrapper className="bg-white">
        <PortfolioFilter projects={projects} />
      </SectionWrapper>

      {/* Contact section reuse */}
      <ContactSection />
    </main>
  )
}
