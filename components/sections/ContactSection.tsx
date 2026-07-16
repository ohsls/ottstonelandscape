import ContactForm from '@/components/ui/ContactForm'
import ContactOptions from '@/components/ui/ContactOptions'
import { WA_MESSAGES } from '@/lib/whatsapp'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/data/siteConfig'

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-white">
      <div className="grid gap-12 md:grid-cols-2">
        {/* LEFT — Context */}
        <div>
          <h2 className="font-display text-3xl font-bold text-brand-green md:text-4xl">
            Request Your Free Property Assessment
          </h2>
          <p className="mt-4 text-brand-muted">
            We visit your site, review your goals, and provide a detailed investment estimate — no
            cost, no pressure.
          </p>

          {/* Benefit pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['✓ Free site visit', '✓ Written estimate within 48h', '✓ No obligation'].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-brand-green-light px-4 py-2 text-sm font-medium text-brand-green"
                >
                  {pill}
                </span>
              )
            )}
          </div>

          <Separator className="my-6" />

          <p className="mb-4 text-sm text-brand-muted">Reach us directly:</p>
          <ContactOptions whatsappMessage={WA_MESSAGES.contact} layout="row" />
          <p className="mt-3 text-sm text-brand-muted">
            {siteConfig.phone} — we typically respond within 1 hour
          </p>
        </div>

        {/* RIGHT — Compact form */}
        <div>
          <ContactForm compact={true} />
        </div>
      </div>
    </SectionWrapper>
  )
}
