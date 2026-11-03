/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f5f2',
          100: '#dce7e1',
          200: '#bbd0c5',
          300: '#91b1a1',
          400: '#698e7e',
          500: '#487160',
          600: '#34594a',
          700: '#2a473c',
          800: '#1b312a',
          900: '#0e2319',
          950: '#07130d',
        },
        moss: {
          50: '#f2f8f4',
          100: '#e1efe5',
          200: '#c5e0cd',
          300: '#9dcaaa',
          400: '#6ea880',
          500: '#4a8a60',
          600: '#386f4a',
          700: '#2d5a3f',
          800: '#264834',
          900: '#203c2c',
        },
        beige: {
          50: '#faf8f5',
          100: '#f4f0ea',
          200: '#ece6db',
          300: '#dcd3c3',
          400: '#c5b8a3',
          500: '#aa9982',
          600: '#8c7a65',
        },
        charcoal: {
          800: '#1e2621',
          900: '#111613',
          950: '#0b0f0d',
        },
        earth: {
          100: '#f5efea',
          300: '#c2a893',
          500: '#8c6d53',
          700: '#5c4533',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 9s ease-in-out 2s infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
