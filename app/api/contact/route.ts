import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiter (per IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

/** Escape HTML special characters to prevent XSS in email content */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildEmailHtml(body: Record<string, string>): string {
  const fields = [
    ['Name', body.name],
    ['Phone', body.phone],
    ['Email', body.email],
    ['Neighbourhood', body.neighbourhood],
    ['Project Type', body.projectType],
    ['Budget Range', body.budgetRange],
    ['Preferred Contact', body.contactMethod],
    ['Timeline', body.timeline],
    ['Referral Source', body.referralSource],
    ['Message', body.message],
  ]

  const rows = fields
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:bold;border:1px solid #ddd;">${escapeHtml(label as string)}</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(value as string)}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1A3C1F;">New Lead from OttStone Landscape Website</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows}
      </table>
      <p style="margin-top:24px;color:#777;font-size:12px;">Sent from ottstonelandscape.ca contact form</p>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await req.json()

    // Honeypot check — bots fill hidden fields
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    const required = ['name', 'phone', 'projectType', 'budgetRange', 'contactMethod']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Sanitize: trim all string values and limit length to prevent abuse
    for (const key of Object.keys(body)) {
      if (typeof body[key] === 'string') {
        body[key] = body[key].trim().substring(0, 1000)
      }
    }

    // Basic input validation
    if (body.phone && !/^[+\d\s()\-]{7,20}$/.test(body.phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // If RESEND_API_KEY is missing/dummy, return success anyway (local dev)
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_key_here') {
      console.log('Contact form submission (no Resend key):', body)
      return NextResponse.json({ success: true })
    }

    const { error } = await resend.emails.send({
      from: 'OttStone Landscape <onboarding@resend.dev>',
      to: ['ottstonelandscape@gmail.com'],
      subject: `New Lead: ${body.name} — ${body.projectType} — ${body.neighbourhood}`,
      html: buildEmailHtml(body),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Email failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    console.error('Contact API error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
