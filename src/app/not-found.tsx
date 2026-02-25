import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg seismic-bg">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-gradient-orange mb-4">404</h1>
        <p className="text-steel-400 font-body mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-orange-400 text-steel-900 font-semibold text-sm hover:bg-orange-300 transition-all shadow-orange"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
