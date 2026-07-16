# SESSION 13 — Pre-Launch Hardening & Missing Files
**Hand this file to Claude/AI and say: "Read this file and execute every task in order."**

---

## MISSION

You are working on the **StoneEdge Ottawa** website — a Next.js 14 (App Router) premium hardscaping business site. The website is fully built (12 sessions complete, 30+ files, 0 TypeScript errors, 0 lint errors).

This session completes **all remaining pre-launch tasks**: missing files, security hardening, performance improvements, and mobile fixes identified in the final audit.

**Project location:** `D:\landscapeWs\stoneedge-ottawa`

**Tech stack:** Next.js 14.2.x, TypeScript, Tailwind CSS 3.x, shadcn/ui, lucide-react, Resend SDK

**Rules:**
- Do NOT modify any existing content/text/copy — only add new files or make targeted code changes described below.
- Do NOT install new npm packages unless explicitly stated below.
- After each file, run `npx tsc --noEmit` and fix any TypeScript errors before moving on.
- After ALL tasks are complete, run `npx next build` and confirm 0 errors.
- Announce each completed file: `✅ [filename] — done`

---

## TASK LIST — Complete in this exact order

---

## PHASE 1 — Do NOW (code-only, no real content needed) ✅ COMPLETE

These tasks are pure code changes. They work with placeholder data and don't generate anything Google will index.

---

### TASK 1: `app/not-found.tsx` (New file) ✅ DONE
**Purpose:** Branded 404 page. Critical for QR code users who hit bad URLs.

**Requirements:**
- Server component (no `'use client'`)
- Full-height centered layout
- Brand green color scheme
- Show: "404" in large display font, "Page Not Found" heading, a helpful message, and a link back to homepage
- Use `Link` from `next/link` for the homepage button
- The button should have min-h-[44px] for touch targets
- Keep it simple and branded — no images needed

**Spec:**
```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-brand-green/20">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-green">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-brand-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-green px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-mid"
      >
        Back to Homepage
      </Link>
    </main>
  )
}
```

Build this file exactly as shown.

---

### TASK 2: `app/error.tsx` (New file) ✅ DONE
**Purpose:** Error boundary so crashes show a recovery screen, not a white page.

**Requirements:**
- MUST have `'use client'` as the first line (Next.js requirement for error boundaries)
- Receives `error` and `reset` props
- Shows a branded error message with a "Try Again" button that calls `reset()`
- Also shows a "Go Home" link as fallback
- Logs the error to console for debugging
- Both buttons must have min-h-[44px]

**Spec:**
```tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-bold text-brand-green/20">Oops</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-brand-green">
        Something Went Wrong
      </h1>
      <p className="mt-4 max-w-md text-brand-muted">
        We hit an unexpected error. Please try again.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-green px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-mid"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand-green px-6 py-3 text-base font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
        >
          Go Home
        </Link>
      </div>
    </main>
  )
}
```

Build this file exactly as shown.

---

### TASK 3: `app/loading.tsx` (New file) ✅ DONE
**Purpose:** Loading skeleton for page transitions.

**Requirements:**
- Server component (no `'use client'`)
- Simple centered spinner/pulse animation
- Uses brand green color
- Visually lightweight — not a complex skeleton

**Spec:**
```tsx
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green-light border-t-brand-green" />
        <p className="text-sm text-brand-muted">Loading...</p>
      </div>
    </main>
  )
}
```

Build this file exactly as shown.

---

---

## PHASE 2 — Do AFTER content swap (needs real business data + real domain) ⏳ DEFERRED

> **STOP.** Do NOT run Phase 2 until you have:
> 1. Replaced all placeholder content in `data/siteConfig.ts` (real name, phone, email, address)
> 2. Replaced all placeholder projects in `data/projects.ts` (real project data)
> 3. Bought your domain and know your real URL
> 4. Created your OG image (1200×630 branded image)
>
> These tasks generate data that Google will index and users will see when sharing links.
> Running them with placeholder data means Google indexes fake information.

---

### TASK 4: `app/sitemap.ts` (New file) ⏳ DEFERRED — needs real domain
**Purpose:** Dynamic sitemap for Google crawling. Uses the projects data to generate project page URLs.

