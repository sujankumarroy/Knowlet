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
      className="group text-left rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
        {item.title}
      </h2>

      <p className="mt-1 text-sm text-slate-500 line-clamp-2">
        {item.description}
      </p>

      <div className="mt-3 text-xs text-blue-500 font-medium">Open →</div>
    </button>
  );
}
