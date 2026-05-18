import type { Metadata } from "next";
import BookmarksPage from "./BookmarksPage";

export const metadata: Metadata = {
  title: "Your Bookmarks | Knowlet",

  description:
    "Access your saved notes, study materials, and bookmarked resources on Knowlet.",

  alternates: {
    canonical: "https://knowlet.in/bookmarks",
  },

  openGraph: {
    title: "Your Bookmarks | Knowlet",
    description: "Access your saved notes and study resources on Knowlet.",
    url: "https://knowlet.in/bookmarks",
    siteName: "Knowlet",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Your Bookmarks | Knowlet",
    description: "Access your saved notes and study resources on Knowlet.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <BookmarksPage />;
}
