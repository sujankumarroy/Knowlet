import { jwtVerify, JWTPayload } from "jose";
import connectDb from "./db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

type AuthPayload = JWTPayload & {
  user_id: string;
};

async function verifyJwt(token: string | undefined | null) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify<AuthPayload>(token, secret);
    return payload;
  } catch {
    return null;
  }
}

async function verifyUser(token: string | undefined | null) {
  const payload = await verifyJwt(token);
  if (!payload) return null;

  const db = await connectDb();
  const { data, error } = await db
    .from("users_duplicate")
    .select("is_active")
    .eq("id", payload.user_id)
    .maybeSingle();

  if (error || !data || !data.is_active) return null;

  return payload;
}

async function verifyAdmin(token: string | undefined | null) {
  const payload = await verifyJwt(token);
  if (!payload) return null;

  const db = await connectDb();
  const { data, error } = await db
    .from("users_duplicate")
    .select("role")
    .eq("id", payload.user_id)
    .eq("users_duplicate", true)
    .maybeSingle();

  if (error || !data || data.role !== "admin") return null;

  return payload;
}

export { verifyJwt, verifyUser, verifyAdmin };
