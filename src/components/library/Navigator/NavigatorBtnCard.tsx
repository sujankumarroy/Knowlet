import { useRouter } from "next/navigation";

interface Item {
  title: string;
  description: string;
  path: string;
}

export default function NavigatorBtnCard({ item }: { item: Item }) {
  const router = useRouter();
  return (
    <button
      key={item.path}
      onClick={() => router.push(`/library/${item.path}`)}
      className="group flex min-h-30 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
          {item.title?.slice(0, 30) + (item.title?.slice(30, 31) ? " ..." : "")}
        </h2>

        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {item.description.slice(0, 50) +
              (item.description.slice(50, 51) ? " ..." : "")}
          </p>
        )}
      </div>

      <div className="mt-4 text-xs font-medium text-blue-500">Open →</div>
    </button>
  );
}
