"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { headerMode, user } = useApp();

  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 flex h-15 w-full items-center justify-center border-b bg-white px-4">
      {/* LEFT */}
      <div className="w-20">
        {headerMode !== "home" && (
          <button onClick={() => router.back()}>
            <img src="/icons/back.svg" alt="Back" />
          </button>
        )}
      </div>

      {/* CENTER */}
      <div className="flex-1 text-center">
        {headerMode === "reader" && (
          <div className="flex items-center justify-center gap-4">
            <button>Prev</button>
            <button>Like</button>
            <button>Next</button>
          </div>
        )}

        {headerMode === "home" && <h1>Knowlet</h1>}
      </div>

      {/* RIGHT */}
      <div className="flex w-20 justify-end">
        {user ? (
          <button onClick={() => alert("brief info")}>
            <img
              src="/images/demo_pp.jpg"
              alt="user"
              className="h-10 w-10 rounded-full"
            />
          </button>
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="font-semibold text-indigo-600"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
