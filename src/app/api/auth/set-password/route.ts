import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { error: { message: "All fields are required" } },
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
      return NextResponse.json(
        { error: { message: "Invalid OTP" } },
        { status: 400 },
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    // Update password
    const { error: updateError } = await db
      .from("users_duplicate")
      .update({
        password_hash: passwordHash,
      })
      .eq("email", email);

    if (updateError) {
      console.error(updateError);

      return NextResponse.json(
        {
          error: {
            message: "Failed to reset password",
          },
        },
        { status: 500 },
      );
    }

    // Delete OTP after successful reset
    await db.from("password_reset_otps").delete().eq("id", otpRow.id);

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
