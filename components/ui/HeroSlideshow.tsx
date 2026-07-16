'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

interface HeroSlideshowProps {
  photos: string[]
  interval?: number    // milliseconds between slides — default 5500
  randomize?: boolean  // shuffle order on each page load — default false
}

export default function HeroSlideshow({
  photos,
  interval = 5500,
  randomize = false,
}: HeroSlideshowProps) {
  // Build the display order — stable for the lifetime of the page
  const orderedPhotos = useMemo(() => {
    if (!randomize) return photos
    const shuffled = [...photos]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [photos, randomize])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (orderedPhotos.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % orderedPhotos.length)
    }, interval)
    return () => clearInterval(timer)
  }, [orderedPhotos, interval])

  if (orderedPhotos.length === 0) return null

  return (
    <div className="absolute inset-0 h-full w-full">
      {orderedPhotos.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
          aria-hidden={i !== currentIndex}
        >
          <Image
            src={src}
            alt={`Project showcase ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  )
}
