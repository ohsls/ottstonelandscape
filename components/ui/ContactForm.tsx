'use client'

import { useState, useRef, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'
import { siteConfig } from '@/data/siteConfig'

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface ContactFormProps {
  compact?: boolean
}

const NEIGHBOURHOODS = [
  'Rockcliffe Park',
  'Manotick',
  'Kanata Lakes',
  'Stittsville',
  'Barrhaven',
  'Orléans',
  'Other Ottawa area',
]

const PROJECT_TYPES = [
  'Interlock Driveway',
  'Patio & Outdoor Living',
  'Retaining Wall',
  'Pool Surround',
  'Full Property (front + back)',
  'Repair / Existing Interlock',
  'Not Sure Yet',
]

const BUDGET_RANGES = [
  '$15,000 – $25,000',
  '$25,000 – $45,000',
  '$45,000 – $80,000',
  '$80,000+',
  'Not Sure Yet',
]

const TIMELINES = [
  'As soon as possible',
  'This season (2026)',
  'Planning for next year',
  'Just exploring',
]

const REFERRAL_SOURCES = [
  'Google Search',
  'Instagram',
  'Door-to-door card',
  'Neighbour referral',
  'Other',
]

const CONTACT_METHODS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'sms', label: 'Text / SMS' },
  { value: 'email', label: 'Email' },
]

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
  website: string
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    neighbourhood: '',
    projectType: '',
    budgetRange: '',
    contactMethod: '',
    timeline: '',
    message: '',
    referralSource: '',
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const totalFiles = selectedFiles.length + files.length
    if (totalFiles > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`)
      return
    }
    const oversized = files.find((f) => f.size > MAX_FILE_SIZE)
    if (oversized) {
      setError(`"${oversized.name}" exceeds 10MB limit.`)
      return
    }
    const invalid = files.find(
      (f) => !f.type.startsWith('image/') && !f.type.startsWith('video/')
    )
    if (invalid) {
      setError(`"${invalid.name}" is not an image or video file.`)
      return
    }
    setError(null)
    const newFiles = [...selectedFiles, ...files]
    setSelectedFiles(newFiles)

    // Generate previews for new image files
    const newPreviews = [...filePreviews]
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        newPreviews.push(URL.createObjectURL(file))
      } else {
        newPreviews.push('') // No preview for videos
      }
    })
    setFilePreviews(newPreviews)

    // Reset the input so the same file can be re-selected if removed
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeFile(index: number) {
    const preview = filePreviews[index]
    if (preview) URL.revokeObjectURL(preview)
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setFilePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (formData.website) {
      setSubmitted(true)
      return
    }
    setError(null)
    setIsSubmitting(true)

    try {
      // Step 1: POST text data to /api/contact
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      // Step 2: Upload files if any selected
      if (selectedFiles.length > 0) {
        const uploadData = new FormData()
        uploadData.append('leadName', formData.name)
        selectedFiles.forEach((file) => uploadData.append('files', file))

        const uploadRes = await fetch('/api/contact/upload', {
          method: 'POST',
          body: uploadData,
        })

        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json()
          throw new Error(uploadErr.error || 'File upload failed')
        }
      }

      // Revoke all preview object URLs to free memory
      filePreviews.forEach((url) => { if (url) URL.revokeObjectURL(url) })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-brand-green-light p-8 text-center">
        <h3 className="mb-2 font-display text-2xl font-bold text-brand-green">
          Thank You!
        </h3>
        <p className="text-brand-body">
          We&apos;ve received your request. One of our owners will be in touch within 24 hours.
        </p>
        <p className="mt-4 text-sm text-brand-muted">
          Want a faster response?{' '}
          <a
            href={buildWhatsAppUrl(WA_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-green underline hover:text-brand-green-mid"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
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

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-body">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-brand-body">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      {/* Email (optional) */}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-body">
          Email <span className="text-brand-muted">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      {/* Neighbourhood (optional) */}
      <div>
        <label htmlFor="neighbourhood" className="mb-1 block text-sm font-medium text-brand-body">
          Neighbourhood <span className="text-brand-muted">(optional)</span>
        </label>
        <select
          id="neighbourhood"
          name="neighbourhood"
          value={formData.neighbourhood}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        >
          <option value="">Select your neighbourhood</option>
          {NEIGHBOURHOODS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="mb-1 block text-sm font-medium text-brand-body">
          Project Type <span className="text-red-500">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          value={formData.projectType}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        >
          <option value="">Select project type</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Budget Range — appears only after projectType selected */}
      {formData.projectType && (
        <div>
          <label htmlFor="budgetRange" className="mb-1 block text-sm font-medium text-brand-body">
            Budget Range <span className="text-red-500">*</span>
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            required
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="">Select budget range</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {/* Preferred Contact Method */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-brand-body">
          Preferred Contact Method <span className="text-red-500">*</span>
        </legend>
        <div className="flex flex-wrap gap-4">
          {CONTACT_METHODS.map((method) => (
            <label key={method.value} className="flex min-h-[44px] cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="contactMethod"
                value={method.value}
                checked={formData.contactMethod === method.value}
                onChange={handleChange}
                required
                className="h-4 w-4 accent-brand-green"
              />
              <span className="text-sm">{method.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Timeline — hidden in compact mode */}
      {!compact && (
        <div>
          <label htmlFor="timeline" className="mb-1 block text-sm font-medium text-brand-body">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}

      {/* Message — textarea; compact = optional placeholder only */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-body">
          Message {compact && <span className="text-brand-muted">(optional)</span>}
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 2 : 4}
          value={formData.message}
          onChange={handleChange}
          placeholder={compact ? 'Tell us briefly about your project...' : 'Tell us about your project, any specific requirements, or questions...'}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>

      {/* File Upload — Photos/Video of property (optional) */}
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-body">
          Upload Photos or Video of Your Property <span className="text-brand-muted">(optional)</span>
        </label>
        <div className="rounded-lg border border-dashed border-gray-300 p-4 transition-colors focus-within:border-brand-green">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            className="block w-full text-sm text-brand-muted file:mr-3 file:min-h-[44px] file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-green-light file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-green hover:file:bg-brand-green hover:file:text-white"
          />
          <p className="mt-1.5 text-xs text-brand-muted">
            Photos and short clips (max {MAX_FILES} files · 10MB each).
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-brand-muted">Have a longer video?</span>
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-[#25D366] px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
            >
              Send via WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center rounded-md border border-gray-300 px-2.5 py-1 text-xs font-semibold text-brand-body transition-colors hover:border-brand-green hover:text-brand-green"
            >
              Email Us
            </a>
          </div>
        </div>
        {/* File previews */}
        {selectedFiles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {selectedFiles.map((file, i) => (
              <div
                key={`${file.name}-${file.size}`}
                className="relative flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2 pr-8"
              >
                {filePreviews[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={filePreviews[i]}
                    alt={file.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200 text-xs text-brand-muted">
                    Video
                  </div>
                )}
                <span className="max-w-[120px] truncate text-xs text-brand-body">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Referral Source — hidden in compact mode */}
      {!compact && (
        <div>
          <label htmlFor="referralSource" className="mb-1 block text-sm font-medium text-brand-body">
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          >
            <option value="">Select source</option>
            {REFERRAL_SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] w-full rounded-lg bg-brand-green px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-mid disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Request Free Assessment'}
      </button>
    </form>
  )
}
