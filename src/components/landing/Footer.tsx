import Link from 'next/link'
import { NAV_ITEMS, CONTACT_INFO } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="font-display text-xl font-bold text-gradient-orange mb-2">
              PIEM GeoSolutions
            </div>
            <p className="text-steel-400 text-sm font-body leading-relaxed max-w-sm">
              Strategic alliance between PIEM Geosolutions LLC and Petro-Explorers for expert
              hydrocarbon solutions &mdash; integrating subsurface &amp; surface technologies.
            </p>
          </div>

          <div>
            <h4 className="text-xs text-orange-400 font-medium uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-steel-400 hover:text-orange-400 transition-colors font-body"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-orange-400 font-medium uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-steel-400 font-body">
              <p>{CONTACT_INFO.piem.phone}</p>
              <p>{CONTACT_INFO.petro.phone}</p>
              <a href="https://www.piemgeosolutions.com" className="hover:text-orange-400 transition-colors block">
                piemgeosolutions.com
              </a>
              <a href="https://www.petroexplorers.com" className="hover:text-orange-400 transition-colors block">
                petroexplorers.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-steel-500 font-body">
            &copy; {year} PIEM GeoSolutions LLC &amp; Petro-Explorers Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/login" className="text-xs text-steel-500 hover:text-orange-400 transition-colors">
              Admin Login
            </Link>
            <span className="text-steel-700">|</span>
            <span className="text-xs text-steel-500">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
