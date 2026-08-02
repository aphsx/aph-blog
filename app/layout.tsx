import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LastPathTracker from "@/components/LastPathTracker";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getRequestLocale } from "@/lib/locale-server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aph's Blog",
  description:
    "Software notes and courses — from coding basics to interview prep",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-base leading-relaxed text-[#1c1e21] antialiased">
        <LocaleProvider initialLocale={locale}>
          <LastPathTracker />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
