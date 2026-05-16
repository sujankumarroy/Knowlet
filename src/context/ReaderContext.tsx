"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

type ReaderContextType = {
  resourceId: string | null;
  setResourceId: (resourceId: string | null) => void;

  liked: boolean;
  bookmarked: boolean;

  toggleLike: () => void;
  toggleBookmark: () => void;

  next: () => void;
  prev: () => void;
};

const ReaderContext = createContext<ReaderContextType | null>(null);

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [liked, setLiked] = useState(false);
  const [resourceId, setResourceId] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (resourceId) loadResStats();
  }, [resourceId]);

  async function loadResStats() {
    try {
      const res = await fetch("/api/resources/stats", {
        method: "POST",
        body: JSON.stringify({ resource_id: resourceId }),
      });
      const { data, error } = await res.json();
      if (error || !data) console.error("error", error);
      setLiked(data.liked);
      setBookmarked(data.bookmarked);
    } catch (error) {
      console.error("error", error);
    }
  }

  async function toggleLike() {
    if (!user) {
      toast({ type: "info", title: "you are not signed in" });
      return;
    }
    setLiked((prev) => !prev);
    try {
      const res = await fetch("/api/likes/toggle", {
        method: "POST",
        body: JSON.stringify({ resource_id: resourceId }),
      });
      const { data, error } = await res.json();
      if (error) console.error("error", error);
    } catch (error) {
      console.error("error", error);
    }
  }

  async function toggleBookmark() {
    if (!user) {
      toast({ type: "info", title: "you are not signed in" });
      return;
    }
    setBookmarked((prev) => !prev);
    try {
      const res = await fetch("/api/bookmarks/toggle", {
        method: "POST",
        body: JSON.stringify({ resource_id: resourceId }),
      });
      const { data, error } = await res.json();
      if (error) console.error("error", error);
    } catch (error) {
      console.error("error", error);
    }
  }

  function next() {
    console.log("next");
  }

  function prev() {
    console.log("prev");
  }

  return (
    <ReaderContext.Provider
      value={{
        resourceId,
        setResourceId,
        liked,
        bookmarked,
        toggleLike,
        toggleBookmark,
        next,
        prev,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}

export function useReader() {
  const ctx = useContext(ReaderContext);

  if (!ctx) {
    throw new Error("useReader must be used inside ReaderProvider");
  }

  return ctx;
}