**Requirements:**
- Uses Next.js 14 `MetadataRoute.Sitemap` type
- Includes all static pages: `/`, `/services`, `/portfolio`, `/about`, `/contact`
- Includes all dynamic project pages from `data/projects.ts`
- Uses your REAL domain URL from `NEXT_PUBLIC_SITE_URL` env variable
- `lastModified` set to `new Date()`
- Priority: homepage 1.0, main pages 0.8, project pages 0.6

**Spec:**
```ts
import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stoneedgeottawa.ca'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages]
}
```

Build this file exactly as shown.

---

### TASK 5: `app/robots.ts` (New file) ⏳ DEFERRED — needs real domain
**Purpose:** Tell search engines what to crawl and where the sitemap is.

**Requirements:**
- Uses Next.js 14 `MetadataRoute.Robots` type
- Allows all crawlers on all pages
- Disallows `/api/` routes (no need to crawl API endpoints)
- Points to the sitemap URL

**Spec:**
```ts
import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stoneedgeottawa.ca'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

Build this file exactly as shown.

---

### TASK 6: Add `LocalBusiness` JSON-LD structured data to `app/layout.tsx` ⏳ DEFERRED — needs real business data
**Purpose:** Critical for Google Maps / Local Pack SEO rankings. Shows your business info directly in Google search results.

**What to do:** Add a `<script type="application/ld+json">` tag inside the `<body>` tag of `app/layout.tsx`, right BEFORE the `<Navbar />` component.

**Import `siteConfig`** at the top of the file (add to existing imports):
```ts
import { siteConfig } from '@/data/siteConfig'
```

**Add this block inside `<body>`, before `<Navbar />`:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      description: "Ottawa's owner-operated premium hardscape studio. Luxury driveways, patios, and retaining walls.",
      url: 'https://stoneedgeottawa.ca',
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
```

**IMPORTANT:** Place the siteConfig import alongside the existing imports. Place the `<script>` tag as the first child of `<body>`, before `<Navbar />`.

**The resulting body should look like:**
```tsx
<body className={`${playfair.variable} ${inter.variable} antialiased`}>
  <script type="application/ld+json" ... />
  <Navbar />
  {children}
  <Footer />
  <WhatsAppButton variant="floating" message={WA_MESSAGES.hero} />
</body>
```

---

### TASK 7: Add `Strict-Transport-Security` header to `next.config.mjs` ✅ DONE
**Purpose:** Forces HTTPS connections. Important security header that was missing.

**What to do:** Open `next.config.mjs` and add this header to the existing `headers` array (add it as the LAST item in the headers array, after the existing `Permissions-Policy` entry):

```js
{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
```

**The full headers array should become:**
```js
headers: [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
],
```

---

### TASK 8: Add `Content-Security-Policy` header to `next.config.mjs` ✅ DONE
**Purpose:** Prevents XSS via injected scripts. Must whitelist Vimeo, Google Maps, Google Fonts, and the image CDN.

**What to do:** Add this header to the same headers array in `next.config.mjs` (add it as the LAST item):

```js
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://picsum.photos https://fastly.picsum.photos https://res.cloudinary.com",
    "media-src 'self' blob:",
    "frame-src https://player.vimeo.com https://maps.google.com",
    "connect-src 'self' https://wa.me",
  ].join('; '),
},
```

**Notes:**
- `unsafe-inline` and `unsafe-eval` are needed for Next.js and Tailwind to work
- `picsum.photos` and `fastly.picsum.photos` are the placeholder image domains (swap for real CDN later)
- `res.cloudinary.com` is pre-whitelisted for when they switch to Cloudinary
- `player.vimeo.com` for video embeds
- `maps.google.com` for the contact page Google Maps embed
- `wa.me` for WhatsApp link prefetch/navigation

---

### TASK 9: Add OG image metadata to `app/layout.tsx` ⏳ DEFERRED — needs real OG image
**Purpose:** When someone shares your site link on Facebook, iMessage, WhatsApp, etc., it shows a branded preview image instead of nothing.

