import { defineConfig } from "vite";
import testHookPlugin from "./test-hooks-plugin";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), testHookPlugin()],
});
