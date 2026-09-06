import { supabase } from "@/lib/supabase";
import { Download } from "@/types/resource";

export async function getDownloads(userId: string) {
  const { data, error } = await supabase
    .from("resource_downloads")
    .select(
      "id, created_id, resource:resources (id, title, description, path, created_at)",
    )
    .eq("user_id", userId);

  if (error) throw error;

  return data as unknown as Download;
}
