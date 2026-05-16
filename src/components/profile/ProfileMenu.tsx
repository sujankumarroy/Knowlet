"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileMenu() {
  const { user, setUser } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleSignout() {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      const { success } = await res.json();

      if (!success) throw new Error("Failed to Sign Out");

      localStorage.removeItem("knowlet-user");
      toast.success("Sign Out Successfull.");

      setUser(null);
      setOpen(false);

      router.push("/");
    } catch (error) {
      toast.error("Failed to Sign Out");
      return;
    }
  }

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="overflow-hidden rounded-full"
      >
        <img
          src={user?.picture || "/images/demo_pp.jpg"}
          alt="user"
          className="h-10 w-10 rounded-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <img
              onClick={() => {
                router.push("/profile");
                setOpen((prev) => !prev);
              }}
              src={user?.picture || "/images/demo_pp.jpg"}
              alt="profile"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold text-slate-900">
                {user.name || "Unknown User"}
              </h2>

              <p className="truncate text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <button
              onClick={handleSignout}
              className="w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
