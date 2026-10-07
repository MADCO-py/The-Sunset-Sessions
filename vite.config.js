import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' hace que funcione en GitHub Pages sin importar el nombre del repo.
// La build sale en docs/, que es la carpeta que publica GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'docs', emptyOutDir: true },
})
