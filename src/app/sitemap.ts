import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://harshjha.dev";
  const routes = [
    "",
    "/about",
    "/education",
    "/academics",
    "/projects",
    "/experience",
    "/certifications",
    "/learning",
    "/achievements",
    "/resume",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/projects" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
