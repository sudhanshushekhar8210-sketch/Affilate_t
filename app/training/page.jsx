import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user.js";
import TrainingClient from "./training-client.jsx";

export const metadata = {
  title: "Your Training",
  description: "Your protected LearnIND Affiliate Training space.",
};

async function ProtectedTrainingPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role === "admin") redirect("/admin/users");
  if (user.role !== "user") redirect("/login");

  if (!user.trainingAccess) {
    return (
      <main className="training-page">
        <section className="pending-access surface-card">
          <span className="info-card-kicker">COURSE ACCESS</span>
          <h1>Your training access is not active yet.</h1>
          <p>
            Signing in does not automatically unlock course content. LearnIND
            will confirm your payment and enable access before training modules
            are available.
          </p>
          <Link className="button button-secondary" href="/buy">
            Contact LearnIND about training
          </Link>
        </section>
      </main>
    );
  }

  return <TrainingClient />;
}

export default function TrainingPage() {
  return (
    <Suspense
      fallback={
        <main className="training-page" aria-busy="true">
          <div className="surface-card empty-state">
            Opening your learning space…
          </div>
        </main>
      }
    >
      <ProtectedTrainingPage />
    </Suspense>
  );
}
