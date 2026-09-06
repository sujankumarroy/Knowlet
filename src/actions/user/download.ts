"use server";

import { getDownloads as _getDownloads } from "@/db/user/download";
import { getAuthenticatedUserId } from "@/lib/auth/getAuthenticatedUserId";

export async function getDownloads() {
  const userId = await getAuthenticatedUserId();
  return await _getDownloads(userId);
}
