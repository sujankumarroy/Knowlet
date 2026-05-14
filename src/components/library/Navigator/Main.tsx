"use client";

import NavigatorBtnCard from "./NavigatorBtnCard";

type Item = {
  title: string;
  description: string;
  path: string;
  type: string;
};

export default function Main({
  items,
  resources,
}: {
  items: Item[];
  resources?: boolean;
}) {
  let groupedItems: Record<string, Item[]>;
  let orderedTypes = ["note", "pyq"];
  if (resources) {
    groupedItems = items.reduce(
      (acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      },
      {} as Record<string, Item[]>,
    );
  }

  return resources ? (
    <div className="space-y-8 p-4">
      {orderedTypes.map((type) => {
        const sectionItems = groupedItems[type];

        if (!sectionItems?.length) return null;

        return (
          <section key={type}>
            <h2 className="mb-4 text-xl font-bold capitalize text-slate-800">
              {type.replace("-", " ")}
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {sectionItems.map((item) => (
                <NavigatorBtnCard key={item.path} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
      {items.map((i, idx) => (
        <NavigatorBtnCard key={idx} item={i} />
      ))}
    </div>
  );
}
