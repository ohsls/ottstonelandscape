# PRE-LAUNCH TO-DO LIST

> Complete everything below **before** swapping in real content (photos, texts, phone numbers, colors).  
> Once this list is done, the only remaining work is the content swap itself.

---

## ALREADY DONE — No Changes Needed

These are locked in. Don't touch them.

### Build & Code Quality
- [x] **Zero TypeScript errors** — `npx tsc --noEmit` passes clean
- [x] **Production build passes** — 17 pages generated, zero warnings
- [x] **Zero IDE/lint errors** across all files
- [x] **No duplicate JSX anywhere** — `ContactForm` defined once, imported in 2 places. Never copied.
- [x] **All brand text sourced from `data/siteConfig.ts`** — no hardcoded company name in components
- [x] **All project/package/testimonial data in `data/*.ts`** — single source of truth, easy to swap
- [x] **`app/page.tsx` has zero logic** — only imports 8 section components in order

### Security
- [x] **XSS prevention** — all user input HTML-escaped before inserting into email body
- [x] **Rate limiting** — `/api/contact` (5/min) and `/api/contact/upload` (3/min) per IP
- [x] **Input validation** — phone regex, email format check, all strings trimmed + capped at 1000 chars
- [x] **File upload hardened** — MIME type validation, extension whitelist, 10MB per file, Vercel Blob cloud storage (switched from local filesystem in Session 13)
- [x] **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `Content-Security-Policy` all set in `next.config.mjs`
- [x] **VideoEmbed sanitized** — `videoId` stripped to numeric-only to prevent iframe src injection
- [x] **`.gitignore` covers `/uploads/`** — user-uploaded files won't be committed

### Mobile & Touch
- [x] **Touch targets ≥ 44×44px** on every interactive element (buttons, links, radio inputs, menu items)
- [x] **iOS Safari auto-zoom prevention** — `font-size: 16px !important` on all form inputs
- [x] **iOS scroll lock** — `position: fixed` approach on lightbox + navbar mobile menu (not just `overflow: hidden`)
- [x] **Lightbox swipe gestures** — horizontal swipe detection with 50px threshold
- [x] **`touch-action: manipulation`** — eliminates 300ms tap delay on all mobile browsers
- [x] **`-webkit-text-size-adjust: 100%`** — prevents text resize on orientation change
- [x] **`viewport-fit: cover`** — iPhone notch/Dynamic Island safe areas supported
- [x] **Safe-area bottom padding** — body + WhatsApp floating button both respect iPhone home bar
- [x] **WhatsApp floating button mobile-only** — `md:hidden` prevents desktop clutter
- [x] **ProjectCard badges visible on mobile** — always shown (no hover-only on touch devices)
- [x] **Partner photos capped at `max-h-[50vh]`** on mobile — no excessive scrolling
- [x] **Hero video poster fallback** — background-image ensures iOS users who block autoplay see content, not black

### SEO & Metadata
- [x] **Dynamic `<title>` with template** — `%s | StoneEdge Ottawa` pattern across all pages
- [x] **Open Graph tags** — title, description, URL, siteName, locale, type
- [x] **`themeColor` set** — Android Chrome browser bar matches brand green
- [x] **`lang="en"` on `<html>`**
- [x] **Dynamic metadata on project pages** — `generateMetadata` per slug
- [x] **Static params generated** — `generateStaticParams` for all project slugs (SSG)

### Accessibility
- [x] **`aria-label` on icon-only buttons** — WhatsApp floating, hamburger menu, lightbox controls
- [x] **Keyboard navigation on lightbox** — Escape closes, Arrow keys navigate
- [x] **Proper `<label>` + `id` pairs** on every form field
- [x] **`<fieldset>` + `<legend>`** on radio button group
- [x] **Semantic HTML** — `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` used correctly
- [x] **Google Fonts loaded with `display: 'swap'`** — text visible during font load
- [x] **Skip-to-content link** — hidden `<a href="#main-content">` in `app/layout.tsx`, visible on focus. All page `<main>` elements have `id="main-content"`. Fixes Lighthouse accessibility flag.

