import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/data/siteConfig'
import ContactOptions from '@/components/ui/ContactOptions'
import { WA_MESSAGES } from '@/lib/whatsapp'
import SectionWrapper from '@/components/ui/SectionWrapper'

type Props = {
  compact?: boolean
}

export default function EliteDuoSection({ compact = false }: Props) {
  if (compact) {
    return (
      <SectionWrapper className="bg-brand-charcoal text-white">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Meet the Master Craftsman
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            Over 20 Years of Cold-Climate Expertise
          </h2>
          <p className="mt-6 text-white/80">
            You are not hiring a random crew. You are hiring a dedicated expert with over 20 years of hands-on experience building premium interlock, retaining walls, and strong outdoor spaces designed specifically to handle extreme freeze-thaw cycles.
          </p>
          <p className="mt-4 text-white/80">
            Over the last 10 years, we have successfully completed more than 350 projects right here in Ottawa. The vast majority of our work comes from direct referrals — neighbors seeing our driveways and patios stand the test of time while others sink and crack. We back our work with a rock-solid guarantee.
          </p>
          <div className="mt-6 border-l-4 border-brand-gold pl-4 text-left italic text-white/80">
            We build to outlast the Ottawa winter, and our track record proves it.
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="w-full">
              <p className="mb-3 text-sm uppercase tracking-widest text-white/60">Get in Touch</p>
              <ContactOptions whatsappMessage={WA_MESSAGES.hero} layout="row" variant="dark" />
            </div>
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center text-sm text-brand-gold hover:underline"
            >
              Meet the team &rarr;
            </Link>
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper className="bg-brand-charcoal text-white">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* LEFT — Text */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Meet the Master Craftsman
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            Over 20 Years of Cold-Climate Expertise
          </h2>

          <p className="mt-6 text-white/80">
            You are not hiring a random crew. You are hiring a dedicated expert with over 20 years of hands-on experience building premium interlock, retaining walls, and strong outdoor spaces designed specifically to handle extreme freeze-thaw cycles.
          </p>
          <p className="mt-4 text-white/80">
            Over the last 10 years, we have successfully completed more than 350 projects right here in Ottawa. The vast majority of our work comes from direct referrals — neighbors seeing our driveways and patios stand the test of time while others sink and crack. We back our work with a rock-solid guarantee.
          </p>
          <p className="mt-4 text-white/80">
            When you call us, you speak directly with the expert. When work begins, you get 20 years of knowledge applied directly to your driveway, patio, or retaining wall.
          </p>

          {/* Promise block */}
          <div className="mt-6 border-l-4 border-brand-gold pl-4 italic text-white/80">
            We build to outlast the Ottawa winter, and our track record proves it.
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm uppercase tracking-widest text-white/60">Schedule a Call With Us</p>
            <ContactOptions whatsappMessage={WA_MESSAGES.hero} layout="row" variant="dark" />
          </div>
        </div>

        {/* RIGHT — Photos */}
        <div className="space-y-6">
          {/* Partner 1 */}
          <div>
            <div className="relative aspect-[3/4] w-full max-h-[50vh] overflow-hidden rounded-xl shadow-lg md:aspect-[4/5] md:max-h-none">
              <Image
                src={siteConfig.partner1.image}
                alt={siteConfig.partner1.name}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-2 font-bold text-white">{siteConfig.partner1.name}</p>
            <p className="text-sm text-white/60">{siteConfig.partner1.role}</p>
          </div>

        </div>
      </div>
    </SectionWrapper>
  )
}
