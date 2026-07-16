import HeroSlideshow from '@/components/ui/HeroSlideshow'
import ContactOptions from '@/components/ui/ContactOptions'
import { WA_MESSAGES } from '@/lib/whatsapp'
import { ChevronDown } from 'lucide-react'

// ─── HERO SLIDESHOW PHOTOS ────────────────────────────────────────────────────
// Replace these placeholder URLs with your real Cloudinary photo URLs.
// Photos display in this exact order. To shuffle randomly on each page load,
// change  randomize={false}  →  randomize={true}  on <HeroSlideshow> below.
// Recommended: 4–6 landscape photos (16:9 ratio works best for fullscreen hero).
// When drone footage is ready: replace this entire component with a <video> tag
// (see LAST_CHECK.md Task A for the exact code).
const HERO_PHOTOS = [
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066126/1_bjnv7h.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066126/2_syzioy.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066126/3_ywslwn.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066126/4_rctwe0.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066127/5_enzhlw.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066126/6_lsuhxd.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066128/7_n9y53f.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066125/8_crrqb6.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066127/9_kmyf07.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066127/10_ppotiw.jpg',
  'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,c_fill,g_center,ar_16:9,w_1920/v1784066125/11_lffse6.jpg',
]
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background slideshow layer */}
      <div className="absolute inset-0">
        <HeroSlideshow photos={HERO_PHOTOS} interval={2000} randomize={false} />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        {/* Eyebrow badge */}
        <span className="inline-block rounded-full border border-brand-gold px-4 py-1 text-sm uppercase tracking-widest text-brand-gold">
          Top-Rated Interlock & Landscaping in Ottawa
        </span>

        {/* Headline */}
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
          Premium Landscaping &
          <br />
          Interlock Installation
          <br />
          Built to Survive
          <br />
          Ottawa Winters.
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-lg text-white/80 md:text-xl">
          With over 20 years of cold-climate experience and 350+ completed projects in Ottawa, we build driveways, patios, and retaining walls engineered to last. Our work is fully guaranteed.
        </p>

        {/* CTA group */}
        <div className="mt-8 flex flex-col items-center justify-center gap-6">
          <p className="text-sm uppercase tracking-widest text-white/60">📱 Request Free Assessment</p>
          <ContactOptions whatsappMessage={WA_MESSAGES.hero} layout="row" variant="dark" />
          <a
            href="#portfolio"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            See Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-8 w-8 animate-bounce text-white/60" />
      </div>
    </section>
  )
}
