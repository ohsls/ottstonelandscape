import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getProjectThumbnail } from '@/data/projects'
import type { MediaItem } from '@/data/projects'
import { siteConfig } from '@/data/siteConfig'
import { Badge } from '@/components/ui/badge'
import VideoEmbed from '@/components/ui/VideoEmbed'
import ContactOptions from '@/components/ui/ContactOptions'
import ProjectCard from '@/components/ui/ProjectCard'
import Lightbox from '@/components/ui/Lightbox'
import HeroGallery from '@/components/ui/HeroGallery'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | ${siteConfig.name}`,
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  // Get 2 other featured projects (excluding current)
  const otherProjects = projects
    .filter((p) => p.id !== project.id && p.featured)
    .slice(0, 2)

  // If not enough featured, fill with any other projects
  const suggestions =
    otherProjects.length >= 2
      ? otherProjects
      : [
          ...otherProjects,
          ...projects
            .filter(
              (p) =>
                p.id !== project.id &&
                !otherProjects.some((op) => op.id === p.id)
            )
            .slice(0, 2 - otherProjects.length),
        ]

  const waMessage = `Hi! I just scanned your card and saw the ${project.title} project. I'd love a free assessment for my property.`

  // Build the media list: use mediaOrder if defined, otherwise auto-generate from videoId + photos
  const mediaItems: MediaItem[] = project.mediaOrder && project.mediaOrder.length > 0
    ? project.mediaOrder
    : [
        ...(project.videoId ? [{ type: 'video' as const, videoId: project.videoId }] : []),
        ...project.photos.map((src) => ({ type: 'photo' as const, src })),
      ]

  // Extract only the photo items (for lightbox)
  const photoItems = mediaItems.filter((m): m is Extract<MediaItem, { type: 'photo' }> => m.type === 'photo')

  return (
    <main id="main-content">
      {/* SECTION 1 — Media: rendered in mediaOrder */}
      {mediaItems.length > 0 && (
        <section className="w-full">
          {/* Lead media item: first in order gets hero treatment */}
          {mediaItems[0].type === 'video' ? (
            <div className="aspect-video w-full">
              <VideoEmbed videoId={mediaItems[0].videoId} mode="player" />
            </div>
          ) : (
            <HeroGallery photos={photoItems.map((p) => ({ src: p.src, alt: p.alt }))} />
          )}

          {/* Remaining media: video embeds inline, photos in a grid with lightbox */}
          {mediaItems.length > 1 && (
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
              {/* Render any additional videos */}
              {mediaItems.slice(1).filter((m): m is Extract<MediaItem, { type: 'video' }> => m.type === 'video').map((m) => (
                <div key={m.videoId} className="mb-6 aspect-video w-full">
                  <VideoEmbed videoId={m.videoId} mode="player" />
                </div>
              ))}

              {/* Render photos in a responsive grid with lightbox */}
              {photoItems.length > 0 && (
                <Lightbox photos={photoItems.map((p) => ({ src: p.src, alt: p.alt }))} />
              )}
            </div>
          )}
        </section>
      )}

      {/* Fallback: no media at all — show placeholder thumbnail */}
      {mediaItems.length === 0 && (
        <section className="w-full">
          <div className="relative aspect-video w-full">
            <Image
              src={getProjectThumbnail(project)}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* SECTION 2 — Project Quick Stats */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-bold text-brand-green md:text-4xl">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="bg-brand-green text-white hover:bg-brand-green">
              {project.type}
            </Badge>
            <Badge variant="outline" className="border-brand-green text-brand-green">
              {project.neighbourhood}
            </Badge>
            <Badge variant="outline" className="border-brand-muted text-brand-muted">
              {project.completedDate}
            </Badge>
          </div>

          <p className="mt-4 text-base text-brand-body md:text-lg">
            {project.description}
          </p>
        </div>
      </section>

      {/* SECTION 3 — Conversion Block */}
      <section className="bg-brand-green px-4 py-12 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Like what you see? Your property is next.
          </h2>
          <div className="mt-8 flex justify-center">
            <ContactOptions whatsappMessage={waMessage} layout="row" variant="dark" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — Other Projects */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-6 font-display text-xl font-bold text-brand-green md:text-2xl">
            You might also like
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {suggestions.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/portfolio"
              className="inline-flex min-h-[44px] items-center font-semibold text-brand-green underline hover:text-brand-green-mid"
            >
              See all our work →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
