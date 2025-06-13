import { artists } from "@/data/artists";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theneobee.club";

  // 生成图像sitemap XML
  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- 主页图像 -->
  <url>
    <loc>${baseUrl}/en</loc>
    <image:image>
      <image:loc>${baseUrl}/logo.webp</image:loc>
      <image:title>The NeoBee Club Logo</image:title>
      <image:caption>Official logo of The NeoBee Club - Dublin Music Collective</image:caption>
    </image:image>
    ${artists
      .map(
        (artist) => `
    <image:image>
      <image:loc>${baseUrl}${artist.imageUrl}</image:loc>
      <image:title>${artist.name} - The NeoBee Club Artist</image:title>
      <image:caption>${artist.name} profile photo - Member of The NeoBee Club music collective</image:caption>
    </image:image>`
      )
      .join("")}
  </url>

  <!-- 中文主页图像 -->
  <url>
    <loc>${baseUrl}/zh</loc>
    <image:image>
      <image:loc>${baseUrl}/logo.webp</image:loc>
      <image:title>The NeoBee Club 标志</image:title>
      <image:caption>The NeoBee Club 官方标志 - 都柏林音乐团体</image:caption>
    </image:image>
    ${artists
      .map(
        (artist) => `
    <image:image>
      <image:loc>${baseUrl}${artist.imageUrl}</image:loc>
      <image:title>${artist.name} - The NeoBee Club 艺术家</image:title>
      <image:caption>${artist.name} 个人照片 - The NeoBee Club 音乐团体成员</image:caption>
    </image:image>`
      )
      .join("")}
  </url>

  <!-- Works页面图像 (视频缩略图) -->
  <url>
    <loc>${baseUrl}/en/works</loc>
    <image:image>
      <image:loc>https://img.youtube.com/vi/unfvfyO3lOk/maxresdefault.jpg</image:loc>
      <image:title>Jazz House Mix with Live Guitar Performance</image:title>
      <image:caption>Video thumbnail for The NeoBee Club's immersive jazzy house mix featuring live guitar improvisation</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://img.youtube.com/vi/eVjDLGp4xY8/maxresdefault.jpg</image:loc>
      <image:title>Funky House Mix with Live Guitar Performance</image:title>
      <image:caption>Video thumbnail for The NeoBee Club's immersive soulful house mix featuring live guitar improvisation</image:caption>
    </image:image>
  </url>

  <!-- 中文Works页面图像 -->
  <url>
    <loc>${baseUrl}/zh/works</loc>
    <image:image>
      <image:loc>https://img.youtube.com/vi/unfvfyO3lOk/maxresdefault.jpg</image:loc>
      <image:title>Jazzy House混音配现场吉他表演</image:title>
      <image:caption>The NeoBee Club 沉浸式爵士House音乐视频缩略图，融合现场吉他即兴演奏</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://img.youtube.com/vi/eVjDLGp4xY8/maxresdefault.jpg</image:loc>
      <image:title>Funky House混音配现场吉他表演</image:title>
      <image:caption>The NeoBee Club 沉浸式灵魂爵士House音乐视频缩略图，融合现场吉他即兴演奏</image:caption>
    </image:image>
  </url>

</urlset>`;

  return new Response(imageSitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}
