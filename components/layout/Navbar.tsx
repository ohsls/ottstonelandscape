'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import ContactOptions from '@/components/ui/ContactOptions'
import { WA_MESSAGES } from '@/lib/whatsapp'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const assessmentRef = useRef<HTMLDivElement>(null)

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Close assessment dropdown when clicking outside
  useEffect(() => {
    if (!assessmentOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (assessmentRef.current && !assessmentRef.current.contains(e.target as Node)) {
        setAssessmentOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [assessmentOpen])

  return (
    <header className="sticky top-0 z-50">
      {/* Thin brand bar — no text, luxury minimal */}
      <div className="bg-brand-green py-1" />

      {/* Main Navbar */}
      <nav className={`relative overflow-visible bg-white shadow-sm transition-[background-color,box-shadow] duration-300 ${scrolled ? 'backdrop-blur-sm bg-white/95 shadow-md' : ''}`}>
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-1.5' : 'py-3'}`}>
          {/* Logo */}
          <Link href="/" className="flex flex-col" onClick={closeMenu}>
            <span className="font-display text-xl font-bold text-brand-green">
              {siteConfig.name.split(' ')[0]}
              <span className="text-brand-gold">
                {' '}{siteConfig.name.split(' ').slice(1).join(' ')}
              </span>
            </span>
            <span className={`hidden text-xs text-brand-muted sm:block transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="min-h-[44px] flex items-center text-sm font-medium text-brand-body transition-colors hover:text-brand-green"
            >
              Home
            </Link>
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-[44px] flex items-center text-sm font-medium text-brand-body transition-colors hover:text-brand-green"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative" ref={assessmentRef}>
              <button
                onClick={() => setAssessmentOpen(!assessmentOpen)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                📱 Free Assessment
              </button>
              {assessmentOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border bg-white p-3 shadow-xl">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">Contact us via</p>
                  <ContactOptions whatsappMessage={WA_MESSAGES.hero} layout="stack" />
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-brand-charcoal" />
            ) : (
              <Menu className="h-6 w-6 text-brand-charcoal" />
            )}
          </button>
        </div>

        {/* Mobile menu with backdrop overlay */}
        {menuOpen && createPortal(
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />,
          document.body
        )}
        {menuOpen && (
          <div className="absolute left-0 right-0 z-50 bg-white shadow-lg md:hidden">
              <div className="flex flex-col px-4 pb-6 pt-2">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="min-h-[44px] flex items-center border-b border-gray-100 py-3 text-base font-medium text-brand-body transition-colors hover:text-brand-green"
                >
                  Home
                </Link>
                {siteConfig.nav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="min-h-[44px] flex items-center border-b border-gray-100 py-3 text-base font-medium text-brand-body transition-colors hover:text-brand-green"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">📱 Request Free Assessment</p>
                  <ContactOptions whatsappMessage={WA_MESSAGES.hero} layout="stack" />
                </div>
              </div>
            </div>
        )}
      </nav>
    </header>
  )
}
