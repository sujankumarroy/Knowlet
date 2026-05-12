import AuthCard from "@/components/auth/AuthCart";
import SigninForm from "@/components/auth/SigninForm";

export default function SigninPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <AuthCard title="Signin">
        <SigninForm />
      </AuthCard>
    </main>
  );
}
