import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react({
    jsxRuntime: "classic"
  })],
  server: {
  proxy: {
    "/nguoi-dung": "http://localhost:8000/",
    "/phong-tro": "http://localhost:8000/",
    "/trang-chu": "http://localhost:8000/",
  }
}
})
