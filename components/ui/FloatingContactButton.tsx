'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Phone, X, Mail, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface FloatingContactButtonProps {
  whatsappMessage: string
}

// Icons that cycle on the closed FAB — signals "multiple ways to reach us"
const FAB_ICONS = [
  { icon: Phone, label: 'Call' },
  { icon: 'whatsapp' as const, label: 'WhatsApp' },
  { icon: MessageSquare, label: 'Text' },
  { icon: Mail, label: 'Email' },
]

const ROTATION_INTERVAL = 5000 // 7 seconds per icon

export default function FloatingContactButton({ whatsappMessage }: FloatingContactButtonProps) {
  const [open, setOpen] = useState(false)
  const [iconIndex, setIconIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const phoneDigits = siteConfig.phone.replace(/[^+\d]/g, '')
  const waHref = buildWhatsAppUrl(whatsappMessage)

  // Rotate icon when FAB is closed
  useEffect(() => {
    if (open) return
    const timer = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % FAB_ICONS.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(timer)
  }, [open])

  // Close on outside tap
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const handleToggle = useCallback(() => setOpen((prev) => !prev), [])

  const optionClass =
    'flex min-h-[48px] items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors'

  // Render the current rotating icon
  const currentFabIcon = FAB_ICONS[iconIndex]
  const FabIconElement =
    currentFabIcon.icon === 'whatsapp' ? (
      <WhatsAppIcon className="h-7 w-7 text-white" />
    ) : (
      <currentFabIcon.icon className="h-7 w-7 text-white" />
    )

  return (
    <div
      ref={containerRef}
      className="fixed right-4 z-50 md:hidden"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
    >
      {/* Expanded contact options */}
      {open && (
        <div className="mb-3 w-52 rounded-xl border bg-white p-2 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="mb-1 px-2 pt-1 text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Contact us
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${optionClass} text-brand-green hover:bg-brand-green-light`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href={`tel:${phoneDigits}`}
            className={`${optionClass} text-brand-green hover:bg-brand-green-light`}
          >
            <Phone className="h-5 w-5" />
            Call Us
          </a>
          <a
            href={`sms:${phoneDigits}`}
            className={`${optionClass} text-brand-green hover:bg-brand-green-light`}
          >
            <MessageSquare className="h-5 w-5" />
            Text Us
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className={`${optionClass} text-brand-green hover:bg-brand-green-light`}
          >
            <Mail className="h-5 w-5" />
            Email
          </a>
        </div>
      )}

      {/* FAB trigger — icon rotates every 7s when closed */}
      <button
        onClick={handleToggle}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        className="relative ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green shadow-lg transition-transform hover:scale-105"
      >
        {!open && (
          <span
            className="absolute inset-0 rounded-full bg-brand-green/60"
            style={{ animation: 'gentle-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
          />
        )}
        <span className="relative transition-opacity duration-300">
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            FabIconElement
          )}
        </span>
      </button>
    </div>
  )
}
