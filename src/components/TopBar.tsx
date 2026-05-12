"use client";

import { useAuth } from "@/context/AuthContext";
import { useHeader } from "@/context/HeaderContext";
import { usePathname, useRouter } from "next/navigation";
import ProfileMenu from "./profile/ProfileMenu";

export default function TopBar() {
  const { mode } = useHeader();
  const { user } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 flex h-15 w-full items-center justify-center border-b bg-white px-4">
      {/* LEFT */}
      <div className="w-20">
        {pathname !== "/" && (
          <button onClick={() => router.back()}>
            <img src="/icons/back.svg" alt="Back" />
          </button>
        )}
      </div>

      {/* CENTER */}
      <div className="flex-1 text-center">
        {mode === "reader" && (
          <div className="flex items-center justify-center gap-4">
            <button>Prev</button>
            <button>Like</button>
            <button>Next</button>
          </div>
        )}

        {mode === "home" && <h1>Knowlet</h1>}
      </div>

      {/* RIGHT */}
      <div className="flex w-20 justify-end">
        {user ? (
          <ProfileMenu />
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
