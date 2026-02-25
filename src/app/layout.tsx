import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: 'PIEM GeoSolutions | Expert Hydrocarbon Solutions',
  description:
    'Joint venture between PIEM Geosolutions LLC and Petro-Explorers. 20+ years integrating geoscience, engineering & AI technology for the hydrocarbon industry. 150+ projects in 20 countries.',
  keywords: [
    'PIEM GeoSolutions',
    'Petro-Explorers',
    'reservoir characterization',
    'seismic interpretation',
    'oil gas consulting',
    'hydrocarbon',
    'geoscience',
  ],
  authors: [{ name: 'PIEM GeoSolutions LLC' }],
  openGraph: {
    title: 'PIEM GeoSolutions | Expert Hydrocarbon Solutions',
    description: 'Strategic alliance for advanced reservoir characterization and integral hydrocarbon solutions.',
    type: 'website',
    url: 'https://piemgeosolutions.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
