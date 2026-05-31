import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aph's Blog",
  description:
    "บันทึกและคอร์สเรียนด้านการพัฒนาซอฟต์แวร์ ภาษาไทย — ตั้งแต่เขียนโปรแกรมจากศูนย์จนถึงเตรียมสัมภาษณ์งาน",
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
