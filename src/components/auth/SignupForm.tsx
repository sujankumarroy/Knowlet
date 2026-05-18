"use client";

import Link from "next/link";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUser } = useAuth();

  async function handleRequestOtp() {
    // const formData = new FormData(e.currentTarget);

    // const name = formData.get("name") as string;
    // const email = formData.get("email") as string;
    // const otp = formData.get("otp") as string;

    if (!name || !email) {
      toast.warning("Enter name and email first");
      return;
    }

    try {
      setOtpLoading(true);

      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, otp, password }),
      });

      const { user, error } = await res.json();

      if (!user || error) {
        toast.error(error.message);
        return;
      }

      setUser(user);
      localStorage.setItem("knowlet-user", JSON.stringify(user));
      toast.success("Successfully Signed Up", {
        description: `Your username: ${user.id}`,
      });
      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

        <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-blue-500">
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!otpSent}
            className="flex-1 px-4 py-3 outline-none disabled:bg-gray-100"
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

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* <button
          type="button"
          className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Continue with Google
        </button> */}

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </>
  );
}
