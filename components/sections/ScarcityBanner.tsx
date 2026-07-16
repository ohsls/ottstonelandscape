import { siteConfig } from '@/data/siteConfig'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { WA_MESSAGES } from '@/lib/whatsapp'

export default function ScarcityBanner() {
  return (
    <section className="bg-brand-gold py-12 text-center text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
          We cap our season at {siteConfig.seasonCap} projects.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          This is not a limitation — it is a quality guarantee. When we commit to your project, an
          owner is physically on-site every day until completion. That standard is only possible
          when we control our volume.
        </p>

        {/* Stats row */}
        <div className="my-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
          <div>
            <p className="text-2xl font-bold">{siteConfig.seasonCap} projects max</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{siteConfig.slotsLeft} slots remaining</p>
          </div>
          <div>
            <p className="text-2xl font-bold">2026 season</p>
          </div>
        </div>

        <WhatsAppButton
          variant="cta"
          message={WA_MESSAGES.scarcity}
          label="Claim Your Assessment Slot"
          className="!bg-white !text-brand-green hover:!bg-white/90"
        />
      </div>
    </section>
  )
}
