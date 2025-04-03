import { defineConfig, rollupVersion } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
    // "build:
  build: {
    target: ["node12", "es2020"],
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: "websemaphore",
      formats: ["es",'cjs','umd'],
      fileName: "index"
    },
    sourcemap: 'inline',
    // rollupOptions: {
    //   // external: ['react'],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       vue: 'react',
    //     },
    //   },
    // }
  }
})
