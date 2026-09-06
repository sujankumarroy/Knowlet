import { getDownloads } from "@/actions/user/download";
import { getHistory } from "@/actions/user/history";
import { getUserLikes } from "@/actions/user/like";
import { ResourceInfo } from "@/types/resource";
import { truncateText } from "@/utils/slugify";
import { Clock3, Download, Heart, History, TriangleAlert } from "lucide-react";
import Link from "next/link";

function ActivitySection<
  T extends { id: string; created_at: string; resource: ResourceInfo },
>({
  title,
  items,
  error,
  icon: Icon,
}: {
  title: string;
  items: T[];
  error?: boolean;
  icon: typeof History;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
            <Icon className="size-4.5 text-muted-foreground" />
          </div>

          <div>
            <h2 className="font-semibold tracking-tight">{title}</h2>
            {!error && (
              <p className="text-xs text-muted-foreground">
                {items.length} {items.length === 1 ? "resource" : "resources"}
              </p>
            )}
          </div>
        </div>
      </div>

      {error ? (
        <div className="flex min-h-28 items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 text-sm text-muted-foreground">
          <TriangleAlert className="size-4 text-destructive" />
          <span>Failed to load {title.toLowerCase()}.</span>
        </div>
      ) : items.length === 0 ? (
        <div className="flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-5 text-sm text-muted-foreground">
          No {title.toLowerCase()} yet.
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/resources/${item.resource.path}`}
              className="group relative flex min-h-45 w-65 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                  <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </span>

                <span className="text-xs text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>

              <h3 className="line-clamp-2 font-semibold leading-snug tracking-tight">
                {item.resource.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {truncateText(item.resource.description, 100)}
              </p>

              <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                <span>View resource</span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function ActivityPage() {
  const [history, likes, downloads] = await Promise.allSettled([
    getHistory(20),
    getUserLikes(20),
    getDownloads(20),
  ]);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10">
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
            <Clock3 className="size-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your recent activity and interactions.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-10">
        <ActivitySection
          title="Recently Viewed"
          icon={History}
          items={history.status === "fulfilled" ? history.value : []}
          error={history.status === "rejected"}
        />

        <ActivitySection
          title="Liked Resources"
          icon={Heart}
          items={likes.status === "fulfilled" ? likes.value : []}
          error={likes.status === "rejected"}
        />

        <ActivitySection
          title="Downloaded Resources"
          icon={Download}
          items={downloads.status === "fulfilled" ? downloads.value : []}
          error={downloads.status === "rejected"}
        />
      </div>
    </main>
  );
}
