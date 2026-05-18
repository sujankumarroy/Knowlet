"use client";

import ListPageLayout from "@/components/layout/ListPageLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

type Bookmark = {
  id: string;
  created_at: string;
  resource: {
    id: string;
    title: string;
    description: string;
    path: string;
    created_at: string;
  };
};

export default function BookmarksPage() {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  async function fetchBookmarks() {
    try {
      setLoading(true);

      const res = await fetch("/api/bookmarks");

      if (!res.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const { data, error } = await res.json();

      if (error) throw new Error(error.message);

      setBookmarks(data || []);
    } catch (error) {
      toast.error((error as Error).message);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <ListPageLayout
      title="⭐ Your Bookmarks"
      subtitle="Quick Access to Key Units"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <TailSpin
            height={40}
            width={40}
            color="#f59e0b"
            ariaLabel="loading"
          />
          <p className="text-sm text-amber-600">Loading bookmarks...</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="p-6 text-center bg-gray-50 border border-gray-200 rounded-xl text-gray-600 italic">
          No bookmarks found
        </div>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-amber-200 rounded-xl hover:scale-[1.02] hover:shadow-md transition"
            >
              <a href={"library/" + item.resource.path} className="block">
                <h3 className="text-amber-700 font-semibold hover:text-amber-500">
                  {item.resource.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Viewed on {new Date(item.created_at).toLocaleString()}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </ListPageLayout>
  );
}
