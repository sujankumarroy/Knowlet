import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { findOtpByEmail, deleteOtp } from "@/db/auth/otp";
import { createUser } from "@/db/user";
import { sendWelcomeEmail } from "@/services/email/send/welcome";
import generateUsername from "@/utils/generateUsername";

export async function POST(request: NextRequest) {
  try {
    const referralCode = request.cookies.get("referral_code")?.value;
    const { name, email: _email, otp, password } = await request.json();
    const email = (_email as string).toLowerCase();
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

    // Find latest OTP record
    const otpObj = await findOtpByEmail(email);

    if (!otpObj) {
      return NextResponse.json(
        { error: { message: "Invalid or expired OTP" } },
        { status: 400 },
      );
    }

    // Check expiry
    const now = new Date();

    if (now > new Date(otpObj.expires_at)) {
      // Delete expired OTP
      await deleteOtp(email);

      return NextResponse.json(
        { error: { message: "OTP expired" } },
        { status: 400 },
      );
    }

    // Verify OTP
    const validOtp = await bcrypt.compare(otp, otpObj.otp_hash);

    if (!validOtp) {
      // Delete expired OTP
      await deleteOtp(email);

      return NextResponse.json(
        { error: { message: "Invalid OTP" } },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      username,
      password_hash: hashedPassword,
      referrer_code: referralCode ?? undefined,
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwtToken = await new SignJWT({ user_id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    const response = NextResponse.json({ user }, { status: 201 });

    response.cookies.delete("referral_code");

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 15,
    });

    void sendWelcomeEmail({ email, name }).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
