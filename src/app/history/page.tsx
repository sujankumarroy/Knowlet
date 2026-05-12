"use client";

import ListPageLayout from "@/components/layout/ListPageLayout";

type Item = {
  title: string;
  url: string;
  timestamp: string;
};

export default function HistoryPage() {
  const history: Item[] = []; // replace with your localStorage/API

  return (
    <ListPageLayout
      title="📖 Recently Visited Notes"
      subtitle="Your Unit History (Last 50 Pages)"
    >
      {history.length === 0 ? (
        <div className="p-6 text-center bg-yellow-50 border border-dashed border-yellow-400 rounded-xl text-yellow-700">
          Loading history...
        </div>
      ) : (
        <ul className="space-y-3">
          {history.map((item, i) => (
            <li
              key={i}
              className="p-4 border rounded-xl flex flex-col sm:flex-row justify-between gap-2 hover:shadow-md transition"
            >
              <a
                href={item.url}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                {item.title}
              </a>

              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 self-start sm:self-center">
                {item.timestamp}
              </span>
            </li>
          ))}
        </ul>
      )}
    </ListPageLayout>
  );
}
