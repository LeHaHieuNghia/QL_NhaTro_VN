import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000/",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/phong-tro": "http://localhost:8000/",
      // "/trang-chu": "http://localhost:8000/",
    },
  },
});
