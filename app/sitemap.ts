import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ottstonelandscape.ca'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: now, priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, priority: 0.8 },
  ]

  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.slug}`,
    lastModified: now,
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages]
}