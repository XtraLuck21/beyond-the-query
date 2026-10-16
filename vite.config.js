import { env } from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Windows edits on /mnt/c can miss WSL file events; polling catches them.
    watch: { usePolling: Boolean(env.WSL_DISTRO_NAME) },
  },
})
