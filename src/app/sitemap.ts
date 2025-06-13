import { MetadataRoute } from "next";
import { works } from "@/data/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theneobee.club";

  // 根据最新视频上传日期确定works页面的lastModified
  const latestVideoDate = works.reduce((latest, work) => {
    const workDate = new Date(work.uploadDate || "2024-01-01");
    return workDate > latest ? workDate : latest;
  }, new Date("2024-01-01"));

  // 主要页面
  const mainPages: MetadataRoute.Sitemap = [
    // 主页 - 英文
    {
      url: `${baseUrl}/en`,
      lastModified: new Date("2025-01-15"), // 网站最近更新日期
      changeFrequency: "weekly",
      priority: 1
    },
    // 主页 - 中文
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date("2025-01-15"), // 网站最近更新日期
      changeFrequency: "weekly",
      priority: 1
    },
    // Works页面 - 英文
    {
      url: `${baseUrl}/en/works`,
      lastModified: latestVideoDate,
      changeFrequency: "monthly",
      priority: 0.9 // 提高优先级，因为包含视频内容
    },
    // Works页面 - 中文
    {
      url: `${baseUrl}/zh/works`,
      lastModified: latestVideoDate,
      changeFrequency: "monthly",
      priority: 0.9 // 提高优先级，因为包含视频内容
    }
  ];

  // 为每个视频创建虚拟页面条目（用于SEO）
  const videoPages: MetadataRoute.Sitemap = works.flatMap((work, index) => {
    const videoDate = new Date(work.uploadDate || "2024-01-01");

    return [
      // 英文视频页面条目
      {
        url: `${baseUrl}/en/works#video-${index}`,
        lastModified: videoDate,
        changeFrequency: "yearly" as const,
        priority: 0.7
      },
      // 中文视频页面条目
      {
        url: `${baseUrl}/zh/works#video-${index}`,
        lastModified: videoDate,
        changeFrequency: "yearly" as const,
        priority: 0.7
      }
    ];
  });

  return [...mainPages, ...videoPages];
}
