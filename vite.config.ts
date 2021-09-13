import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    outDir: path.resolve(__dirname, 'example-dist')
  }
});
