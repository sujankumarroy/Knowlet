import connectDb from "@/lib/db";
import { resend } from "@/lib/resend";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, type }: { email: string; type: AuthOtpType } =
      await req.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: { message: "Email and type are required" } },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const db = await connectDb();

    const { data: existUser } = await db
      .from("users_duplicate")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existUser && type === "signup") {
      return NextResponse.json(
        { error: { message: "user already exists" } },
        { status: 400 },
      );
    } else if (
      [
        "set_password",
        "reset_password",
        "change_password",
        "verify_email",
      ].includes(type)
    ) {
      if (!existUser) {
        return NextResponse.json(
          { error: { message: "Unauthorized User" } },
          { status: 403 },
        );
      }
    }

    const { error: otpError } = await db.from("password_reset_otps").upsert(
      {
        email,
        otp_hash: otpHash,
        expires_at: expiresAt,
      },
      {
        onConflict: "email",
      },
    );

    if (otpError) {
      return NextResponse.json(
        { error: { message: "Failed to generate OTP" } },
        { status: 500 },
      );
    }

    let emailHeader = "";
    if (type === "signup") emailHeader = "<h2>Email Verification OTP</h2>";
    else if (type === "set_password")
      emailHeader = "<h2>Password Reset OTP</h2>";

    await resend.emails.send({
      from: "Knowlet Auth <auth@knowlet.in>",
      to: email,
      subject: "Verify Your Email",
      html: `
        <div style="font-family:sans-serif">
          ${emailHeader}
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP expires in 10 minutes.</p>
          <p>If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: { message: "Server Error" } },
      { status: 500 },
    );
  }
}
