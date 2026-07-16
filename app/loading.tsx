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
