import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  imports: false,
  manifest: {
    name: "Knowlink Web Clipper",
    permissions: ["storage"],
  },
  dev: {
    server: {
      port: 4000,
    },
  },
  vite: () => {
    return {
      plugins: [tailwindcss()],
    };
  },
});
