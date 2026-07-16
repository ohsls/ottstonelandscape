import { Layers, Shield, Droplets, FlaskConical, ClipboardCheck } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'

const points = [
  {
    icon: Layers,
    title: '16"+ Excavation Depth',
    description:
      'We excavate to a minimum 400mm below frost. Most contractors go 6". We go deeper because Ottawa\'s ground heaves — and shortcuts show up in Year 2.',
  },
  {
    icon: Shield,
    title: 'Geo-Textile Barrier',
    description:
      'A filter fabric layer between subgrade and base stone prevents fine particles from contaminating the base over time. 90% of Ottawa installers skip this step.',
  },
  {
    icon: Droplets,
    title: 'Engineered Drainage Slope',
    description:
      'Every project graded to a 2% minimum slope away from the structure. Standing water during freeze cycles is the #1 cause of interlock failure in Ottawa.',
  },
  {
    icon: FlaskConical,
    title: 'Professional Polymeric Sand',
    description:
      'We use Techniseal or Alliance Gator — activated with water to permanently lock joints against weeds, ants, and erosion. The finish that protects everything below.',
  },
  {
    icon: ClipboardCheck,
    title: 'Post-Season Inspection',
    description:
      'Every project includes a complimentary inspection after the first full freeze-thaw cycle to verify base integrity. We call you — you don\'t chase us.',
  },
]

export default function OttawaProofSection() {
  return (
    <SectionWrapper className="bg-brand-green-light">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-brand-green md:text-4xl">
          Why Ottawa Hardscape Fails — And How We Engineer It to Last
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-brand-muted">
          Ottawa sees 60–90 freeze-thaw cycles every year. That&apos;s more structural stress than
          almost any other city in Canada. Here&apos;s what separates a 2-year driveway from a
          20-year one.
        </p>
      </div>

      {/* Engineering points grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {points.map((point) => {
          const Icon = point.icon
          return (
            <div
              key={point.title}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <Icon className="mb-3 h-8 w-8 text-brand-green" />
              <h3 className="mb-2 font-display text-lg font-bold text-brand-green">
                {point.title}
              </h3>
              <p className="text-sm text-brand-body">{point.description}</p>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
