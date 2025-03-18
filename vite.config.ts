import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // Configuración para evitar el error con los workers
        format: 'es', // Usa el formato ESModules para evitar problemas con IIFE
      },
    },
  },
  worker: {
    format: 'es', // Configura los workers para usar ESModules
  },
})
