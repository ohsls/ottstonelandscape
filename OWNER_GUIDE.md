# OWNER GUIDE — How Your Website Works

> Read this file to understand what happens when a customer uses your website.
> No technical knowledge needed.

---

## HOW A CUSTOMER CONTACTS YOU

There are **5 ways** a customer can reach you from your website:

| Method | What happens |
|---|---|
| **WhatsApp button** | Opens WhatsApp on their phone with a pre-written message. Goes directly to your WhatsApp. |
| **Call Us** | Dials your phone number directly. |
| **Text / SMS** | Opens their SMS app with your number pre-filled. |
| **Email** | Opens their email app addressed to your business email. |
| **Contact Form** | Fills out a form with project details + optional photo/video upload. You receive it by email. |

The **WhatsApp**, **Call**, **Text**, and **Email** buttons are visible in 4 places:
- The hero section (big buttons on the homepage)
- The navbar "Free Assessment" button (desktop)
- The floating button (bottom-right on mobile)
- The EliteDuo section ("Schedule a Call")

---

## THE CONTACT FORM — What You Receive

When a customer fills out and submits the contact form, **you receive an email** at your business email address.

That email contains:

| Field | Notes |
|---|---|
| **Name** | Customer's full name |
| **Phone** | Their phone number |
| **Email** | Their email (optional — they may leave it blank) |
| **Neighbourhood** | Where in Ottawa they live |
| **Project Type** | Driveway / Patio / Retaining Wall / Pool Surround / Full Property / Repair / Not Sure |
| **Budget Range** | $15k–$25k / $25k–$45k / $45k–$80k / $80k+ / Not Sure |
| **Preferred Contact** | WhatsApp / Phone Call / Text / Email |
| **Timeline** | ASAP / This season / Next year / Just exploring |
| **Message** | Any free-text notes they add |
| **Referral Source** | How they found you (Google / Instagram / Door card / Neighbour / Other) |

> **Right now (development):** Emails do NOT send yet because the Resend API key is a dummy value. This gets set up at launch. The form still works and shows "Thank You" to the customer — it just logs to console instead of sending.

---

## CUSTOMER PHOTO/VIDEO UPLOADS

Customers can optionally attach photos or videos of their property when submitting the contact form.

**What they can upload:**
- Up to **5 files** per submission
- **10MB max per file**
- Accepted types: JPG, PNG, WEBP, HEIC (iPhone photos), MP4, MOV, and other common video formats

**Where the files go:**
- Files are stored in **Vercel Blob** — this is a cloud storage service from Vercel (the company that hosts your website)
- You receive the **download links** in the same email as the contact form data
- Files are stored at a URL like: `https://[your-blob-store].public.blob.vercel-storage.com/uploads/...`

> **Right now (development):** Uploads do NOT save yet because `BLOB_READ_WRITE_TOKEN` is not set. At launch, you set this in your Vercel dashboard (takes 2 minutes). After that, uploads go to cloud storage automatically.

**10MB limit — is it enough for photos?**
- iPhone photos (HEIC/JPG): 4–8MB each → fits easily ✅
- Short video clips (30 sec, 1080p): 50–150MB → will be REJECTED ❌

If a customer tries to upload a video that's too big, they'll see an error message. They can still submit the form without the video. For the purpose of getting a quote, photos are almost always enough.

---

## YOUR PROJECT PORTFOLIO PAGES

Each project has its own page at `/portfolio/[slug]` — for example:
- `/portfolio/manotick-driveway`
- `/portfolio/kanata-patio`

**What a project page shows:**
1. Hero photo carousel (swipeable on mobile) OR a Vimeo video player if you have one
2. Full photo grid with lightbox (tap any photo to view fullscreen)
3. Project details (type, neighbourhood, description, completion date)
4. A WhatsApp/contact CTA: *"Your property is next — request a free assessment"*
5. 2 "Similar Projects" suggestions at the bottom

**QR code use case:** You hand a customer a business card with a QR code linking to `/portfolio/manotick-driveway`. They scan it, land directly on that project page, and the WhatsApp pre-filled message says: *"Hi! I just scanned your card and saw the Manotick Estate Driveway project. I'd love a free assessment for my property."*

