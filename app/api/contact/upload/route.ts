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
        access: 'private',
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
