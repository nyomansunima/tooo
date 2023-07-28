import tailwindcssForm from '@tailwindcss/forms'
import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio'
import tailwindcssTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    extend: {
      colors: {
        black: '#0C0D10',
        brand: {
          blue: '#1C23F6',
        },
      },
    },
  },
  plugins: [tailwindcssForm, tailwindcssAspectRatio, tailwindcssTypography],
}
