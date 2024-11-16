import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "netlify",
  },
  middleware: "./src/middleware.ts",
});
