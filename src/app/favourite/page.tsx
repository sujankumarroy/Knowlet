"use client";

import ListPageLayout from "@/components/layout/ListPageLayout";

type Fav = {
  title: string;
  url: string;
};

export default function FavouritesPage() {
  const favourites: Fav[] = []; // replace with localStorage/API

  return (
    <ListPageLayout
      title="⭐ Your Favourites"
      subtitle="Quick Access to Key Units"
    >
      {favourites.length === 0 ? (
        <div className="p-6 text-center bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl text-amber-700 italic">
          Loading favourites...
        </div>
      ) : (
        <ul className="space-y-4">
          {favourites.map((item, i) => (
            <li
              key={i}
              className="p-4 border border-amber-200 rounded-xl flex items-center hover:scale-[1.02] hover:shadow-md transition"
            >
              <a
                href={item.url}
                className="text-amber-700 font-semibold hover:text-amber-500"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </ListPageLayout>
  );
}
