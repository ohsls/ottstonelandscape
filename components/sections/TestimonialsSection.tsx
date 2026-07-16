import SectionWrapper from '@/components/ui/SectionWrapper'
import { ShieldCheck, Handshake, ClipboardCheck } from 'lucide-react'

const trustStatements = [
  {
    icon: ShieldCheck,
    title: '100% Client Satisfaction Guarantee',
    description:
      'Every project is completed only when you are fully satisfied. We don\u2019t consider a job done until you sign off on every detail.',
  },
  {
    icon: Handshake,
    title: 'Your Approval, Our Standard',
    description:
      'We work with you every step of the way. No surprises, no shortcuts \u2014 your vision is the final measure of our work.',
  },
  {
    icon: ClipboardCheck,
    title: 'We Don\u2019t Leave Until It\u2019s Right',
    description:
      'To this day, every single project has been completed with full client approval. We hold ourselves to that record.',
  },
]

export default function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-brand-green-light">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-brand-green md:text-4xl">
          Our Commitment to You
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
          We don&apos;t rely on marketing promises. Every project speaks for itself \u2014 completed with full client satisfaction, every single time.
        </p>
      </div>

      {/* Trust statements grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {trustStatements.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 shadow-sm text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-brand-green">{item.title}</h3>
              <p className="mt-3 text-brand-body">{item.description}</p>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
