import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@icons": fileURLToPath(
        new URL("./src/assets/icons", import.meta.url + "?react")
      ),
    },
  },
});
