import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
