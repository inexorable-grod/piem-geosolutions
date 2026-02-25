import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ed',
          100: '#f9edcc',
          200: '#f2d98a',
          300: '#e8c04a',
          400: '#d4a520',
          500: '#b88a10',
          600: '#8f6a0c',
          700: '#6b4e0a',
          800: '#4a360a',
          900: '#2a1e05',
        },
        steel: {
          50:  '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#adb5bd',
          400: '#868e96',
          500: '#495057',
          600: '#343a40',
          700: '#212529',
          800: '#16191d',
          900: '#0d0f12',
        },
        dark: {
          bg:      '#0a0c0f',
          surface: '#111418',
          card:    '#161b22',
          border:  '#21262d',
          muted:   '#8b949e',
        },
        petroleum: '#1a4a6b',
        seismic:   '#2d7a4a',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body:    ['Outfit', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer':      'linear-gradient(135deg, #d4a520 0%, #f2d98a 50%, #d4a520 100%)',
        'dark-mesh':         'radial-gradient(ellipse at 20% 50%, rgba(212,165,32,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(26,74,107,0.1) 0%, transparent 60%)',
        'seismic-pattern':   "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a520' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-out forwards',
        'slide-up':      'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right':   'slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gold-pulse':    'goldPulse 3s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'counter':       'counter 2s ease-out forwards',
        'scan-line':     'scanLine 4s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight:{ from: { opacity: '0', transform: 'translateX(-40px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,165,32,0)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(212,165,32,0.15)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%':   { top: '0%', opacity: '0.8' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
      boxShadow: {
        'gold':       '0 0 20px rgba(212,165,32,0.25), 0 4px 15px rgba(0,0,0,0.3)',
        'gold-lg':    '0 0 40px rgba(212,165,32,0.35), 0 8px 30px rgba(0,0,0,0.4)',
        'card-dark':  '0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.6)',
        'inset-gold': 'inset 0 1px 0 rgba(212,165,32,0.2)',
      },
    },
  },
  plugins: [],
}

export default config
