import type { Metadata } from "next";
import NexusPage from "@/components/nexus/NexusPage";

export const metadata: Metadata = {
  title: "Nexus AI | Knowlet",

  description:
    "Ask questions, explore concepts, and get AI-powered academic assistance with Nexus AI on Knowlet.",

  alternates: {
    canonical: "https://knowlet.in/nexus",
  },

  openGraph: {
    title: "Nexus AI | Knowlet",
    description:
      "AI-powered learning assistant for notes, concepts, and academic help on Knowlet.",
    url: "https://knowlet.in/nexus",
    siteName: "Knowlet",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexus AI | Knowlet",
    description:
      "AI-powered learning assistant for notes, concepts, and academic help on Knowlet.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Nexus() {
  return (
    <div className="h-[calc(100dvh-120px)]">
      <NexusPage />
    </div>
  );
}
