'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  photos: { src: string; alt?: string }[]
}

export default function Lightbox({ photos }: LightboxProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])

  const prev = useCallback(() => {
    setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : photos.length - 1))
  }, [photos.length])

  const next = useCallback(() => {
    setOpenIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : 0))
  }, [photos.length])

  // Keyboard navigation
  useEffect(() => {
    if (openIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKey)

    // iOS Safari scroll lock: position fixed approach
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [openIndex, close, prev, next])

  // Touch swipe handlers
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

    // Only count horizontal swipes (dx > dy) with 50px minimum
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) prev()
      else next()
    }
  }, [prev, next])

  if (photos.length === 0) return null

  return (
    <>
      {/* Photo grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] min-h-[44px] overflow-hidden rounded-lg"
          >
            <Image
              src={photo.src}
              alt={photo.alt ?? `Photo ${i + 1}`}
              fill
              sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
              className="object-cover object-bottom transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image with clickable left/right edge zones */}
          <div
            className="relative h-[70vh] w-[90vw] max-w-5xl sm:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[openIndex].src}
              alt={photos[openIndex].alt ?? `Photo ${openIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
            {/* Left edge click zone — previous */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-pointer"
                aria-label="Previous photo"
              />
            )}
            {/* Right edge click zone — next */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute inset-y-0 right-0 z-10 w-1/3 cursor-pointer"
                aria-label="Next photo"
              />
            )}
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white">
            {openIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
