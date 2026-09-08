"use server";

import {
  deleteLike,
  getUserLikes as _getUserLikes,
  insertLike,
} from "@/db/user/like";
import { getAuthenticatedUserId } from "@/lib/auth/getAuthenticatedUserId";

export async function getUserLikes(limit?: number) {
  const userId = await getAuthenticatedUserId();
  return await _getUserLikes(userId, limit);
}

export async function likeResource(resourceId: string) {
  const userId = await getAuthenticatedUserId();

  if (!resourceId) throw new Error("Missing resource id");

  await insertLike(userId, resourceId);
}

export async function unlikeResource(resourceId: string) {
  const userId = await getAuthenticatedUserId();

  if (!resourceId) throw new Error("Missing resource id");

  await deleteLike(userId, resourceId);
}
