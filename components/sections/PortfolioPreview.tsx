import Link from 'next/link'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function PortfolioPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <SectionWrapper id="portfolio" className="bg-white">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold text-brand-green md:text-4xl">
            Recent Projects
          </h2>
          <p className="mt-2 text-brand-muted">
            A sample of what we build in Ottawa&apos;s finest neighbourhoods.
          </p>
        </div>
        <Link
          href="/portfolio"
          className="hidden min-h-[44px] items-center text-sm font-medium text-brand-green underline underline-offset-4 transition-colors hover:text-brand-green-mid md:inline-flex"
        >
          View All Projects →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* Mobile-only link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/portfolio"
          className="min-h-[44px] inline-flex items-center text-sm font-medium text-brand-green underline underline-offset-4"
        >
          View All Projects →
        </Link>
      </div>
    </SectionWrapper>
  )
}
