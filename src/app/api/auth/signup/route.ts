import connectDb from "@/lib/db";
import generateUsername from "@/utils/generateUsername";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const username = generateUsername(name);

    if (!name || !email || !password || !username)
      return NextResponse.json(
        { error: { message: "name, email and password are required" } },
        { status: 401 },
      );

    if (password.length < 6) {
      return NextResponse.json(
        { error: { message: "password must be at least 6 characters!" } },
        { status: 400 },
      );
    }

    const db = await connectDb();

    const { data: existUser } = await db
      .from("users_duplicate")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existUser) {
      return NextResponse.json(
        { error: { message: "user already exists" } },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: user, error } = await db
      .from("users_duplicate")
      .insert({
        username,
        name,
        email,
        password_hash: hashedPassword,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error }, { status: 501 });
    }

    delete user.password_hash;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwtToken = await new SignJWT({ user_id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    const response = NextResponse.json({ user }, { status: 201 });
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
