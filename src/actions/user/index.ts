"use server";

import bcrypt from "bcryptjs";

import { deleteOtp, findOtpByEmail } from "@/db/auth/otp";
import {
  getUserById,
  getUserPassword as _getUserPassword,
  updatePassword,
  updateUserLastAccessedAt,
} from "@/db/user";
import { getAuthenticatedUserId } from "@/lib/auth/getAuthenticatedUserId";
import { User } from "@/types/user";

export async function getCurrentUser() {
  const userId = await getAuthenticatedUserId();

  const user = await getUserById(userId);

  void updateUserLastAccessedAt(userId).catch((error) => {
    console.error("Failed to update last accessed time", error);
  });

  return user as User;
}

export async function getUserPassword() {
  const userId = await getAuthenticatedUserId();
  return await _getUserPassword(userId);
}

export async function setUserPassword({
  email,
  otp,
  password,
}: {
  email: string;
  otp: string;
  password: string;
}) {
  const userId = await getAuthenticatedUserId();

  if (!email || !otp || !password) throw new Error("All fields are required");

  const otpObj = await findOtpByEmail(email);

  if (!otpObj) throw new Error("Invalid or expired OTP");

  // Check expiry
  const now = new Date();

  if (now > new Date(otpObj.expires_at)) {
    // Delete expired OTP
    await deleteOtp(email);

    throw new Error("OTP expired");
  }

  // Verify OTP
  const validOtp = await bcrypt.compare(otp, otpObj.otp_hash);

  if (!validOtp) throw new Error("Invalid OTP");

  // Hash new password
  const passwordHash = await bcrypt.hash(password, 10);

  // Update password
  await updatePassword(email, passwordHash);

  // Delete OTP after successful reset
  await deleteOtp(email);
}

export async function changeUserPassword({
  email,
  password,
  oldPassword,
}: {
  email: string;
  password: string;
  oldPassword: string;
}) {
  const userId = await getAuthenticatedUserId();

  if (!email || !password || !oldPassword) {
    throw new Error("All fields are required");
  }

  // Fetch User
  const password_hash = await getUserPassword();

  if (!password_hash) throw new Error("Password doesn't exist");

  // Verify Password
  const isMatch = await bcrypt.compare(oldPassword, password_hash);

  if (!isMatch) throw new Error("Invalid password");

  // Hash new password
  const passwordHash = await bcrypt.hash(password, 10);

  // Update password
  await updatePassword(email, passwordHash);
}

export async function resetUserPassword({
  email,
  otp,
  password,
}: {
  email: string;
  otp: string;
  password: string;
}) {
  const userId = await getAuthenticatedUserId();

  if (!email || !otp || !password) {
    throw new Error("All fields are required");
  }

  // Fetch User
  const otpObj = await findOtpByEmail(email);

  if (!otpObj) throw new Error("Invalid or expired OTP");

  // Check expiry
  const now = new Date();

  if (now > new Date(otpObj.expires_at)) {
    // Delete expired OTP
    await deleteOtp(email);

    throw new Error("OTP Expired");
  }

  // Verify OTP
  const validOtp = await bcrypt.compare(otp, otpObj.otp_hash);

  if (!validOtp) throw new Error("Invalid OTP");

  // Hash new password
  const passwordHash = await bcrypt.hash(password, 10);

  // Update password
  await updatePassword(email, passwordHash);

  // Delete OTP after successful reset
  await deleteOtp(email);
}
