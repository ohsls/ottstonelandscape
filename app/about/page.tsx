import type { Metadata } from 'next'
import { Users, Wrench, Thermometer, DollarSign } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import EliteDuoSection from '@/components/sections/EliteDuoSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'About Ottawa\'s Premium Landscaping Experts',
  description: 'With over 20 years of cold-climate hardscaping experience and 350+ completed jobs in Ottawa, we are the experts in interlock, retaining walls, and custom landscaping.',
}

const values = [
  {
    icon: Users,
    title: 'Master-Craftsman Operated',
    description:
      'The expert you hire is the one building your project. We do not subcontract your investment to unknown crews. You get 20 years of direct, hands-on experience.',
  },
  {
    icon: Wrench,
    title: 'Engineered for Cold Climates',
    description:
      'Every project starts below the surface. We engineer the base, drainage, and sub-grade for extreme freeze-thaw cycles before a single stone is placed. That invisible foundation is what separates a 2-year driveway from a 20-year one.',
  },
  {
    icon: Thermometer,
    title: '350+ Ottawa Projects Completed',
    description:
      'Ottawa sees 60–90 freeze-thaw cycles annually. Over the last 10 years, we have built over 350 driveways, patios, and retaining walls right here in Ottawa that stand the test of time.',
  },
  {
    icon: DollarSign,
    title: 'Referral-Based Trust',
    description:
      'The vast majority of our work comes from neighbors referring neighbors after seeing our interlock outlast the competition. We offer transparent pricing, no hidden fees, and a rock-solid guarantee.',
  },
]

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* Page header */}
      <section className="bg-brand-green py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-display text-4xl font-bold md:text-5xl">About Our Hardscaping Company</h1>
          <p className="mt-4 text-lg text-white/80">
            Over 20 Years of Experience. On-site every day. Built for Ottawa.
          </p>
        </div>
      </section>

      {/* Reuse EliteDuoSection */}
      <EliteDuoSection />

      {/* Values section */}
      <SectionWrapper className="bg-white">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-brand-green md:text-4xl">
            How We Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
            Four principles that define every project we take on.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="rounded-xl bg-brand-green-light p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-green">{value.title}</h3>
                <p className="mt-2 text-sm text-brand-body">{value.description}</p>
              </div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Reuse ContactSection */}
      <ContactSection />
    </main>
  )
}
