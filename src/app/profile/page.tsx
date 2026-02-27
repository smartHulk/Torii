import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HeaderComponent from "@/component/header"
import { authOptions } from "@/lib/auth/options";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderComponent page="Profile"/>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-gray-600">
            Vous êtes connecté en tant que{" "}
            <span className="font-medium text-gray-900">
              {session.user?.name ?? "Utilisateur"}
            </span>
            .
          </p>
          <div className="mt-2 text-gray-600">
            {Object.entries(session.user).map(([key, value]) => (
              <p key={key}>
                <strong>{key}</strong> : {value}
              </p>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}