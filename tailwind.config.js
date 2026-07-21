/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#7c9cfa',
          500: '#1b3a6b',
          600: '#152e55',
          700: '#102340',
          800: '#0a172b',
          900: '#050c16',
          950: '#02060b',
        },
        gold: {
          50: '#fffcf0',
          100: '#fff5d4',
          200: '#ffe9a8',
          300: '#ffda70',
          400: '#ffc838',
          500: '#e6a817',
          600: '#c48a10',
          700: '#9c6b0c',
          800: '#745008',
          900: '#4c3505',
        },
        maroon: {
          50: '#fef2f2',
          100: '#fde3e3',
          200: '#fcc9c9',
          300: '#f9a3a3',
          400: '#f47070',
          500: '#8b1a1a',
          600: '#721515',
          700: '#591010',
          800: '#400b0b',
          900: '#280707',
        },
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #0a172b 0%, #1b3a6b 50%, #152e55 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 12px 36px rgba(0,0,0,0.08)',
        'elevated': '0 20px 60px -15px rgba(0,0,0,0.1)',
        'glow-gold': '0 0 40px rgba(230, 168, 23, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
