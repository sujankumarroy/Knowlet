"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Bookmark, Bot, User, BookOpen } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const hideNavigation = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/forbidden",
  ].some((path) => pathname.startsWith(path));

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="w-6 h-6" />,
    },
    {
      href: "/library",
      label: "Library",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      href: "/knowva",
      label: "Knowva",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: <Bookmark className="w-6 h-6" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="w-6 h-6" />,
    },
  ];

  if (hideNavigation) return null;

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed bottom-0 left-0 w-full h-15 bg-card shadow-[0_-2px_5px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_5px_rgba(0,0,0,0.3)] flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)]"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <button
            type="button"
            key={item.href}
            onClick={() => router.push(item.href)}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-full flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors
              ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
          >
            <div
              className={`rounded-lg p-1 transition-all duration-200 ${
                isActive ? "-translate-y-0.5 bg-accent" : "scale-100"
              }`}
            >
              {item.icon}
            </div>

            <span
              className={`text-xs transition-all duration-200 ${
                isActive ? "opacity-100 translate-y-0" : "opacity-70"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
