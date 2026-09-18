/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Run Nova Scotia Palette: #FEF000 (Sunbeam Yellow)
        volt: {
          DEFAULT: '#FEF000',
          50: '#fffee6',
          100: '#fffdb8',
          200: '#fffb80',
          300: '#fff847',
          400: '#fff41a',
          500: '#FEF000',
          600: '#E5D800',
          700: '#b8ad00',
          800: '#8c8400',
          900: '#5e5900',
        },
        gold: {
          DEFAULT: '#FEF000',
          light: '#fff666',
          dark: '#E5D800',
        },
        // Run Nova Scotia Palette: #0370B9 (Maritime Ocean Blue)
        ocean: {
          DEFAULT: '#0370B9',
          50: '#f0f7fc',
          100: '#dcedf8',
          200: '#bddfed',
          300: '#87c7e0',
          400: '#4da9d0',
          500: '#0370B9',
          600: '#025a96',
          700: '#024879',
          800: '#033d65',
          900: '#053355',
        },
        // Run Nova Scotia Palette: #64A1C9 (Ice / Sky Blue)
        ice: {
          DEFAULT: '#64A1C9',
          light: '#e3eff7',
          dark: '#4786b0',
        },
        // Run Nova Scotia Palette: #84A97F (Sage / Laurel Runner Accent)
        sage: {
          DEFAULT: '#84A97F',
          light: '#a4c4a0',
          dark: '#678d62',
        },
        // Deep Maritime Atlantic Black & Navy Base
        dark: {
          950: '#000000', // Pure Black
          900: '#040b17', // Rich Maritime Deep Navy/Black
          850: '#081426',
          800: '#0d1d36',
          750: '#142745',
          700: '#1d3558',
          650: '#27446e',
          600: '#345586',
          500: '#4870aa',
        }
      },
      fontFamily: {
        athletic: ['Oswald', 'sans-serif'],
        sans: ['Jost', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        marqueeReverse: 'marqueeReverse 28s linear infinite',
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
