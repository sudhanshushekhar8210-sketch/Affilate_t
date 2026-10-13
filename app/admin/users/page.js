import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import LogoutButton from "@/components/logout-button";
import AdminUsers from "@/components/admin-users";
import { getCurrentUser } from "@/lib/auth/current-user.js";
import { connectToDatabase } from "@/lib/db.js";
import User from "@/lib/models/user.js";

export const metadata = {
  title: "Manage student accounts",
  description: "Create LearnIND student accounts and manage training access.",
};

async function AdminUsersDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") notFound();

  await connectToDatabase();
  const students = await User.find({
    $or: [{ role: "user" }, { role: { $exists: false } }],
  })
    .select("name email trainingAccess createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const initialUsers = students.map((student) => ({
    id: student._id.toString(),
    name: student.name,
    email: student.email,
    trainingAccess: student.trainingAccess === true,
    createdAt: student.createdAt?.toISOString() || "",
  }));

  return (
    <main className="training-page admin-page">
      <div className="training-topline">
        <div className="section-kicker">LEARNIND · ADMINISTRATION</div>
        <LogoutButton />
      </div>
      <header className="training-heading">
        <h1>Student accounts</h1>
        <p>Create student logins and control access to Affiliate Training.</p>
      </header>
      <AdminUsers initialUsers={initialUsers} />
    </main>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense
      fallback={
        <main className="training-page" aria-busy="true">
          <div className="surface-card empty-state">Opening account management…</div>
        </main>
      }
    >
      <AdminUsersDashboard />
    </Suspense>
  );
}
