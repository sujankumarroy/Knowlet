import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/db";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          error: {
            message: "Email is required",
          },
        },
        { status: 400 },
      );
    }

    const db = await connectDb();

    // Find user
    const { data: user, error: userError } = await db
      .from("users_duplicate")
      .select("id, email")
      .eq("email", email)
      .maybeSingle();

    if (userError || !user) {
      return NextResponse.json({
        success: true,
      });
    }

    // Delete old OTPs
    await db.from("password_reset_otps").delete().eq("email", email);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP
    const otpHash = await bcrypt.hash(otp, 10);

    // Expiry: 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Save OTP
    const { error: otpError } = await db.from("password_reset_otps").insert({
      email,
      otp_hash: otpHash,
      expires_at: expiresAt,
    });

    if (otpError) {
      console.error(otpError);

      return NextResponse.json(
        {
          error: {
            message: "Failed to generate OTP",
          },
        },
        { status: 500 },
      );
    }

    // Send email
    await resend.emails.send({
      from: "Knowlet Auth <auth@knowlet.in>",
      to: email,
      subject: "Reset your Knowlet password",
      html: `
        <div style="font-family:sans-serif">
          <h2>Password Reset OTP</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>This OTP expires in 10 minutes.</p>

          <p>If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: {
          message: "Something went wrong",
        },
      },
      { status: 500 },
    );
  }
}
