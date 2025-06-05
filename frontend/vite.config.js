import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true,
    strictPort: true
  },
  test:{
    globals:true,
    environment: 'jsdom',
    setupFiles: './setupTests.js'
},
  
  build: {
    outDir: 'dist'
  }
})
