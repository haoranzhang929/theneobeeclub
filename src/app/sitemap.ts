import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theneobee.club";

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/en/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/zh/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
