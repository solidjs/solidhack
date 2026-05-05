import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "cloudflare_module",
  },
  middleware: "./src/middleware.ts",
});