### Components & Architecture
- [x] **`WhatsAppButton`** — 1 component, 3 variants (floating/cta/inline), no duplicate button files
- [x] **`ContactOptions`** — 4 contact methods (WhatsApp/Call/Text/Email), light/dark variants, row/stack layouts
- [x] **`SectionWrapper`** — consistent `py-16 md:py-24` + `max-w-6xl` on all sections
- [x] **`VideoEmbed`** — 2 modes (background/player), sanitized, lazy-loaded in player mode
- [x] **`Lightbox`** — responsive grid, fullscreen view, keyboard nav, swipe, edge-click zones, iOS scroll lock
- [x] **`HeroGallery`** — hero-sized carousel with edge-click navigation + counter pill
- [x] **`PortfolioFilter`** — client component extracted so portfolio page stays server component (metadata works)
- [x] **Navbar** — shrink-on-scroll, backdrop-blur, mobile menu with scroll lock + backdrop close, assessment dropdown. Backdrop overlay rendered via `createPortal` into `document.body` (not inside `<header>`) — fixes click-through bug where page sections with stacking contexts swallowed overlay taps
- [x] **Lazy loading** — player iframes + lightbox grid images use `loading="lazy"`

- [x] **`HeroGallery` swipe gestures** — horizontal swipe detection with 50px threshold, matches Lightbox behavior
- [x] **Honeypot spam protection** — hidden `website` field in ContactForm, client-side silent "success" for bots, server-side check in API route

### Form & Contact
- [x] **Two-step form submission** — JSON data first, then file upload (skips upload if no files)
- [x] **Compact + full form modes** — `compact={true}` hides timeline/referral, used on homepage. `compact={false}` shows all fields, used on contact page
- [x] **File upload UI** — max 5 files, image preview thumbnails, video placeholder, remove button per file
- [x] **Client + server validation** — both sides check file count, size, and MIME type
- [x] **Graceful Resend fallback** — if API key is missing/dummy, logs to console and returns success (local dev works)
- [x] **Thank-you state** — no redirect, shows confirmation inline after submit. Includes WhatsApp link for faster response.

### Error Handling & Loading States
- [x] **Custom 404 page** (`app/not-found.tsx`) — branded "Page Not Found" with homepage link. Critical for QR code users hitting bad URLs
- [x] **Error boundary** (`app/error.tsx`) — "Something Went Wrong" recovery screen with Try Again + Go Home buttons. Logs error to console
- [x] **Loading spinner** (`app/loading.tsx`) — brand-green animated spinner for page transitions

### Performance
- [x] **`prefers-reduced-motion` respected** — `globals.css` disables all animations (`gentle-ping`, `animate-spin`, `animate-bounce`) and collapses transition durations for users with motion sensitivity. Done in Session 15.
- [x] **`public/favicon.ico`** — Added. Copied from `app/icon.png`. Fixes browsers that request `/favicon.ico` directly. Done in Session 15.
- [x] **Preconnect hints** — `<link rel="preconnect">` and `<link rel="dns-prefetch">` for `player.vimeo.com` in layout `<head>`
- [x] **HSTS header** — `Strict-Transport-Security: max-age=31536000; includeSubDomains` forces HTTPS
- [x] **Content-Security-Policy header** — whitelists Vimeo, Google Maps, Google Fonts, picsum.photos, Cloudinary, WhatsApp, Vercel Blob (`*.public.blob.vercel-storage.com`). Done Session 13, Blob domain added Session 15.
- [x] **Vercel Blob file upload** — replaced local filesystem storage with `@vercel/blob` cloud storage (production-ready)

---

## MUST DO (Blockers)

- [x] ~~**Add `app/sitemap.ts`**~~ — Done. Next.js 14 dynamic sitemap for Google crawling active.
- [x] ~~**Add `app/robots.ts`**~~ — Done. Tells search engines what to crawl/ignore.
- [x] ~~**Add custom `app/not-found.tsx`**~~ — Done in Session 13.
- [x] ~~**Add `app/error.tsx`**~~ — Done in Session 13.
- [x] ~~**Add `app/loading.tsx`**~~ — Done in Session 13.
- [x] ~~**Switch file upload storage**~~ — Done in Session 13. Switched to `@vercel/blob`.
- [x] ~~**Add `LocalBusiness` JSON-LD structured data**~~ — Done. In `app/layout.tsx`. Critical for Google Maps / Local Pack SEO rankings.
- [x] ~~**Add `Content-Security-Policy` header**~~ — Done in Session 13.
- [x] ~~**Add proper OG image metadata structure**~~ — Done. (You just need to add the actual `/og-image.png` file to `/public`).

