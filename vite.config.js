import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // host: true → aynı Wi-Fi'deki telefondan "Network" adresiyle açılabilir (QR testi için)
  server: { host: true },
  preview: { host: true },
})
