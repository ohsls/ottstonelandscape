import { siteConfig } from '@/data/siteConfig'

const metrics = [
  { top: '20+ Years',                        bottom: 'of Expert Craft' },
  { top: 'Licensed & Insured',                bottom: 'Fully Certified' },
  { top: 'Owner On-Site',                    bottom: 'Every Single Day' },
  { top: `${siteConfig.projectsDone}+`,      bottom: 'Projects Completed' },
  { top: '3-Year Guarantee',                 bottom: 'Workmanship & Materials' },
]

export default function SocialProofBar() {
  return (
    <section className="bg-brand-charcoal py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`flex-1 basis-1/2 py-3 text-center sm:basis-1/3 lg:basis-0 ${
                i < metrics.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              <p className="text-lg font-bold text-white md:text-xl">{m.top}</p>
              <p className="text-sm text-white/60">{m.bottom}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
