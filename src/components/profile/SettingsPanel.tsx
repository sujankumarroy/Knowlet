"use client";

import Link from "next/link";

const links = [
  { label: "Edit Profile", href: "/complete-profile" },
  { label: "Notification Preferences", href: "/notifications" },
  { label: "Settings", href: "/settings" },
  { label: "Activity", href: "/activity" },
];

export default function SettingsPanel() {
  return (
    <div className="bg-card p-5 rounded-xl shadow-md">
      <h2 className="font-semibold mb-4">Account Settings</h2>

      <div className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="flex items-center gap-2 text-blue-600 hover:pl-1 transition"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
