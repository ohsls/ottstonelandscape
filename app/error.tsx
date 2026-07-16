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
    <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
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
