import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativo: o mesmo build funciona na Vercel (raiz) e no GitHub Pages (/Coworking/),
// já que as rotas usam HashRouter
export default defineConfig({
  plugins: [react()],
  base: './',
  // um único CSS: os estilos são globais e dependem da ordem (como no app original),
  // então não podem chegar picados conforme as páginas carregam
  build: { cssCodeSplit: false },
})
