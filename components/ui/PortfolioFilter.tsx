'use client'

import { useState } from 'react'
import { type Project } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

interface PortfolioFilterProps {
  projects: Project[]
}

const FILTERS = ['All', 'Interlock Driveway', 'Patio & Outdoor Living', 'Retaining Wall', 'Pool Surround']

export default function PortfolioFilter({ projects }: PortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.type.includes(activeFilter))

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-brand-green text-white'
                : 'border border-brand-green text-brand-green hover:bg-brand-green hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
