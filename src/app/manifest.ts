import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kurs angielskiego online — diagnoza bariery, małe grupy",
    short_name: "Kurs angielskiego",
    description:
      "Kurs angielskiego online dla dorosłych w Polsce, którzy już próbowali się nauczyć — diagnoza konkretnej bariery mówienia, małe grupy dobrane pod cel, czterotygodniowe cykle.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f1f6",
    theme_color: "#4c3a8f",
    lang: "pl",
    icons: [
      { src: "/icons/app-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
