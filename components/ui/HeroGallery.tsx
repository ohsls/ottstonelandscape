'use client'

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'

interface HeroGalleryProps {
  photos: { src: string; alt?: string }[]
}

export default function HeroGallery({ photos }: HeroGalleryProps) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : photos.length - 1))
  }, [photos.length])

  const next = useCallback(() => {
    setIndex((i) => (i < photos.length - 1 ? i + 1 : 0))
  }, [photos.length])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) prev()
      else next()
    }
  }, [prev, next])

  if (photos.length === 0) return null

  return (
    <div
      className="relative aspect-[4/3] w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={photos[index].src}
        alt={photos[index].alt ?? `Photo ${index + 1}`}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Left edge — previous */}
      {photos.length > 1 && (
        <button
          onClick={prev}
          className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-pointer"
          aria-label="Previous photo"
        />
      )}
      {/* Right edge — next */}
      {photos.length > 1 && (
        <button
          onClick={next}
          className="absolute inset-y-0 right-0 z-10 w-1/3 cursor-pointer"
          aria-label="Next photo"
        />
      )}
      {/* Counter pill */}
      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {index + 1} / {photos.length}
        </div>
      )}
    </div>
  )
}
