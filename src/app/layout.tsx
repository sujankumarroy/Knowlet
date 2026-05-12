import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { HeaderProvider } from "@/context/HeaderContext";

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
      <body className="h-dvh py-15 box-border overflow-hidden bg-gray-100">
        <HeaderProvider>
          <div className="flex h-full flex-col">
            <TopBar />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto h-full w-full max-w-3xl ">{children}</div>
            </main>
            <BottomNav />
          </div>
        </HeaderProvider>
      </body>
    </html>
  );
}
