import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = withNextIntl({
  // SEO optimizations
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // Headers for SEO and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          }
        ]
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400"
          }
        ]
      }
    ];
  }
});

export default nextConfig;
