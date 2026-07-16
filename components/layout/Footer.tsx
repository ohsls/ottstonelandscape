import Link from 'next/link'
// import { Instagram, Facebook } from 'lucide-react' // Hidden — no active social accounts yet
import { siteConfig } from '@/data/siteConfig'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="font-display text-xl font-bold text-white">
              {siteConfig.name.split(' ')[0]}
              <span className="text-brand-gold">
                {' '}{siteConfig.name.split(' ').slice(1).join(' ')}
              </span>
            </Link>
            <p className="mt-2 text-sm text-white/70">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm text-white/70">{siteConfig.address}</p>
            <p className="text-sm text-white/70">
              Owner-Operated Since {siteConfig.yearFounded}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="min-h-[44px] inline-flex items-center text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`} className="inline-flex min-h-[44px] items-center transition-colors hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-[44px] items-center transition-colors hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            {/* Social media links hidden — no active accounts yet */}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
