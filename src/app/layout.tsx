import type { Metadata } from "next";
import { Oi, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oi = Oi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-oi",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Tom Varano — Software Engineer",
  description:
    "Portfolio of Thomas Varano, software engineer. UMD CS grad, former Apple intern.",
  metadataBase: new URL("https://tomvarano.com"),
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png" },
      { url: "/favicons/apple-touch-icon-60x60.png",  sizes: "60x60" },
      { url: "/favicons/apple-touch-icon-76x76.png",  sizes: "76x76" },
      { url: "/favicons/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/favicons/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/favicons/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      { rel: "manifest", url: "/favicons/site.webmanifest" },
      { rel: "mask-icon", url: "/favicons/safari-pinned-tab.svg", color: "#006D77" },
    ],
  },
  openGraph: {
    title: "Tom Varano — Software Engineer",
    description: "Portfolio of Thomas Varano, software engineer.",
    url: "https://tomvarano.com",
    siteName: "Tom Varano",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oi.variable} ${dmMono.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
