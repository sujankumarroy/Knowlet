import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";

export const USER_COLUMNS = {
  basic: "id, name, username",

  public: "id, name, username, picture",

  profile: "id, name, username, picture, age, stream, standard, fav_subject",

  auth: "id, email, role, is_active",

  full: "id, name, username, email, age, picture, stream, standard, fav_subject, role, is_active, created_at, updated_at",
} as const;

export async function updateUserLastAccessedAt(userId: string) {
  const { error } = await supabase
    .from("users")
    .update({ last_accessed_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) throw error;
}

export async function createUser(newUser: {
  name: string;
  email: string;
  username: string;
  password_hash?: string;
  picture?: string;
  referrer_code?: string;
}) {
  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select(USER_COLUMNS.full)
    .maybeSingle();

  if (error) throw error;

  return data as User;
}

export async function getUserAllEmails() {
  const { data, error } = await supabase.from("users").select("email");

  if (error) throw error;

  return data.map((d) => d.email);
}

export async function uploadAvatar(filePath: string, image: File) {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;
}

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select(USER_COLUMNS.full)
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getUserPassword(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("password_hash")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data.password_hash as string | null;
}

export async function getPasswordHashByEmail(
  email: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("password_hash")
    .eq("email", email)
    .single();

  if (error) throw error;

  return data.password_hash as string | null;
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select(USER_COLUMNS.full)
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;

  return data as User;
}

export async function getEmailByUserId(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return data?.email as string;
}

export async function getUserIdByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;

  return data?.id as string;
}

export async function getEmailsByUserIds(userIds: string | string[]) {
  const ids = Array.isArray(userIds) ? userIds : [userIds];

  const { data, error } = await supabase
    .from("users")
    .select("email")
    .in("id", ids);

  if (error) throw error;

  return data.map((d) => d.email) as string[];
}

export async function getUserIdsByEmails(emails: string | string[]) {
  const emailIds = Array.isArray(emails) ? emails : [emails];

  const { data, error } = await supabase
    .from("users")
    .select("id")
    .in("email", emailIds);

  if (error) throw error;

  return data.map((d) => d.id) as string[];
}

export async function getUserReferralCode(userId: string): Promise<string> {
  const { data, error } = await supabase
    .from("users")
    .select("referral_code")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data.referral_code;
}

export async function getReferredUsers(referralCode: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, username, picture")
    .eq("referrer_code", referralCode);

  if (error) throw error;

  return data;
}

export async function updatePassword(email: string, newPasswordHash: string) {
  const { error } = await supabase
    .from("users")
    .update({
      password_hash: newPasswordHash,
    })
    .eq("email", email);

  if (error) throw error;
}

export async function updateUserInfo(
  userId: string,
  newInfo: {
    name: string;
    picture: string;
    age: number;
    stream: string;
    standard: string;
    fav_subject: string;
  },
) {
  const { data, error } = await supabase
    .from("users")
    .update({
      ...newInfo,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select(USER_COLUMNS.full)
    .maybeSingle();

  if (error) throw error;

  return data as User;
}
