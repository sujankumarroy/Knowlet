import { getHistory } from "@/actions/user/history";
import { getUserLikes } from "@/actions/user/like";
import { ResourceInfo } from "@/types/resource";
import { truncateText } from "@/utils/slugify";
import Link from "next/link";

function ActivitySection<
  T extends { id: string; created_at: string; resource: ResourceInfo },
>({ title, items }: { title: string; items: T[] }) {
  if (!items.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/resources/${item.resource.path}`}
            className="min-w-[260px] max-w-[260px] shrink-0 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted"
          >
            <h3 className="line-clamp-2 font-medium">{item.resource.title}</h3>

            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {truncateText(item.resource.description, 100)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ActivityPage() {
  const [history, likes] = await Promise.all([
    getHistory(20),
    getUserLikes(20),
  ]);

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Activity</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your recent activity and interactions.
        </p>
      </header>

      <ActivitySection title="Recently Viewed" items={history} />

      <ActivitySection title="Liked Resources" items={likes} />
    </main>
  );
}
