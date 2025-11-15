import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const moduleExclude = match => {
  const m = (id: string) => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id: string) {
      if (m(id)) return id
    },
    load(id: string) {
      if (m(id)) return `export default {}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/then',
      'gun/lib/webrtc',
      'gun/lib/radix',
      'gun/lib/radisk',
      'gun/lib/store',
      'gun/lib/rindexed',
    ],
  },
  plugins: [react(), tailwindcss(), moduleExclude('text-encoding'),],
})
