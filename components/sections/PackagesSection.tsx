import { packages } from '@/data/packages'
import PackageCard from '@/components/ui/PackageCard'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function PackagesSection() {
  return (
    <SectionWrapper id="packages" className="bg-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Top Ottawa Interlock Services
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-brand-green md:text-4xl">
          Choose Your Investment
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
          Every project is engineered specifically for Ottawa&apos;s climate. We don&apos;t build temporary solutions; our customized services are crafted for permanence.
        </p>
      </div>

      {/* Package cards grid */}
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </SectionWrapper>
  )
}
