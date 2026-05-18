import { Metadata } from "next";
import HistoryPage from "./HistoryPage";

export const metadata: Metadata = {
  title: "Reading History | Knowlet",

  description:
    "View your recently accessed notes, study materials, and learning resources on Knowlet.",

  alternates: {
    canonical: "https://knowlet.in/history",
  },

  openGraph: {
    title: "Reading History | Knowlet",
    description:
      "Track your recently viewed notes and study resources on Knowlet.",
    url: "https://knowlet.in/history",
    siteName: "Knowlet",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Reading History | Knowlet",
    description:
      "Track your recently viewed notes and study resources on Knowlet.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <HistoryPage />;
}
