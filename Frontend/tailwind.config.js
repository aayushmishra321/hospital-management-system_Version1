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
                    DEFAULT: '#0F5C4C', // Deep clinical teal-green
                    dark: '#0A3F33',    // Hover & dark background
                },
                accent: '#1B6E9E',      // Slate blue
                surface: '#FFFFFF',     // Flat white card surface
                background: '#F5F6F5',  // Neutral warm-gray background
                border: '#DCE1DE',      // Divider line color
                text: {
                    primary: '#12201C',   // Headings & primary body
                    secondary: '#5B6B65', // Subtitles & metadata
                },
                status: {
                    success: '#1E8A5F',   // Paid / Confirmed
                    warning: '#B4750B',   // Pending / Waiting
                    error: '#B3261E',     // Overdue / Cancelled
                    info: '#3A6EA5',      // Informational banners
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