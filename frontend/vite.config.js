import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { config } from 'dotenv'

// https://vitejs.dev/config/
// config()


export default defineConfig({
  plugins: [react()],
  // define: {
  //   'process.env': process.env
  // }
})
