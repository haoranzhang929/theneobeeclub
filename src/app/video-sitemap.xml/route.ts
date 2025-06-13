import { works } from "@/data/works";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theneobee.club";

  // 生成视频sitemap XML
  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${works
  .map((work, index) => {
    const videoId = work.src.match(/youtube\.com\/embed\/([^?]+)/)?.[1] || "";
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const playerUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return `
  <!-- 英文页面视频 -->
  <url>
    <loc>${baseUrl}/en/works#video-${index}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${work.title
        .replace(/_/g, " ")
        .replace(/title|v\d+/g, "")
        .trim()}</video:title>
      <video:description>The NeoBee Club - ${work.description
        .replace(/_/g, " ")
        .replace(/description|v\d+/g, "")
        .trim()}</video:description>
      <video:content_loc>${playerUrl}</video:content_loc>
      <video:player_loc>${work.src}</video:player_loc>
      <video:duration>${work.duration ? convertISO8601ToSeconds(work.duration) : 300}</video:duration>
      <video:publication_date>${work.uploadDate || "2024-01-01"}T00:00:00Z</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
      <video:tag>${work.tags?.join(", ") || "music, house, electronic"}</video:tag>
      <video:category>Music</video:category>
      <video:uploader info="${baseUrl}">The NeoBee Club</video:uploader>
    </video:video>
    <lastmod>${work.uploadDate || "2024-01-01"}T00:00:00Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 中文页面视频 -->
  <url>
    <loc>${baseUrl}/zh/works#video-${index}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>The NeoBee Club - ${work.title
        .replace(/_/g, " ")
        .replace(/title|v\d+/g, "")
        .trim()}</video:title>
      <video:description>The NeoBee Club 音乐作品 - ${work.description
        .replace(/_/g, " ")
        .replace(/description|v\d+/g, "")
        .trim()}</video:description>
      <video:content_loc>${playerUrl}</video:content_loc>
      <video:player_loc>${work.src}</video:player_loc>
      <video:duration>${work.duration ? convertISO8601ToSeconds(work.duration) : 300}</video:duration>
      <video:publication_date>${work.uploadDate || "2024-01-01"}T00:00:00Z</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
      <video:tag>${work.tags?.join(", ") || "music, house, electronic"}</video:tag>
      <video:category>Music</video:category>
      <video:uploader info="${baseUrl}">The NeoBee Club</video:uploader>
    </video:video>
    <lastmod>${work.uploadDate || "2024-01-01"}T00:00:00Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

  return new Response(videoSitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}

// 将ISO 8601时长格式转换为秒数
function convertISO8601ToSeconds(duration: string): number {
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 300; // 默认5分钟

  const minutes = parseInt(match[1] || "0");
  const seconds = parseInt(match[2] || "0");
  return minutes * 60 + seconds;
}