**What to do:** Add an `images` array to the existing `openGraph` object in the `metadata` export in `app/layout.tsx`.

**Find this block in the metadata:**
```ts
openGraph: {
  title: 'StoneEdge Ottawa | Premium Hardscaping & Interlock',
  description: "Ottawa's owner-operated premium hardscape studio.",
  url: 'https://stoneedgeottawa.ca',
  siteName: 'StoneEdge Ottawa',
  locale: 'en_CA',
  type: 'website',
},
```

**Replace it with:**
```ts
openGraph: {
  title: 'StoneEdge Ottawa | Premium Hardscaping & Interlock',
  description: "Ottawa's owner-operated premium hardscape studio.",
  url: 'https://stoneedgeottawa.ca',
  siteName: 'StoneEdge Ottawa',
  locale: 'en_CA',
  type: 'website',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'StoneEdge Ottawa — Premium Hardscaping & Interlock',
    },
  ],
},
```

**Also add a `twitter` metadata object** right after the `openGraph` block:
```ts
twitter: {
  card: 'summary_large_image',
  title: 'StoneEdge Ottawa | Premium Hardscaping & Interlock',
  description: "Ottawa's owner-operated premium hardscape studio.",
  images: ['/og-image.png'],
},
```

**Note:** The actual `/public/og-image.png` file will be created by the business owner with their branded design later. This just sets up the metadata to use it.

---

### TASK 10: Add honeypot spam protection to `ContactForm.tsx` ✅ DONE
**Purpose:** Bots auto-fill all form fields including hidden ones. Real users never see or fill the hidden field. If it's filled, the submission is a bot. This provides spam protection without CAPTCHA friction.

**What to do in `components/ui/ContactForm.tsx`:**

**Step A:** Add a `honeypot` field to the `FormData` interface:
```ts
interface FormData {
  name: string
  phone: string
  email: string
  neighbourhood: string
  projectType: string
  budgetRange: string
  contactMethod: string
  timeline: string
  message: string
  referralSource: string
  website: string  // honeypot — hidden field, must stay empty
}
```

**Step B:** Add `website: ''` to the initial state in `useState<FormData>`.

**Step C:** Add this hidden field **inside the `<form>` element**, right after the opening `<form>` tag. It MUST be visually hidden but accessible to bots:
```tsx
{/* Honeypot — hidden from real users, bots auto-fill it */}
<div className="absolute -left-[9999px]" aria-hidden="true">
  <label htmlFor="website">Website</label>
  <input
    id="website"
    name="website"
    type="text"
    value={formData.website}
    onChange={handleChange}
    tabIndex={-1}
    autoComplete="off"
  />
</div>
```

**Step D:** In the `handleSubmit` function, add this check at the very beginning (after `e.preventDefault()` and before `setError(null)`):
```ts
// Honeypot check — if filled, silently "succeed" (fool the bot)
if (formData.website) {
  setSubmitted(true)
  return
}
```

**Step E:** Also validate server-side in `app/api/contact/route.ts`. Add this check after the rate limiting check and before the required fields validation:
```ts
// Honeypot check — bots fill hidden fields
if (body.website) {
  // Return success to fool the bot, but don't send email
  return NextResponse.json({ success: true })
}
```

---

### TASK 11: Add swipe gesture support to `HeroGallery.tsx` ✅ DONE
**Purpose:** The `Lightbox` component has swipe gesture support for mobile, but `HeroGallery` (used on project detail pages) only has edge-click zones. Mobile users will naturally try to swipe. This adds swipe support to match.

**What to do in `components/ui/HeroGallery.tsx`:**

**Step A:** Add `useRef` to the import:
```ts
import { useState, useCallback, useRef } from 'react'
```

**Step B:** Add touch refs after the existing state:
```ts
const touchStartX = useRef<number | null>(null)
const touchStartY = useRef<number | null>(null)
```

