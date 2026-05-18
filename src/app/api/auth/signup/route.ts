import connectDb from "@/lib/db";
import generateUsername from "@/utils/generateUsername";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, otp, password } = await request.json();
    const username = generateUsername(name);

    if (!name || !email || !otp || !password || !username) {
      return NextResponse.json(
        { error: { message: "All fields are required" } },
        { status: 401 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: { message: "password must be at least 6 characters!" } },
        { status: 400 },
      );
    }

    const db = await connectDb();

    // Find latest OTP record
    const { data: otpRow, error: otpError } = await db
      .from("password_reset_otps")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpError || !otpRow) {
      return NextResponse.json(
        { error: { message: "Invalid or expired OTP" } },
        { status: 400 },
      );
    }

    // Check expiry
    const now = new Date();

    if (now > new Date(otpRow.expires_at)) {
      // Delete expired OTP
      await db.from("password_reset_otps").delete().eq("id", otpRow.id);

      return NextResponse.json(
        { error: { message: "OTP expired" } },
        { status: 400 },
      );
    }

    // Verify OTP
    const validOtp = await bcrypt.compare(otp, otpRow.otp_hash);

    if (!validOtp) {
      // Delete expired OTP
      await db.from("password_reset_otps").delete().eq("id", otpRow.id);

      return NextResponse.json(
        { error: { message: "Invalid OTP" } },
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
