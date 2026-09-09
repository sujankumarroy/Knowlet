"use client";

import { Toaster as _Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function Toaster() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
    };

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <_Toaster
      position={isMobile ? "bottom-center" : "top-right"}
      richColors
      toastOptions={{
        classNames: {
          toast: `${isMobile ? "mb-15" : "mt-15"} rounded-2xl border border-border bg-card text-foreground shadow-lg sm:mx-0 dark:bg-card`,
          title: "text-sm font-semibold",
          description: "text-sm text-muted-foreground",
          success: "border-green-600 dark:border-green-400",
          error: "border-red-600 dark:border-red-400",
          warning: "border-yellow-600 dark:border-yellow-400",
          info: "border-blue-600 dark:border-blue-400",
        },
      }}
    />
  );
}
