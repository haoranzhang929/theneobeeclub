import Navbar from "@/components/Navbar";
import { works } from "@/data/works";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  console.log("WorksPage - Current locale:", locale);
  console.log("WorksPage - Sample translation test:", t("works.title"));

  return (
    <>
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
              console.log("work.title:", work.title, "=>", title);
              console.log("work.description:", work.description, "=>", description);
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
