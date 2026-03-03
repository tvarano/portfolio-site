import type { Metadata } from "next";
import { Caveat, Patrick_Hand, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick-hand",
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
      className={`${inter.variable} ${caveat.variable} ${patrickHand.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
