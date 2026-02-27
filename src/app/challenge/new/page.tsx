import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import NewChallengeForm from "@/ui/challenge/new-form";


export default async function NewChallengePage() {
  const session = await getServerSession(authOptions);
    console.log("session",!session?.user);


  if (true == !session?.accessToken) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Nouveau challenge</h1>
          <Link className="text-sm underline" href="/challenge">
            ← Retour
          </Link>
        </div>

        {/* Form en composant client */}
        <NewChallengeForm />
      </section>
    </main>
  );
}

// petit wrapper pour importer un client component depuis un server component
