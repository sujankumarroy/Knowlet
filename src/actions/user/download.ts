"use server";

import { getDownloads as _getDownloads } from "@/db/user/download";
import { getAuthenticatedUserId } from "@/lib/auth/getAuthenticatedUserId";

export async function getDownloads(limit: number = 50) {
  const userId = await getAuthenticatedUserId();
  return await _getDownloads(userId, limit);
}
