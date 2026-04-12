/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F5C4C',
          dark: '#0A3F33',
        },
        accent: '#1B6E9E',
        surface: '#FFFFFF',
        background: '#F5F6F5',
        border: '#DCE1DE',
        text: {
          primary: '#12201C',
          secondary: '#5B6B65',
        },
        status: {
          success: '#1E8A5F',
          warning: '#B4750B',
          error: '#B3261E',
          info: '#3A6EA5',
        }
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '8px',
      }
    },
  },
  plugins: [],
}
