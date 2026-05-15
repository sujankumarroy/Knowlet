import connectDb from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: { message: "Email and password required" } },
        { status: 400 },
      );
    }

    const db = await connectDb();

    const { data: user, error } = await db
      .from("users_duplicate")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json(
        { error: { message: "Invalid credentials" } },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    delete user.password_hash;

    if (!isMatch) {
      return NextResponse.json(
        { error: { message: "Invalid credentials" } },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwtToken = await new SignJWT({ user_id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    const response = NextResponse.json({ user }, { status: 200 });
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 15,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
