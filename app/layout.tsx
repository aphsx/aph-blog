import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SE Interview Roadmap — คู่มือเตรียมสัมภาษณ์ Software Engineer",
  description:
    "คู่มือเตรียมตัวสมัครงาน Software Engineer ตั้งแต่ศูนย์จนถึงรับ offer ภาษาไทย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-base leading-relaxed text-[#1c1e21] antialiased">
        {children}
      </body>
    </html>
  );
}
