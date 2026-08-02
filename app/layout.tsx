import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LastPathTracker from "@/components/LastPathTracker";
import { LocaleProvider } from "@/components/LocaleProvider";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-base leading-relaxed text-[#1c1e21] antialiased">
        <LocaleProvider>
          <LastPathTracker />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
