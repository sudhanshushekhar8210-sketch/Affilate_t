import AuthForm from "@/components/auth-form";

export const metadata = {
  title: "Login",
  description: "Sign in to your LearnIND account.",
};

export default function LoginPage() {
  return (
    <main className="content-page auth-layout">
      <header className="content-heading">
        <div className="section-kicker">WELCOME BACK</div>
        <h1>Your learning space.</h1>
        <p>Sign in using the account credentials provided to you by LearnIND.</p>
      </header>
      <AuthForm />
    </main>
  );
}
