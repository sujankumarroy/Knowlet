"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import type { BriefResourceInfo } from "@/types/resource";
import type { ActionState } from "@/types/main";

import { useAuth } from "./AuthContext";
import { bookmarkResource, unbookmarkResource } from "@/actions/user/bookmark";
import { likeResource, unlikeResource } from "@/actions/user/like";
import { addViewHistory } from "@/actions/user/history";
import { getNearByResources } from "@/actions/resource";
import { getUserResourceStats } from "@/actions/user/resource";

type ReaderContextType = {
  resourceId: string | null;
  setResourceId: (resourceId: string | null) => void;

  like: ActionState;
  bookmark: ActionState;

  toggleLike: () => void;
  toggleBookmark: () => void;

  nearByResources: BriefResourceInfo[];
};

const ReaderContext = createContext<ReaderContextType | null>(null);

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [like, setLike] = useState<ActionState>("inactive");
  const [resourceId, setResourceId] = useState<string | null>(null);
  const [bookmark, setBookmark] = useState<ActionState>("inactive");
  const [nearByResources, setNearByResources] = useState<BriefResourceInfo[]>(
    [],
  );

  const { user } = useAuth();

  async function loadResStats() {
    try {
      if (!resourceId) return;
      const resourceStats = await getUserResourceStats(resourceId);

      setLike(resourceStats.liked ? "active" : "inactive");
      setBookmark(resourceStats.bookmarked ? "active" : "inactive");
    } catch {}
  }

  async function toggleLike() {
    if (!user) {
      toast.error("you are not signed in");
      return;
    }
    if (!resourceId) return;
    const currentLike = like;
    setLike("loading");
    try {
      if (currentLike === "active") {
        unlikeResource(resourceId);
        setLike("inactive");
      } else if (currentLike === "inactive") {
        likeResource(resourceId);
        setLike("active");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  async function toggleBookmark() {
    if (!user) {
      toast.error("you are not signed in");
      return;
    }
    if (!resourceId) return;
    const currentBookmark = bookmark;
    setBookmark("loading");
    try {
      if (currentBookmark === "active") {
        unbookmarkResource(resourceId);
        setBookmark("inactive");
      } else if (currentBookmark === "inactive") {
        bookmarkResource(resourceId);
        setBookmark("active");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  async function loadNearByResources() {
    if (nearByResources.some((r) => r.id === resourceId)) return;

    const path = window.location.pathname.replace("/library/", "");

    await getNearByResources(path)
      .then((value) =>
        setNearByResources(
          value.map((v) => ({ ...v, path: `/library/${v.path}` })),
        ),
      )
      .catch(() => setNearByResources([]));
  }

  useEffect(() => {
    if (!resourceId) return;

    const currentResourceId = resourceId;

    loadResStats();
    loadNearByResources();

    const timer = setTimeout(async () => {
      try {
        await addViewHistory(currentResourceId);
      } catch {}
    }, 10000);

    return () => clearTimeout(timer);
  }, [resourceId]);

  return (
    <ReaderContext.Provider
      value={{
        resourceId,
        setResourceId,
        like,
        bookmark,
        toggleLike,
        toggleBookmark,
        nearByResources,
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
