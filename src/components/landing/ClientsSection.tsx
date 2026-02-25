'use client'

const CLIENT_NAMES = [
  'Teine Energy', 'Canacol Energy', 'Strath Resources', 'WesternZagros', 'PETROCHAD',
  'Parex Resources', 'Murphy Oil Corp', 'Petrolex', 'E3 Lithium', 'Pacific',
  'TOTAL', 'Oil India Limited', 'CEPSA', 'Cantium', 'KNOC',
  'Tallahassee Resources', 'Baycrest Energy', 'MEIL', 'Dodsal', 'Vanoil',
  'Pine Cliff Energy', 'FCR', 'NXT Energy Solutions', 'Equence', 'Apex',
  'Kallisto', 'Lightstream', 'Madalena Energy', 'Felix Energy', 'Journey Energy',
]

export function ClientsSection() {
  return (
    <section id="clients" className="py-24 bg-[var(--surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-400 text-xs tracking-widest uppercase font-medium mb-4 border border-gold-400/30 px-3 py-1 rounded-full">
            Our Clients
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">
            Technology Proven in{' '}
            <span className="text-gradient-gold">20 Countries</span>
          </h2>
          <p className="text-[var(--muted)] font-body">
            Trusted by leading operators and independents worldwide
          </p>
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="flex gap-4 animate-[scroll_40s_linear_infinite] w-max">
            {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] text-sm font-medium hover:border-gold-400/40 hover:text-gold-400 transition-all duration-300 whitespace-nowrap"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
