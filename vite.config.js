import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Split React and React-DOM into a separate chunk
          react: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: Increase the chunk size warning limit
  },
});
