"use server";

import bcrypt from "bcryptjs";

import { getUserIdByEmail } from "@/db/user";
import { upsertOtp } from "@/db/auth/otp";
import { sendOtpEmail } from "@/services/email/send";

type AuthOtpType =
  | "signup"
  | "signin"
  | "set_password"
  | "reset_password"
  | "forgot_password"
  | "change_password"
  | "verify_email";

export async function sendAuthOtp({
  email: _email,
  type,
}: {
  email: string;
  type: AuthOtpType;
}) {
  const email = (_email as string).toLowerCase();

  if (!email || !type) throw new Error("Email and type are required");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const userId = await getUserIdByEmail(email);

  if (userId && type === "signup") {
    throw new Error("User already exists");
  } else if (
    !userId &&
    [
      "set_password",
      "reset_password",
      "change_password",
      "verify_email",
    ].includes(type)
  ) {
    throw new Error("Unauthorized User");
  }

  await upsertOtp(email, otpHash, expiresAt);

  await sendOtpEmail({ email, otp, type });
}
