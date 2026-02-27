import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HeaderComponent from "@/component/header"

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderComponent page="Home"/>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Vous êtes connecté en tant que{" "}
            <span className="font-medium text-gray-900">
              {session.user?.email ?? "Utilisateur"}
            </span>
            .
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card
              title="Espace"
              desc="Accéder à vos contenus et préférences."
              href="/dashboard"
              cta="Aller au dashboard"
            />
            <Card
              title="Compte"
              desc="Gérer vos informations de profil."
              href="/profile"
              cta="Voir le profil"
            />
            <Card
              title="Challenge"
              desc="Documentation et support."
              href="/challenge"
              cta="Ouvrir l’aide"
            />
          </div>
        </div>

        <footer className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} YogaGrammar. Tous droits réservés.
        </footer>
      </section>
    </main>
  );
}

function Card({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
      <div className="mt-4 text-sm font-medium text-black underline-offset-4 group-hover:underline">
        {cta}
      </div>
    </Link>
  );
}
