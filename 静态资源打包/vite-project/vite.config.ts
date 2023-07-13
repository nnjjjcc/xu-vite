import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, "src/assets/icons")],
    }),
  ],
  resolve: {
    //别名
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
    },
  },
});
