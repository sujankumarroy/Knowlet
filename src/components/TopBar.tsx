"use client";

import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="h-14 w-full border-b bg-white flex items-center px-4 sticky top-0 z-40">
      {/* Left: Brand */}
      <div className="font-semibold text-indigo-600">Knowlet</div>

      {/* Center (optional page title) */}
      <div className="flex-1 text-center text-sm text-gray-600">
        {pathname === "/" ? "Home" : pathname.replace("/", "")}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button className="text-gray-500 hover:text-indigo-600">🔍</button>
        <button className="text-gray-500 hover:text-indigo-600">⚙️</button>
      </div>
    </header>
  );
}
