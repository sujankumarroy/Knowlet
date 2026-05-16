"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
      <div className="w-27 h-27 rounded-full flex items-center justify-center">
        <img
          src={user?.picture || "/images/demo_pp.jpg"}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <div>
        <h1 className="text-xl font-semibold">{user?.name || "Unknown"}</h1>
        <p className="text-gray-500">{user?.email || "example@gmail.com"}</p>
      </div>
    </div>
  );
}
