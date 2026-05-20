"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const { user } = useAuth();
  const email = user?.email;

  async function handleRequestOtp() {
    if (!email) {
      toast.warning("Email is required");
      return;
    }

    try {
      setOtpLoading(true);

      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "set_password" }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error.message);
        return;
      }

      setOtpSent(true);

      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });

      const { data, error } = await res.json();

      if (error) toast.error(error.message);
      if (!res.ok) return;

      toast.success("Password updated successfully.");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl">
            🔐
          </div>

          <h1 className="text-3xl font-black text-slate-900">Set Password</h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Create a password for your account so you can sign in using email
            and password in addition to Google authentication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-blue-500">
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 px-4 py-3 outline-none disabled:bg-gray-100"
              required={!otpSent}
            />

            <button
              type="button"
              onClick={handleRequestOtp}
              disabled={otpLoading}
              className="border-l border-gray-300 px-4 text-sm font-medium text-blue-600 hover:bg-gray-50 disabled:opacity-50"
            >
              {otpLoading ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Updating Password..." : "Set Password"}
          </button>
        </form>
      </div>
    </main>
  );
}
