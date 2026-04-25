import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Zaya Design Studio",
    template: "%s | Zaya Design Studio",
  },
  description:
    "Zaya Design Studio — projektowanie ogrodów i wnętrz w Jeleniej Górze i okolicach.",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Zaya Design Studio",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased bg-white text-stone-800">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
