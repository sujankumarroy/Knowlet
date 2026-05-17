"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <main className="min-h-[calc(100dvh-120px)] flex items-center justify-center bg-gray-100 p-4">
      <AuthCard title="Forgot Password">
        {!otpSent ? (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            onSuccess={() => setOtpSent(true)}
          />
        ) : (
          <ResetPasswordForm email={email} />
        )}
      </AuthCard>
    </main>
  );
}
