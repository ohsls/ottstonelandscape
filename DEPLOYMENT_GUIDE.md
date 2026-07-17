# DEPLOYMENT GUIDE — StoneEdge Ottawa Website
**Read this when you're ready to put your website online.**

---

## TABLE OF CONTENTS

1. [Before You Start — What You Need](#1-before-you-start--what-you-need)
2. [Step 1: Buy Your Domain](#step-1-buy-your-domain)
3. [Step 2: Create a GitHub Account & Push Your Code](#step-2-create-a-github-account--push-your-code)
4. [Step 3: Create a Vercel Account & Deploy](#step-3-create-a-vercel-account--deploy)
5. [Step 4: Connect Your Domain to Vercel](#step-4-connect-your-domain-to-vercel)
6. [Step 5: Set Up Resend (Email Service)](#step-5-set-up-resend-email-service)
7. [Step 6: Set Up File Upload (Customer Photos/Videos)](#step-6-set-up-file-upload-customer-photosvideos)
8. [Step 7: Replace Placeholder Content](#step-7-replace-placeholder-content)
9. [How to Upload Your Project Photos & Videos](#how-to-upload-your-project-photos--videos)
10. [Where Do Customer Form Submissions Go?](#where-do-customer-form-submissions-go)
11. [How to Update Your Website After It's Live](#how-to-update-your-website-after-its-live)
12. [Monthly Costs Summary](#monthly-costs-summary)
13. [Troubleshooting](#troubleshooting)

---

## 1. Before You Start — What You Need

| Item | What It Is | Cost |
|---|---|---|
| **Domain name** (e.g., stoneedgeottawa.ca) | Your website address | ~$15–25/year |
| **GitHub account** | Where your code lives (like a cloud drive for code) | Free |
| **Vercel account** | Hosts your website (makes it live on the internet) | Free (Hobby plan) |
| **Resend account** | Sends you emails when customers fill out your contact form | Free (3,000 emails/month) |
| **Vimeo account** | Hosts your project videos (hero video, project videos) | Free (basic) or $12/month (Plus) |
| **Cloudinary account** | Stores your project photos (replaces picsum.photos placeholders) | Free (25GB storage + 25GB bandwidth/month) |

**Total monthly cost: $0–$12/month** (domain is yearly, everything else has free tiers).

---

## Step 1: Buy Your Domain

### Option A: Web Hosting Canada (WHC)
1. Go to https://whc.ca/canadian-domains/
2. Search for your domain (e.g., `stoneedgeottawa.ca`)
3. Buy the `.ca` domain (usually ~$15–20/year for `.ca`)
4. **DO NOT buy any hosting plan** — you don't need it. Vercel hosts your site for free.
5. After purchase, you'll get access to WHC's domain management panel where you can change DNS settings (you'll need this in Step 4)

### Option B: Other Domain Registrars
- **Namecheap** (namecheap.com) — usually cheapest
- **Google Domains** (now Squarespace Domains)
- **GoDaddy** — works but more expensive

> **Important:** You are ONLY buying the domain name (the `.ca` address). You do NOT need web hosting from them — Vercel provides free hosting.

---

## Step 2: Create a GitHub Account & Push Your Code

GitHub is where your website code will live. Vercel reads from GitHub to build and deploy your site.

### 2a. Create a GitHub Account
1. Go to https://github.com
2. Click "Sign up" and create a free account

### 2b. Install Git (if not already installed)
1. Open PowerShell and type: `git --version`
2. If you see a version number, Git is installed. Skip to 2c.
3. If not, download Git from https://git-scm.com/download/win and install it (use all default settings)

### 2c. Push Your Code to GitHub
Open PowerShell in your project folder (`D:\landscapeWs\ottstonelandscape`) and run these commands:

```powershell
# Only do this once — initializes your project as a Git repository
git init
git add .
git commit -m "Initial commit - ottstonelandscape website"

# Create a new repository on GitHub:
# 1. Go to https://github.com/new
# 2. Name it: ottstonelandscape
# 3. Keep it Private
# 4. Don't add README or .gitignore (you already have them)
# 5. Click "Create repository"
# 6. GitHub will show you commands. Run the ones under "push an existing repository":

git remote add origin https://github.com/ohsls/ottstonelandscape.git
git branch -M main
git push -u origin main
```

Your code is now on GitHub. Every time you make changes, you'll push them with:
```powershell
git add .
git commit -m "Description of what you changed"
git push
```

---

## Step 3: Create a Vercel Account & Deploy

Vercel is where your website actually runs. It's free and automatic.

### 3a. Create a Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" → choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub

### 3b. Import Your Project
1. On the Vercel dashboard, click **"Add New..." → "Project"**
2. Find `ottstonelandscape` in your GitHub repo list → click **"Import"**
3. Vercel will auto-detect it's a Next.js project
4. **Before clicking Deploy**, add your environment variables:
   - Click **"Environment Variables"**
   - Add these three:

   | Key | Value |
   |---|---|
   | `RESEND_API_KEY` | `re_your_real_key` (get this from Step 5) |
   | `NEXT_PUBLIC_WHATSAPP_PHONE` | `1613XXXXXXX` (your real WhatsApp number, no spaces, no dashes) |
   | `NEXT_PUBLIC_SITE_URL` | `https://ottstonelandscape.ca` (your real domain) |

5. Click **"Deploy"**
6. Wait ~60 seconds. Vercel will build your site and give you a URL like `ottstonelandscape.vercel.app`
7. Visit it — your website is live!

---

## Step 4: Connect Your Domain to Vercel

Right now your site is at `ottstonelandscape.vercel.app`. Let's connect your real domain.

### 4a. Add Domain in Vercel
1. In your Vercel project dashboard → **"Settings" → "Domains"**
2. Type your domain: `ottstonelandscape.ca`
3. Click **"Add"**
4. Vercel will tell you to add DNS records. It will show you something like:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 76.76.21.21 |
   | CNAME | www | cname.vercel-dns.com |

### 4b. Update DNS at Your Domain Registrar (WHC)
1. Log in to your WHC account
2. Go to **Domain Management** → click on your domain
3. Find **DNS Settings** or **DNS Zone Editor**
4. Add/update these records:

   | Type | Host/Name | Value/Points to | TTL |
   |---|---|---|---|
   | **A** | @ (or blank) | `76.76.21.21` | 3600 |
   | **CNAME** | www | `cname.vercel-dns.com` | 3600 |

5. Save. DNS changes take **5 minutes to 48 hours** to propagate (usually 15–30 minutes)
6. Go back to Vercel — it will automatically detect when DNS is ready and issue an SSL certificate (HTTPS)

> **After this:** Both `stoneedgeottawa.ca` and `www.stoneedgeottawa.ca` will show your website with a green lock (HTTPS).

---

## Step 5: Set Up Resend (Email Service)

Resend is what sends you an email every time a customer fills out your contact form.

### 5a. Create a Resend Account
1. Go to https://resend.com
2. Sign up (free plan = 3,000 emails/month — more than enough)
3. Go to **API Keys** → click "Create API Key"
4. Copy the key (starts with `re_`)

### 5b. Add the API Key to Vercel
1. Go to your Vercel project → **Settings → Environment Variables**
2. Update `RESEND_API_KEY` with your real key
3. Click **Save**
4. Go to **Deployments** → click the three dots on the latest deployment → **"Redeploy"**

### 5c. Verify Your Domain in Resend (Required)
For emails to send from `noreply@stoneedgeottawa.ca`, you need to verify your domain:
1. In Resend → **Domains** → **"Add Domain"**
2. Enter `stoneedgeottawa.ca`
3. Resend will give you DNS records to add (similar to Step 4b)
4. Add these records in your WHC DNS settings
5. Click "Verify" in Resend — once green, emails will work

### 5d. Update the "To" Email Address
Currently, form submissions go to `info@stoneedgeottawa.ca`. If you want them to go to your personal email:
1. Open `app/api/contact/route.ts` in VS Code
2. Find `to: ['info@stoneedgeottawa.ca']`
3. Change it to your real email: `to: ['your.real.email@gmail.com']`
4. Push to GitHub → Vercel auto-deploys

---

## Step 6: Set Up File Upload (Customer Photos/Videos)

The current upload system saves files to the server's local disk, which **does not work on Vercel** (Vercel has a read-only filesystem). You need cloud storage.

### Recommended: Vercel Blob Storage
Vercel Blob is the simplest option since you're already on Vercel.

**Setup:**
1. In your Vercel project dashboard → **"Storage"** tab → **"Create Database"** → select **"Blob"**
2. Vercel will give you a `BLOB_READ_WRITE_TOKEN` — add it to your environment variables
3. Install the package:
   ```powershell
   npm install @vercel/blob
   ```
4. Update the upload route (`app/api/contact/upload/route.ts`) to use Vercel Blob instead of local filesystem:

   **Replace the file-saving logic with:**
   ```typescript
   import { put } from '@vercel/blob';

   // Instead of writing to local filesystem:
   const blob = await put(`uploads/${timestamp}-${safeName}`, fileBuffer, {
     access: 'public',
     contentType: file.type,
   });
   // blob.url is the public URL of the uploaded file
   ```

5. Push to GitHub → auto-deploys

**Cost:** Free up to 500MB storage. After that, $0.15/GB. More than enough for customer photos.

### Alternative: Cloudinary (also free tier)
If you prefer Cloudinary for both YOUR project photos AND customer uploads:
1. Sign up at https://cloudinary.com (free = 25GB storage)
2. Install: `npm install cloudinary`
3. Use Cloudinary's upload API instead of local filesystem

> **Note:** I can help you modify the upload route code when you're ready to deploy. Just ask.

---

## Step 7: Replace Placeholder Content

Before going live, swap all placeholder data with your real content. Here's the exact file and what to change:

### Your Brand Info → `data/siteConfig.ts`
```typescript
// Change these values:
name:        'Your Real Business Name',
phone:       '(613) XXX-XXXX',          // your real phone
email:       'your@realemail.ca',
address:     'Your City, Ontario',
partner1:    { name: 'Real Name', role: 'Real Title', image: 'https://res.cloudinary.com/...' },
partner2:    { name: 'Real Name', role: 'Real Title', image: 'https://res.cloudinary.com/...' },
slotsLeft:   3,  // your real availability
```

### Your Projects → `data/projects.ts`
Replace each placeholder project with your real completed projects. See the section below on how to upload your photos first.

### Your Packages → `data/packages.ts`
Update package names, prices, and feature lists to match your real services.

### WhatsApp Number → `.env.local` + Vercel Environment Variables
Change `NEXT_PUBLIC_WHATSAPP_PHONE` to your real number (country code + number, no spaces).

### Hero Video → `components/sections/HeroSection.tsx`
Replace `76979871` with your real Vimeo video ID (upload your drone footage to Vimeo first).

---

## How to Upload Your Project Photos & Videos

### For Videos → Use Vimeo
1. Create a free Vimeo account at https://vimeo.com
2. Upload your project videos / drone footage
3. Each video gets a URL like `https://vimeo.com/123456789`
4. The number at the end (`123456789`) is the **Video ID** — use this in your project data

### For Photos → Use Cloudinary (Recommended)
1. Create a free Cloudinary account at https://cloudinary.com
2. Go to **Media Library** → **Upload** → drag and drop your project photos
3. Each photo gets a URL like:
   `https://res.cloudinary.com/your-cloud/image/upload/v12345/project-photo.jpg`
4. Copy these URLs and put them in `data/projects.ts`

**Example — adding a real project:**
```typescript
// In data/projects.ts, add to the projects array:
{
  id: '7',
  slug: 'barrhaven-patio-2026',
  title: 'Barrhaven Backyard Patio',
  type: 'Patio & Outdoor Living',
  neighbourhood: 'Barrhaven',
  description: 'Custom interlock patio with fire pit and natural stone steps.',
  photos: [
    'https://res.cloudinary.com/yourcloud/image/upload/barrhaven-patio-1.jpg',
    'https://res.cloudinary.com/yourcloud/image/upload/barrhaven-patio-2.jpg',
    'https://res.cloudinary.com/yourcloud/image/upload/barrhaven-patio-3.jpg',
  ],
  completedDate: 'April 2026',
  featured: true,
  videoId: '123456789',  // optional — only if you have a video for this project
  mediaOrder: [
    { type: 'video', videoId: '123456789' },
    { type: 'photo', src: 'https://res.cloudinary.com/yourcloud/image/upload/barrhaven-patio-1.jpg', alt: 'Overview' },
    { type: 'photo', src: 'https://res.cloudinary.com/yourcloud/image/upload/barrhaven-patio-2.jpg', alt: 'Fire pit' },
    { type: 'photo', src: 'https://res.cloudinary.com/yourcloud/image/upload/barrhaven-patio-3.jpg', alt: 'Steps' },
  ],
}
```

### For Partner Photos → Same as above
Upload to Cloudinary, copy URL, paste into `data/siteConfig.ts`.

### Updating next.config.mjs
When you switch from picsum.photos to Cloudinary, add Cloudinary's domain to the image whitelist:

```javascript
// In next.config.mjs, add to the remotePatterns array:
{ protocol: 'https', hostname: 'res.cloudinary.com' },
```

---

## Where Do Customer Form Submissions Go?

### Contact Form Submissions → Your Email
When a customer fills out the contact form on your website:
1. The form data is sent to your API (`/api/contact`)
2. Your API sends you an email via Resend
3. **The email arrives in your inbox** (whatever email you set in `route.ts`)
4. The email contains: customer name, phone, email, project type, budget, preferred contact method, message, and neighbourhood

**You'll get an email like this:**
```
Subject: New Lead: John Smith — Interlock Driveway — Kanata Lakes

Name: John Smith
Phone: (613) 555-1234
Email: john@example.com
Project Type: Interlock Driveway
Budget Range: $25,000 – $45,000
Contact Method: WhatsApp
Neighbourhood: Kanata Lakes
Message: I'd like to get a quote for my front driveway...
```

### Customer File Uploads → Cloud Storage
When a customer attaches photos/videos to the form:
1. Files are uploaded to your cloud storage (Vercel Blob or Cloudinary — see Step 6)
2. You can view them through the Vercel Blob dashboard or Cloudinary Media Library
3. The upload confirmation email will include the file URLs so you can see what they sent

> **Tip:** After setting up Vercel Blob, you can modify the email notification to include links to uploaded files so everything arrives in one email.

### WhatsApp Messages → Your WhatsApp
When customers click any WhatsApp button, it opens WhatsApp with a pre-filled message. That message goes directly to your WhatsApp number. You respond from your phone like a normal chat.

### Phone Calls & SMS → Your Phone
When customers click "Call Us" or "Text Us", it opens their phone dialer/SMS app with your number. These go directly to your phone.

---

## How to Update Your Website After It's Live

### The Workflow (takes ~2 minutes):
1. **Edit files** in VS Code on your computer
2. **Save** your changes
3. **Push to GitHub:**
   ```powershell
   cd D:\landscapeWs\stoneedge-ottawa
   git add .
   git commit -m "Added new project: Kanata driveway"
   git push
   ```
4. **Vercel auto-deploys** — within 60 seconds, your live website is updated

### Common Updates:

| What You Want to Do | File to Edit | What to Change |
|---|---|---|
| Add a new project | `data/projects.ts` | Add new project object to the array |
| Change prices | `data/packages.ts` | Update `startingAt` values |
| Update phone/email | `data/siteConfig.ts` | Change `phone` and `email` fields |
| Update slots remaining | `data/siteConfig.ts` | Change `slotsLeft` number |
| Change hero video | `components/sections/HeroSection.tsx` | Replace Vimeo ID |
| Add a new service | `app/services/page.tsx` | Add to the services array |
| Fix a typo | Find the file with the text | Edit and push |

### Don't Forget:
- When adding new project **photos from Cloudinary**, make sure `res.cloudinary.com` is in your `next.config.mjs` `remotePatterns`
- When adding new **videos**, the Vimeo domain is already whitelisted (it's an iframe, not next/image)

---

## Monthly Costs Summary

| Service | Free Tier | When You'd Pay |
|---|---|---|
| **Vercel** (hosting) | 100GB bandwidth/month | Very unlikely to exceed for a small business |
| **Resend** (emails) | 3,000 emails/month | Only if you get 3,000+ form submissions/month |
| **Cloudinary** (photos) | 25GB storage, 25GB bandwidth | Only if you upload hundreds of high-res photos |
| **Vimeo** (videos) | 500MB/week upload, basic features | $12/month for Plus if you need more uploads |
| **Domain** (.ca) | N/A | ~$15–25/year |
| **GitHub** | Unlimited private repos | Free forever for your use case |

**Realistic monthly cost: $0–$2/month** (just the domain amortized). Everything else stays within free tiers for a small business.

---

## Troubleshooting

### "My form submissions aren't arriving"
1. Check that `RESEND_API_KEY` is set correctly in Vercel → Settings → Environment Variables
2. Check that you verified your domain in Resend (Step 5c)
3. Check your spam/junk folder
4. In Resend dashboard → **Logs** — you can see every email sent or failed

### "My photos aren't showing"
1. Make sure the image URLs are correct (test by pasting in your browser)
2. Make sure the image domain is in `next.config.mjs` `remotePatterns`
3. Redeploy after changing `next.config.mjs`

### "Customer uploads aren't working"
1. Make sure you set up Vercel Blob (Step 6) and added the `BLOB_READ_WRITE_TOKEN`
2. Check Vercel → **Storage** to see if files are arriving

### "My site is showing old content"
1. Make sure you pushed your changes: `git push`
2. Check Vercel dashboard → **Deployments** — the latest should say "Ready"
3. Hard refresh your browser: `Ctrl + Shift + R`

### "DNS isn't working / domain not connecting"
1. DNS changes can take up to 48 hours (usually 15–30 minutes)
2. Use https://dnschecker.org to verify your DNS records are propagated
3. Make sure you added BOTH the A record and CNAME record in Step 4b

---

## Quick Reference — The 5 Accounts You Need

| Account | URL | What For |
|---|---|---|
| GitHub | github.com | Stores your code |
| Vercel | vercel.com | Hosts your website |
| Resend | resend.com | Sends form submission emails to you |
| Cloudinary | cloudinary.com | Stores your project photos |
| Vimeo | vimeo.com | Hosts your project videos |

---

*When you're ready to deploy, go through this guide step by step. If you get stuck on any step, ask and I'll help you through it.*