**Step C:** Add swipe handler functions after `next`:
```ts
const handleTouchStart = useCallback((e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX
  touchStartY.current = e.touches[0].clientY
}, [])

const handleTouchEnd = useCallback((e: React.TouchEvent) => {
  if (touchStartX.current === null || touchStartY.current === null) return
  const dx = e.changedTouches[0].clientX - touchStartX.current
  const dy = e.changedTouches[0].clientY - touchStartY.current
  touchStartX.current = null
  touchStartY.current = null
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx > 0) prev()
    else next()
  }
}, [prev, next])
```

**Step D:** Add `onTouchStart` and `onTouchEnd` to the outer `<div>`:
```tsx
<div
  className="relative aspect-video w-full"
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
>
```

---

### TASK 12: Add preconnect hints to `app/layout.tsx` ✅ DONE
**Purpose:** Tells the browser to start connecting to Vimeo's server immediately, so the hero video loads faster. Small but meaningful performance win since the hero video is the first thing users see.

**What to do:** Inside the `<html>` tag but BEFORE `<body>`, add a `<head>` block with preconnect links:

```tsx
<html lang="en">
  <head>
    <link rel="preconnect" href="https://player.vimeo.com" />
    <link rel="dns-prefetch" href="https://player.vimeo.com" />
  </head>
  <body className={...}>
```

**Note:** Next.js App Router allows a `<head>` element inside the `<html>` tag for manual `<link>` tags. The `metadata` export handles `<title>`, `<meta>`, etc., but preconnect hints go in `<head>`.

---

### TASK 13: Switch file upload to Vercel Blob ✅ DONE
**Purpose:** The current upload API (`app/api/contact/upload/route.ts`) saves files to the local filesystem. Vercel's filesystem is **read-only** — this will fail in production. Switch to Vercel Blob storage.

**Step A:** Install the package:
```bash
npm install @vercel/blob
```

**Step B:** Replace the ENTIRE contents of `app/api/contact/upload/route.ts` with:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_PREFIXES = ['image/', 'video/']
const ALLOWED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif',
  '.mp4', '.mov', '.avi', '.webm', '.mkv',
])

