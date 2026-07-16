import type { Metadata } from 'next'
import { Phone, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import ContactForm from '@/components/ui/ContactForm'
import ContactOptions from '@/components/ui/ContactOptions'
import { WA_MESSAGES } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact the Best Landscaping Company in Ottawa',
  description: 'Ready to upgrade your driveway, patio, or backyard? Contact Ottawa\'s premier hardscaping experts for a free landscaping quote and consultation.',
}

export default function ContactPage() {
  return (
    <main id="main-content">
      {/* Page header */}
      <section className="bg-brand-green py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Get a Free Ottawa Landscaping & Interlock Quote
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Contact our experts to discuss your driveway, patio, retaining wall, or backyard project. Free site assessment. Detailed estimate. No obligation.
          </p>
        </div>
      </section>

      {/* Two columns: contact info + form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* LEFT — Contact info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-green md:text-3xl">
                Get in Touch
              </h2>
              <p className="mt-4 text-brand-muted">
                Prefer to reach out directly? Here&apos;s how to find us.
              </p>

              <div className="mt-8 space-y-6">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green-light transition-colors group-hover:bg-brand-green">
                    <Phone className="h-5 w-5 text-brand-green transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-green">Phone</p>
                    <span className="inline-flex min-h-[44px] items-center text-brand-body group-hover:text-brand-green">
                      {siteConfig.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green-light transition-colors group-hover:bg-brand-green">
                    <Mail className="h-5 w-5 text-brand-green transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-green">Email</p>
                    <span className="inline-flex min-h-[44px] items-center text-brand-body group-hover:text-brand-green">
                      {siteConfig.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green-light">
                    <MapPin className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-green">Location</p>
                    <p className="text-brand-body">{siteConfig.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-brand-green">Reach us directly:</p>
                <ContactOptions whatsappMessage={WA_MESSAGES.contact} layout="stack" />
              </div>

              {/* Google Maps embed */}
              <div className="mt-8 overflow-hidden rounded-xl">
                <iframe
                  title="OttStone Landscape - Ottawa"
                  src="https://maps.google.com/maps?q=Ottawa,Ontario&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* RIGHT — Full form (not compact) */}
            <div>
              <ContactForm compact={false} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
