import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "Comfy-Zvit",
        name: "Comfy-Zvit",
        icons: [
          {
            src: "icons/comfy-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/comfy-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
      injectRegister: "auto",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
