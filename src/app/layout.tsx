import type { Metadata } from "next";
import "@/styles/resource-content.css";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { AppProvider } from "@/context/AppContext";
import SWRegister from "@/components/SWRegister";
import AdSense from "@/components/AdSense";
import Footer from "@/components/Footer";
import Toaster from "@/components/Toaster";

export const metadata: Metadata = {
  title: "Knowlet – Notes & Study Materials",
  description:
    "Free notes and study materials for college students. Download study materials for Mathematics, Physics, Computer Science, Statistics, Alternative English, Economics, Political Science, Education, Zoology, Botany, and more.",
  manifest: "/manifest.json",
  verification: {
    google: "MyH_ZXmYfE8D3u5iHa7tODNYysPhybxM7dWcc5i3nSI",
  },
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#f7f8fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Knowlet",
    url: "https://knowlet.in",
    description:
      "Free study materials and educational resources for college students.",
  };

  return (
    <html lang="en">
      <head>
        <AdSense />
      </head>

      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        <AppProvider>
          <div className="flex min-h-dvh flex-col">
            <TopBar />

            <main className="flex-1 pt-15">{children}</main>

            <Footer />

            <BottomNav />
          </div>

          <SWRegister />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
