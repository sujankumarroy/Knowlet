import { supabase } from "@/lib/supabase";
import { Download } from "@/types/resource";

export async function getDownloads(userId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from("resource_downloads")
    .select(
      "id, downloaded_at, resource:resources (id, title, description, path, created_at)",
    )
    .eq("user_id", userId)
    .limit(limit);

  if (error) throw error;

  return data.map((d) => ({
    ...d,
    created_at: d.downloaded_at,
  })) as unknown as Download[];
}
