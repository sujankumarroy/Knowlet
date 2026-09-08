import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { getPasswordHashByEmail, getUserByEmail } from "@/db/user";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: { message: "Email and password required" } },
        { status: 400 },
      );
    }

    const [user, passwordHash] = await Promise.all([
      getUserByEmail(email),
      getPasswordHashByEmail(email),
    ]);

    if (!passwordHash) {
      return NextResponse.json(
        {
          error: {
            message:
              "Password authentication is not available for this account",
          },
        },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, passwordHash);

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
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 15,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