// Simple in-memory rate limiter (per IP, 3 uploads per minute)
// Note: On Vercel serverless, this resets per invocation. For persistent
// rate limiting, switch to Upstash Redis or Vercel KV.
const uploadRateMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = uploadRateMap.get(ip)
  if (!entry || now > entry.resetTime) {
    uploadRateMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

function getFileExtension(name: string): string {
  const lastDot = name.lastIndexOf('.')
  return lastDot >= 0 ? name.substring(lastDot).toLowerCase() : ''
}

function sanitizeFilename(name: string): string | null {
  const ext = getFileExtension(name)
  if (!ALLOWED_EXTENSIONS.has(ext)) return null
  const base = name.substring(0, name.length - ext.length)
  const clean = base.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 100)
  return `${clean}${ext}`
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many upload requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('Upload received but BLOB_READ_WRITE_TOKEN not set — skipping storage')
      return NextResponse.json({ success: true, files: [] })
    }

    const formData = await req.formData()
    const leadName = (formData.get('leadName') as string) ?? 'unknown'
    const files = formData.getAll('files')

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed` },
        { status: 400 }
      )
    }

    // Validate all files before uploading any
    for (const entry of files) {
      if (!(entry instanceof File)) {
        return NextResponse.json({ error: 'Invalid file data' }, { status: 400 })
      }
      if (entry.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${entry.name}" exceeds 10MB limit` },
          { status: 400 }
        )
      }
      const isAllowedType = ALLOWED_PREFIXES.some((prefix) =>
        entry.type.startsWith(prefix)
      )
      if (!isAllowedType) {
        return NextResponse.json(
          { error: `File "${entry.name}" is not an image or video` },
          { status: 400 }
        )
      }
      const sanitizedTest = sanitizeFilename(entry.name)
      if (!sanitizedTest) {
        return NextResponse.json(
          { error: `File "${entry.name}" has a disallowed file extension` },
          { status: 400 }
        )
      }
    }

    // Upload files to Vercel Blob
    const timestamp = Date.now()
    const leadPrefix = leadName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50)
    const uploadedUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File
      const sanitized = sanitizeFilename(file.name)
      if (!sanitized) continue
      const blobPath = `uploads/${timestamp}_${leadPrefix}_${i + 1}_${sanitized}`

      const blob = await put(blobPath, file, {
        access: 'public',
        contentType: file.type,
      })

      uploadedUrls.push(blob.url)
    }

    return NextResponse.json({ success: true, files: uploadedUrls })
  } catch {
    console.error('Upload API error')
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

**Step C:** The business owner needs to add `BLOB_READ_WRITE_TOKEN` to their Vercel environment variables (covered in the Deployment Guide). For local development, the upload will gracefully skip storage if the token is missing.

---

## VERIFICATION CHECKLIST

### After Phase 1: ✅ VERIFIED 2026-03-11
```bash
# 1. TypeScript check
npx tsc --noEmit
# Result: 0 errors ✅

# 2. Full production build
npx next build
# Result: 0 errors, 17 pages generated ✅
```

### After Phase 2 (run only after content swap):
```bash
# 1. Full production build
npx next build
# Expected: 0 errors

# 2. Verify SEO routes
npm run dev
# Check: http://localhost:3000/sitemap.xml  (all pages listed with real domain)
# Check: http://localhost:3000/robots.txt   (points to real sitemap URL)
# Check page source of homepage — JSON-LD script tag has real business data
```

---

## FILES CREATED (3 new — Phase 1 only):
1. `app/not-found.tsx` ✅
2. `app/error.tsx` ✅
3. `app/loading.tsx` ✅

## FILES DEFERRED (2 — Phase 2, needs real content):
1. `app/sitemap.ts` — needs real domain
2. `app/robots.ts` — needs real domain

## FILES MODIFIED (6 existing):
1. `app/layout.tsx` — preconnect hints for Vimeo (`<head>` block added)
2. `next.config.mjs` — HSTS header + Content-Security-Policy header
3. `components/ui/ContactForm.tsx` — honeypot spam protection field (`website` in FormData + hidden input + client-side check)
4. `app/api/contact/route.ts` — honeypot server-side check
5. `components/ui/HeroGallery.tsx` — swipe gesture support for mobile (touch refs + handlers)
6. `app/api/contact/upload/route.ts` — rewritten to use Vercel Blob instead of local filesystem

## PACKAGES INSTALLED (1):
1. `@vercel/blob` — for cloud file upload storage (replaces local filesystem)

---

## SUMMARY OF WHAT THIS SESSION COMPLETED

### Phase 1 — Done ✅ (2026-03-11):
| Category | Issue | Fix | Status |
|---|---|---|---|
| **UX** | Ugly default 404 page | Branded `not-found.tsx` | ✅ |
| **UX** | White screen on errors | Recovery `error.tsx` with retry | ✅ |
| **UX** | No loading state during navigation | Spinner `loading.tsx` | ✅ |
| **Security** | Missing HSTS header | Added to next.config.mjs | ✅ |
| **Security** | No Content-Security-Policy | CSP header with all domains whitelisted | ✅ |
| **Security** | No bot protection on contact form | Honeypot field (client + server) | ✅ |
| **Security** | File upload fails on Vercel | Switched to Vercel Blob storage | ✅ |
| **Mobile** | HeroGallery has no swipe support | Added touch swipe gestures | ✅ |
| **Performance** | Cold connection to Vimeo | Preconnect hints in layout.tsx | ✅ |

### Phase 2 — Deferred ⏳ (needs real content/domain):
| Category | Issue | Fix | Status |
|---|---|---|---|
| **SEO** | No sitemap for Google | `app/sitemap.ts` with all pages | ⏳ needs domain |
| **SEO** | No robots.txt | `app/robots.ts` with crawl rules | ⏳ needs domain |
| **SEO** | No LocalBusiness schema | JSON-LD in layout.tsx | ⏳ needs business data |
| **SEO** | No OG image for social sharing | OG + Twitter meta in layout.tsx | ⏳ needs OG image |

### After everything:
The ONLY work left is:
1. Content swap (replace all placeholder data with real business info)
2. SEO files (sitemap, robots, JSON-LD, OG image — Phase 2 tasks)
3. Deploying to Vercel following the `DEPLOYMENT_GUIDE.md`
