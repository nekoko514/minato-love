/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minato: {
           dark: '#0a0a0a',
           panel: '#111111',
           accent: '#00ff41', // Matrix green/terminal
           text: '#e5e5e5',
           dim: '#404040',
           error: '#ff3333',
        },
        neneko: {
          light: '#fff0f5', // Lavender blush / Neneko's pink
          pink: '#ffb7c5',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'], // Hacker vibes
      }
    },
  },
  plugins: [],
}
