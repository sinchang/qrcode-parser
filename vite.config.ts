import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    port: 3001,
  },
  build: {
    outDir: path.resolve(__dirname, 'example-dist'),
  },
})
