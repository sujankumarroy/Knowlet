"use client";

import { useRouter } from "next/navigation";

export default function Header({
  title,
  subtitle,
  path,
}: {
  title?: string;
  subtitle?: string;
  path?: string[];
}) {
  const router = useRouter();

  return (
    <header className="space-y-2 border-b border-slate-200 p-4">
      {title && (
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      )}

      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}

      {path?.length ? (
        <nav className="flex flex-wrap gap-2 text-sm text-slate-600">
          {path.map((segment, idx) => (
            <button
              key={`${segment}-${idx}`}
              onClick={() =>
                router.push(`/library/${path.slice(0, idx + 1).join("/")}`)
              }
              className="hover:text-blue-600 transition-colors"
            >
              {segment}
              {idx < path.length - 1 && <span className="mx-1">/</span>}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
