import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // Evita que o Vitest tente rodar os arquivos de teste do Playwright
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'], 
  },
})