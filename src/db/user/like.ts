import { supabase } from "@/lib/supabase";
import { Like } from "@/types/resource";

export async function insertLike(userId: string, resourceId: string) {
  const { error } = await supabase.from("likes").insert({
    user_id: userId,
    resource_id: resourceId,
  });

  if (error) throw error;
}

export async function getUserLikes(userId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from("likes")
    .select("id, created_at, resource:resources(id, title, description, path)")
    .eq("user_id", userId)
    .limit(limit);

  if (error) throw error;

  return data as unknown as Like[];
}

export async function getUserLikesCount(userId: string) {
  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}

export async function deleteLike(userId: string, resourceId: string) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", userId)
    .eq("resource_id", resourceId);

  if (error) throw error;
}

export async function isLiked(userId: string, resourceId: string) {
  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("resource_id", resourceId)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}
