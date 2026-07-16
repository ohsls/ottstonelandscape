import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
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