---

## SHOULD DO (Recommended)

- [ ] **Run Lighthouse audit** — Target 90+ on all 4 categories (Performance, Accessibility, Best Practices, SEO). Fix anything that flags.
- [ ] **Test all pages on real iPhone + Android** — Especially: hero video, lightbox swipe, form submission, WhatsApp button, contact options.
- [ ] **Test form submission end-to-end with real Resend API key** — Verify emails arrive, formatting looks good, all fields show up.
- [ ] **Test file upload with Vercel Blob** — After setting `BLOB_READ_WRITE_TOKEN` in Vercel, verify image/video uploads work and URLs are accessible.
- [ ] **Verify WhatsApp links open correctly** — Test on both iOS and Android with real phone number.
- [ ] **Check all `tel:` and `mailto:` links** — Make sure they dial/compose correctly on mobile.
- [x] ~~**Add `favicon.ico`**~~ — Done in Session 15. `public/favicon.ico` added.

---

## NICE TO HAVE (Polish)

- [ ] **Add page transition animations** — Subtle fade-in on page load using CSS or Framer Motion.
- [ ] **Add scroll-triggered animations** — Sections fade/slide in as user scrolls (Intersection Observer or library).
- [x] ~~**Preconnect to external domains**~~ — Done in Session 13. Vimeo preconnect + dns-prefetch added to layout `<head>`.
- [ ] **Add a "Back to Top" button** — Floating button that appears after scrolling down, smooth-scrolls to top.
- [ ] **Consider adding a Privacy Policy page** — Not legally required for a simple contact form in Ontario, but builds trust. Especially if you're storing uploaded photos.

---

## CONTENT SWAP PHASE (After all above is done)

> This is the final step. Do NOT start this until everything above is checked off.

- [x] ~~**Replace all project data in `data/projects.ts`**~~ — **Partially done (2026-07-14).** 2 real projects added: (1) Nepean Full Property Transformation (12 photos), (2) Orléans Interlock Driveway (7 photos). All 5 placeholder projects removed. Add more real projects as they are photographed.
- [x] ~~**Replace all `picsum.photos` placeholder URLs with real images**~~ — **Partially done (2026-07-14).** Hero slideshow and both real projects use real Cloudinary URLs with optimized transforms. Remaining placeholders: partner photos in `data/siteConfig.ts`.
- [x] ~~**Replace hero Vimeo video ID in `components/sections/HeroSection.tsx`**~~ — Hero now uses `HeroSlideshow` with real photos instead of Vimeo. No video needed until drone footage is ready.
- [ ] Replace brand name in `data/siteConfig.ts`
- [ ] Replace phone number, email, address in `data/siteConfig.ts`
- [ ] Replace WhatsApp number in `.env.local` (`NEXT_PUBLIC_WHATSAPP_PHONE`)
- [ ] Replace partner names, roles, and photos in `data/siteConfig.ts`
- [ ] Replace tagline in `data/siteConfig.ts`
- [ ] Replace all project data in `data/projects.ts` (titles, descriptions, photos, videos, neighbourhoods)
- [ ] Replace package names, prices, and features in `data/packages.ts`
- [ ] Replace testimonials in `data/testimonials.ts` (or remove if using trust section)
- [ ] Replace hero Vimeo video ID in `components/sections/HeroSection.tsx`
- [ ] Replace all `picsum.photos` placeholder URLs with real images
- [ ] Upload real images to `/public/` or your CDN and update all image paths
- [ ] Adjust brand colors in `tailwind.config.ts` (green, gold, charcoal values)
- [ ] Update year/season references (2026 season, etc.)
- [ ] Set real Resend API key in `.env.local`
- [ ] Set real domain in `.env.local` (`NEXT_PUBLIC_SITE_URL`)
- [ ] Update OG metadata URL in `app/layout.tsx` to real domain
- [ ] Replace Google Maps embed query in `app/contact/page.tsx` with real business address
- [ ] Update social media URLs in `data/siteConfig.ts` (when accounts are active)
- [ ] Final build test: `npx next build` — must pass with 0 errors
- [ ] Deploy to Vercel and verify all pages load correctly
