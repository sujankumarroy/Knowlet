"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function AppToaster() {
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
    <Toaster
      position={isMobile ? "bottom-center" : "top-right"}
      richColors
      toastOptions={{
        classNames: {
          toast: `${isMobile ? "mb-15" : "mt-15"} rounded-2xl border border-slate-200 bg-white shadow-lg sm:mx-0`,
          title: "text-sm font-semibold text-slate-900",
          description: "text-sm text-slate-500",
          success: "border-green-200",
          error: "border-red-200",
          warning: "border-yellow-200",
          info: "border-blue-200",
        },
      }}
    />
  );
}
