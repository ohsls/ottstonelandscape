import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingContactButton from '@/components/ui/FloatingContactButton'
import { WA_MESSAGES } from '@/lib/whatsapp'
import { siteConfig } from '@/data/siteConfig'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ottstonelandscape.ca'),
  title: {
    default: 'OttStone Landscape | Premium Hardscaping & Interlock Ottawa',
    template: '%s | OttStone Landscape',
  },
  description: "Ottawa's owner-operated premium hardscape studio. Luxury driveways, patios, and retaining walls engineered for Ottawa's 60+ annual freeze-thaw cycles.",
  keywords: ['interlock driveway Ottawa', 'hardscaping Ottawa', 'paving stones Ottawa', 'retaining wall Ottawa', 'OttStone Landscape'],
  openGraph: {
    title: 'OttStone Landscape | Premium Hardscaping & Interlock Ottawa',
    description: "Ottawa's owner-operated premium hardscape studio.",
    url: 'https://ottstonelandscape.ca',
    siteName: 'OttStone Landscape',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OttStone Landscape - Premium Hardscaping & Interlock Ottawa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OttStone Landscape | Premium Hardscaping & Interlock Ottawa',
    description: "Ottawa's owner-operated premium hardscape studio.",
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1A3C1F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {/* Skip to main content — accessibility / keyboard nav */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: siteConfig.name,
              description: "Ottawa's owner-operated premium hardscape studio. Luxury driveways, patios, and retaining walls.",
              url: 'https://ottstonelandscape.ca',
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ottawa',
                addressRegion: 'ON',
                addressCountry: 'CA',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.4215,
                longitude: -75.6972,
              },
              areaServed: {
                '@type': 'City',
                name: 'Ottawa',
              },
              priceRange: '$$$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00',
              },
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <FloatingContactButton whatsappMessage={WA_MESSAGES.hero} />
      </body>
    </html>
  )
}
