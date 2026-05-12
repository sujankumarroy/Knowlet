import AuthCard from "@/components/auth/AuthCart";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <AuthCard title="Create Account">
        <SignupForm />
      </AuthCard>
    </main>
  );
}
