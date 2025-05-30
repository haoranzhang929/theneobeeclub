import "../app/globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`scroll-smooth ${montserrat.className}`}
      style={{ "--font-playfair": playfair.style.fontFamily } as React.CSSProperties}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="bg-black text-white min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
