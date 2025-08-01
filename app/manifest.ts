import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Latif Voice Companion",
    short_name: "Latif Companion",
    description: "AI-powered Sindhi poetry companion for Shah Jo Risalo",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "books", "culture"],
    lang: "en",
    orientation: "portrait-primary",
  }
}
