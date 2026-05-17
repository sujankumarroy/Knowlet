import AuthCard from "@/components/auth/AuthCard";
import SigninForm from "@/components/auth/SigninForm";

export default function SigninPage() {
  return (
    <main className="min-h-[calc(100dvh-120px)] flex items-center justify-center bg-gray-100 p-4">
      <AuthCard title="Signin">
        <SigninForm />
      </AuthCard>
    </main>
  );
}
