import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Kept as `build` (not Vite's default `dist`) so the existing Vercel
    // deployment contract from the create-react-app setup keeps working.
    outDir: 'build',
    sourcemap: false,
    // The lazily loaded WebGL chunk is legitimately large; warn later than default.
    chunkSizeWarningLimit: 1400,
  },
  server: {
    host: true,
    port: 3000,
  },
})
