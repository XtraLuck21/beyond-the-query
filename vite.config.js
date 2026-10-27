import { env } from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // Keep local development at /; builds and previews use the Pages project path.
  base: command === 'build' || isPreview ? '/beyond-the-query/' : '/',
  plugins: [react()],
  server: {
    // Windows edits on /mnt/c can miss WSL file events; polling catches them.
    watch: { usePolling: Boolean(env.WSL_DISTRO_NAME) },
  },
}))
