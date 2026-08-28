import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// HashRouter is used, so no SPA redirect config is needed on Netlify.
export default defineConfig({
  plugins: [react()],
  server: { port: 3456, strictPort: false },
  build: { outDir: 'dist', sourcemap: false },
})
