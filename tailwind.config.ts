import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#C9A84C',
          light: '#E8C96B',
          dark:  '#A07838',
        },
        luxury: {
          black:   '#080808',
          dark:    '#0F0F0F',
          card:    '#141414',
          border:  '#222222',
          muted:   '#888888',
        },
      },
      fontFamily: {
        display:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:     ['var(--font-jost)', 'system-ui', 'sans-serif'],
        accent:   ['var(--font-marcellus)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient':     'linear-gradient(135deg, #C9A84C 0%, #E8C96B 50%, #C9A84C 100%)',
        'dark-gradient':     'linear-gradient(180deg, #080808 0%, #141414 100%)',
        'card-gradient':     'linear-gradient(145deg, #141414 0%, #1a1a1a 100%)',
        'hero-gradient':     'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.8) 60%, #080808 100%)',
        'shimmer':           'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 50%, transparent 100%)',
      },
      animation: {
        'shimmer':          'shimmer 2.5s infinite',
        'float':            'float 6s ease-in-out infinite',
        'pulse-gold':       'pulse-gold 2s ease-in-out infinite',
        'fade-up':          'fadeUp 0.6s ease-out forwards',
        'slide-in-right':   'slideInRight 0.5s ease-out forwards',
        'scale-in':         'scaleIn 0.4s ease-out forwards',
        'ticker':           'ticker 30s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'gold':        '0 0 30px rgba(201,168,76,0.2)',
        'gold-hover':  '0 0 50px rgba(201,168,76,0.35)',
        'card':        '0 8px 32px rgba(0,0,0,0.5)',
        'card-hover':  '0 16px 48px rgba(0,0,0,0.7), 0 0 20px rgba(201,168,76,0.1)',
      },
    },
  },
  plugins: [],
}
export default config
