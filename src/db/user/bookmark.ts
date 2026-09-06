import { supabase } from "@/lib/supabase";
import { Bookmark } from "@/types/resource";

export async function insertBookmark(userId: string, resourceId: string) {
  const { data, error } = await supabase.from("bookmarks").insert({
    user_id: userId,
    resource_id: resourceId,
  });

  if (error) throw error;

  return data;
}

export async function getBookmarks(userId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select(
      `
        id,
        created_at,
        resource: resources (
          id,
          title,
          description,
          path,
          created_at
        )
      `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data as unknown as Bookmark[];
}

export async function getBookmark(userId: string, resourceId: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("resource_id", resourceId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getUserBookmarksCount(userId: string) {
  const { count, error } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}

export async function deleteBookmark(userId: string, resourceId: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("resource_id", resourceId);

  if (error) throw error;

  return data;
}
