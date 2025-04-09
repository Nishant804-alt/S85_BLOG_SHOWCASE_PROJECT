// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // If you're using React
// import vue from '@vitejs/plugin-vue' // Uncomment this if using Vue.js
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    react(), // If you're using React
    // vue() // Uncomment this if using Vue.js
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Use the imported Tailwind CSS plugin
        autoprefixer(), // Use the imported Autoprefixer plugin
      ],
    },
  },
})
