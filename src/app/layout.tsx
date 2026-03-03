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
