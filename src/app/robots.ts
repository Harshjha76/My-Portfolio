import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/owner", "/api/owner", "/api/portfolio?mode=owner"],
    },
    sitemap: "https://harshjha.dev/sitemap.xml",
  };
}
