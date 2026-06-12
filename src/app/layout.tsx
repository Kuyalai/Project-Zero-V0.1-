import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";

import { AppShell } from "@/components/AppShell";

import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000"),
  title: {
    default: "Ramathibodi Nursing Council OS",
    template: "%s | Ramathibodi Nursing Council OS",
  },
  description: "เว็บไซต์ต้นแบบสำหรับ Ramathibodi Nursing Student Council สำหรับจัดการงาน เอกสาร และการส่งต่อข้อมูล",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ramathibodi Nursing Council OS",
    description: "เว็บไซต์ต้นแบบสำหรับ Ramathibodi Nursing Student Council",
    url: "/",
    siteName: "Ramathibodi Nursing Council OS",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramathibodi Nursing Council OS",
    description: "เว็บไซต์ต้นแบบสำหรับ Ramathibodi Nursing Student Council",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
