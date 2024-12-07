import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Cambia el puerto según tus necesidades
  },
  build: {
    sourcemap: false, // Desactiva los mapas de fuente
  },
})
