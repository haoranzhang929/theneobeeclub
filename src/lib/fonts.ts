import { useLocale } from "next-intl";

/**
 * Hook to get locale-specific font classes
 */
export function useLocaleFonts() {
  const locale = useLocale();

  return {
    // Body text font - use Noto Sans SC for Chinese, Montserrat for English
    body: locale === "zh" ? "font-noto-sans-sc" : "font-montserrat",

    // Display font (headings) - handled by CSS with fallbacks
    display: "font-display",

    // Get appropriate font weight classes for Chinese vs English
    getWeights: (english: string, chinese?: string) => {
      return locale === "zh" ? chinese || english : english;
    }
  };
}

/**
 * Get font classes for specific locale without hook (for server components)
 */
export function getLocaleFonts(locale: string) {
  return {
    body: locale === "zh" ? "font-noto-sans-sc" : "font-montserrat",
    display: "font-display",
    getWeights: (english: string, chinese?: string) => {
      return locale === "zh" ? chinese || english : english;
    }
  };
}
