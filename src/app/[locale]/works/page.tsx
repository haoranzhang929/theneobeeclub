import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import { works } from "@/data/works";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const title = messages.works.title;
  const description = `${messages.works.jazzy_house_description_v2} ${messages.works.funky_house_description_v1}`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theneobee.club";

  return {
    title: `${title} | The NeoBee Club`,
    description: description.slice(0, 160),
    keywords: [
      "music works",
      "house music",
      "jazzy house",
      "funky house",
      "live guitar",
      "electronic music",
      "The NeoBee Club",
      "Dublin music"
    ],
    openGraph: {
      title: `${title} | The NeoBee Club`,
      description: description.slice(0, 160),
      url: `${baseUrl}/${locale}/works`,
      siteName: "The NeoBee Club",
      images: [
        {
          url: "/logo.webp",
          width: 1200,
          height: 630,
          alt: "The NeoBee Club Works Collection"
        }
      ],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | The NeoBee Club`,
      description: description.slice(0, 160),
      images: ["/logo.webp"]
    },
    alternates: {
      canonical: `/${locale}/works`,
      languages: {
        en: "/en/works",
        zh: "/zh/works"
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  // Generate structured data for video collection
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("works.title"),
    description: t("works.jazzy_house_description_v2"),
    url: `https://theneobee.club/${locale}/works`,
    mainEntity: {
      "@type": "VideoGallery",
      "@id": `https://theneobee.club/${locale}/works#videos`,
      name: t("works.title"),
      description: "Complete collection of The NeoBee Club's music videos and performances",
      video: works.map((work, idx) => {
        const videoId = work.src.match(/youtube\.com\/embed\/([^?]+)/)?.[1] || "";
        return {
          "@type": "VideoObject",
          "@id": `https://theneobee.club/${locale}/works#video-${idx}`,
          name: t(`works.${work.title}`),
          description: t(`works.${work.description}`),
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          embedUrl: work.src,
          uploadDate: work.uploadDate || "2024-01-01",
          duration: work.duration || "PT5M",
          keywords: work.tags?.join(", ") || "music, electronic, house",
          publisher: {
            "@type": "Organization",
            name: "The NeoBee Club",
            logo: {
              "@type": "ImageObject",
              url: "https://theneobee.club/logo.webp"
            }
          }
        };
      })
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://theneobee.club/${locale}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t("works.title"),
          item: `https://theneobee.club/${locale}/works`
        }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Banner />
      <Navbar />
      <main className="relative min-h-screen pt-32 overflow-hidden">
        <div className="fixed inset-0 z-0 animate-gradient bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 opacity-80 pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-black z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-20">
          <h1 className="font-display text-4xl font-bold mb-10 text-center">{t("works.title")}</h1>
          <div className="space-y-12">
            {works.map((work, idx) => {
              const title = t(`works.${work.title}`);
              const description = t(`works.${work.description}`);
              return (
                <div key={idx} className="bg-gray-900 rounded-lg shadow-lg p-6">
                  <h2 className="font-display text-2xl font-bold mb-2">{title}</h2>
                  <p className="mb-4 text-gray-300">{description}</p>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={work.src}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