---

## THE HERO VIDEO (Homepage Background)

The homepage has a full-screen background video that autoplays, muted, on loop.

**Current state:** Using Vimeo video ID `76979871` (a placeholder). You can see it at `https://vimeo.com/76979871`

**To replace it with your real video:**
1. Upload your video to Vimeo (free account works, or Pro for better quality)
2. Find the video ID in the URL: `https://vimeo.com/YOUR_VIDEO_ID`
3. Open `components/sections/HeroSection.tsx` and change `videoId="76979871"` to your real ID

**Tips for the hero video:**
- Keep it 30–90 seconds (it loops anyway — most visitors scroll within 10 seconds)
- Start with your most impressive shot — don't build up to it
- If you use Vimeo free: video quality is limited and it shows Vimeo branding on hover (not visible in background mode)
- If you want faster load + no Vimeo dependency: switch to a self-hosted MP4 (discussed in LAST_CHECK.md item #5)

---

## WHAT SETUP IS NEEDED AT LAUNCH

When you're ready to go live, complete these in order:

### Step 1 — Swap all placeholder content
- [ ] Real business name, phone, email, address → `data/siteConfig.ts`
- [ ] Real partner names, roles, photos → `data/siteConfig.ts`
- [ ] Real WhatsApp number → `.env.local` (`NEXT_PUBLIC_WHATSAPP_PHONE=1XXXXXXXXXX`)
- [ ] Real projects (photos, titles, descriptions) → `data/projects.ts`
- [ ] Real testimonials → `data/testimonials.ts`
- [ ] Real hero Vimeo video ID → `components/sections/HeroSection.tsx`
- [ ] Real package prices (if different) → `data/packages.ts`
- [ ] Real Google Maps address → `app/contact/page.tsx`
- [ ] Remove all `picsum.photos` URLs → replace with your real images

### Step 2 — Set up services (free accounts)

| Service | What for | Cost | Where to set key |
|---|---|---|---|
| **Resend** (resend.com) | Sends contact form emails to you | Free up to 3,000/month | `.env.local` → `RESEND_API_KEY` |
| **Vercel** (vercel.com) | Hosts the website + stores uploaded photos | Free tier covers a small biz site | Vercel dashboard → Environment Variables |
| **Vimeo** | Hosts your hero video and project videos | Free (limited) or ~$7/month Pro | Just need the video ID |

### Step 3 — Domain & deployment
- [ ] Buy your domain (e.g., `stoneedgeottawa.ca`) from Namecheap, Google Domains, or GoDaddy (~$15/year)
- [ ] Connect domain to Vercel (they walk you through it)
- [ ] Add `app/sitemap.ts` with your real domain (tells Google what pages to crawl)
- [ ] Add `app/robots.ts` with your real domain
- [ ] Add `LocalBusiness` JSON-LD to `app/layout.tsx` (critical for Google Maps ranking)
- [ ] Create a 1200×630 OG image (branded preview for social sharing) → save to `/public/og-image.png`

### Step 4 — Final checks
- [ ] Test contact form → verify email arrives in your inbox
- [ ] Test file upload → verify photos appear in Vercel Blob dashboard
- [ ] Test all WhatsApp links on a real phone
- [ ] Run Lighthouse audit (target 90+ on all 4 categories)
- [ ] Test on real iPhone SE (small screen — hero content can be dense)

---

## QUICK REFERENCE — Where Things Live in the Code

| What you want to change | File to edit |
|---|---|
| Business name, phone, email | `data/siteConfig.ts` |
| Partner bios and photos | `data/siteConfig.ts` |
| Project portfolio | `data/projects.ts` |
| Package names and prices | `data/packages.ts` |
| Testimonials | `data/testimonials.ts` |
| WhatsApp number | `.env.local` |
| Resend API key | `.env.local` |
| Hero video ID | `components/sections/HeroSection.tsx` |
| Budget range options in form | `components/ui/ContactForm.tsx` |
| Season cap / slots left | `data/siteConfig.ts` (`seasonCap`, `slotsLeft`) |
| Navbar links | `data/siteConfig.ts` (`nav` array) |
| Email recipient address | `app/api/contact/route.ts` (the `to:` field) |
