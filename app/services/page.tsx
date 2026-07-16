import type { Metadata } from 'next'
import {
  Car,
  Trees,
  Layers,
  Waves,
  Mountain,
  Droplets,
  FlaskConical,
  Home,
  Fence,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import PackagesSection from '@/components/sections/PackagesSection'
// ScarcityBanner removed — not rendering

export const metadata: Metadata = {
  title: 'Landscaping & Interlock Services in Ottawa',
  description: 'Premium interlock, driveway paving, retaining walls, basement walkouts, patio design, and hardscaping services in Ottawa. Built to last.',
}

const services = [
  {
    icon: Car,
    title: 'Interlock Driveways & Paving Stones',
    description:
      'Premium paving stone car entrances and driveways engineered for Ottawa\'s 60+ annual freeze-thaw cycles. 16"+ excavation depth, geo-textile barriers, and compacted gravel base ensure decades of performance.',
  },
  {
    icon: Trees,
    title: 'Patio & Landscape Installation',
    description:
      'Custom-designed patios, pathways, and complete landscaping design and installation. We use natural stone or premium pavers to extend your outdoor living season from May through October.',
  },
  {
    icon: Layers,
    title: 'Retaining Walls, Stone Walls & Stairs',
    description:
      'Structural retaining walls, natural stone walls, and non-slip staircase systems. Designed to beautifully manage Ottawa\'s challenging grade changes and clay soil conditions.',
  },
  {
    icon: Home,
    title: 'Basement Walkouts & Window Wells',
    description:
      'We open the windows and doors at basement level to create beautiful, functional walkouts and window wells that bring natural light safely into your lower level.',
  },
  {
    icon: Waves,
    title: 'Pool Surrounds & Bathhouses',
    description:
      'Non-slip interlock surrounds for pools and spas, plus custom bathhouses for your homestead. Heat-resistant surfaces and proper drainage ensure safety and luxury.',
  },
  {
    icon: Mountain,
    title: 'Excavation & Land Leveling',
    description:
      'Professional excavation and land leveling to correct drainage issues and prepare proper sub-bases. The foundation work that determines whether your hardscape lasts 2 years or 20.',
  },
  {
    icon: Droplets,
    title: 'Irrigation, Grass & Drainage',
    description:
      'Grass installation, irrigation systems, and water retention solutions. We ensure proper grading and drainage to protect your home\'s foundation and hardscape investment.',
  },
  {
    icon: FlaskConical,
    title: 'Polymeric Sand & Repairs',
    description:
      'Filling the cracks at the interlock with professional-grade polymeric sand. We stabilize joints, fix shifting pavers, and seal out weeds, ants, and erosion.',
  },
  {
    icon: Fence,
    title: 'Decks, Fences & River Rock',
    description:
      'Wood or composite decks and fences, integrated seamlessly with your hardscape. We also expertly install River Rock landscaping to beautify your garden and yard.',
  },
]

export default function ServicesPage() {
  return (
    <main id="main-content">
      {/* Page header */}
      <section className="bg-brand-green py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Ottawa Landscaping & Interlock Services</h1>
          <h2 className="mt-4 text-lg text-white/80">
            From precision paving stone driveways and custom patios to basement walkouts and river rock gardens. Designed, built, and guaranteed for the Ottawa climate.
          </h2>
        </div>
      </section>

      {/* Services grid */}
      <SectionWrapper className="bg-white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="rounded-xl bg-brand-green-light p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-green">{service.title}</h3>
                <p className="mt-2 text-brand-body">{service.description}</p>
              </div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Reuse existing section components */}
      <PackagesSection />
      {/* ScarcityBanner removed */}
    </main>
  )
}
