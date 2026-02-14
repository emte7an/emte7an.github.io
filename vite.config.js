import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/basic/' : '/',
  define: {
    'process.env': {},
    'global': {},
  },
  resolve: {
    alias: {
      'events': 'events',
    },
  },
}))
