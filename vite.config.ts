import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Static build for GitHub Pages: every route is prerendered to HTML at build time,
// so no server runtime is required in production.
export default defineConfig({
  server: { port: 8080 },
  resolve: { tsconfigPaths: true, dedupe: ["react", "react-dom", "@tanstack/react-router"] },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [{ path: "/" }],
    }),
    viteReact(),
  ],
});
