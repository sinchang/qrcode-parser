import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: 'src/index.ts',
    format: ["umd", "esm", "cjs"],
    exports: true,
    outputOptions: {
        name: 'qrcodeParser',
        globals: {
            'jsqr': 'jsQR'
        },
    },
    noExternal: ['jsqr'],
    minify: true,
    clean: true,
})