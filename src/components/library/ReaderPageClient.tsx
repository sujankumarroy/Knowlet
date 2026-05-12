"use client";

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

export default function ReaderPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setHeaderMode } = useApp();

  useEffect(() => {
    setHeaderMode("reader");

    return () => {
      setHeaderMode("home");
    };
  }, []);

  return children;
}
