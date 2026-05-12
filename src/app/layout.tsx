import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Knowlet – Notes & Study Materials",
  description:
    "Free notes and study materials for college students. Download study materials for Mathematics, Physics, Computer Science, Statistics, Alternative English, Economics, Political Science, Education, Zoology, Botany, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh overflow-hidden bg-white">
        <div className="flex h-full flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-4 py-3">{children}</div>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
