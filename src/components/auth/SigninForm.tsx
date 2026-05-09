"use client";

import Link from "next/link";
import { useState } from "react";
import Loader from "./Loader";

export default function SigninForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const { user, error } = await res.json();

      if (!user || error) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("knowlet-user", JSON.stringify(user));

      alert("Successfully Logged In");

      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>

        <button
          type="button"
          className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Continue with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </>
  );
}
