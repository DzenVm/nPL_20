import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/jak-uczymy", priority: 0.7, changeFrequency: "yearly" },
  { path: "/dla-firm", priority: 0.7, changeFrequency: "yearly" },
  { path: "/kontakt", priority: 0.6, changeFrequency: "yearly" },
  { path: "/polityka-prywatnosci", priority: 0.3, changeFrequency: "yearly" },
  { path: "/regulamin", priority: 0.3, changeFrequency: "yearly" },
  { path: "/polityka-cookies", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
