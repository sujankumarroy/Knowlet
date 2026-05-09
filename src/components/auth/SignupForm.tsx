"use client";

import Link from "next/link";
import { useState } from "react";
import Loader from "./Loader";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const { user, error } = await res.json();

      if (!user || error) {
        alert(error.message);
        return;
      }

      localStorage.setItem("knowlet-usr", JSON.stringify(user));

      alert(`Successfully Signed Up\nYour User ID: ${user.id}`);

      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      alert("Signup failed");
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
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

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

        <button
          type="button"
          className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Continue with Google
        </button>

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
