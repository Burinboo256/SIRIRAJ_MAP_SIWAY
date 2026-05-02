import type { Metadata } from "next";

import { AppProviders } from "@/components/providers/app-providers";
import { Header } from "@/components/layout/header";
import { EmergencyButton } from "@/components/layout/emergency-button";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIRIRAJ MAP SIWAY",
  description: "Hospital wayfinding PWA for elderly and first-time visitors",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full bg-slate-100 text-slate-900">
        <AppProviders>
          <a href="#main-content" className="skip-link">
            ข้ามไปยังเนื้อหาหลัก
          </a>
          <Header />
          <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-5">
            {children}
          </main>
          <EmergencyButton />
        </AppProviders>
      </body>
    </html>
  );
}
