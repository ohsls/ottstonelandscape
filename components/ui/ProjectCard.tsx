import Link from 'next/link'
import Image from 'next/image'
import { type Project, getProjectThumbnail } from '@/data/projects'
import { Badge } from '@/components/ui/badge'

interface ProjectCardProps {
  project: Project
  size?: 'normal' | 'large'
}

export default function ProjectCard({ project, size = 'normal' }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-lg"
    >
      <div
        className={`relative w-full ${
          size === 'large' ? 'aspect-[3/2]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={getProjectThumbnail(project)}
          alt={project.title}
          fill
          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 flex items-end justify-start bg-black/30 p-4 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
          <Badge className="bg-brand-green text-white hover:bg-brand-green">
            {project.neighbourhood}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold">{project.title}</h3>
        <p className="text-sm text-brand-muted">{project.type}</p>
        <p className="text-xs text-brand-muted">{project.completedDate}</p>
      </div>
    </Link>
  )
}
