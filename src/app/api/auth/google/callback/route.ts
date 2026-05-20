import connectDb from "@/lib/db";
import generateUsername from "@/utils/generateUsername";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // Exchange code for token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  // Fetch user
  const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  let user = await userRes.json();
  const db = await connectDb();

  // Sync with Database
  const { data, error } = await db
    .from("users_duplicate")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) {
    const newUser = {
      name: user.name,
      email: user.email,
      username: generateUsername(user.name),
    };

    // Create new user
    const { data, error } = await db
      .from("users_duplicate")
      .insert(newUser)
      .select()
      .single();

    if (error) throw new Error(error.message);

    user = data;
  }

  user = data;

  // Create JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new SignJWT({ user_id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15d")
    .sign(secret);

  // Set cookie
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 15,
  });

  return response;
}
