import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "cloudflare_module",
    compatibilityDate: "2024-09-19",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  middleware: "./src/middleware.ts",
});
