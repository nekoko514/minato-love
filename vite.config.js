import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Enable relative paths for flexible deployment (e.g., GitHub Pages)
  base: './',
})
