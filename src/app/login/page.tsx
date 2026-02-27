import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";
import LoginForm from "@/ui/login-form"

export default async function LoginPage() {
  const session = await getServerSession(authOptions);


  
  if (false == !session?.accessToken) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <h1 className="text-2xl font-semibold">Se connecter</h1>
        <p className="mt-2 text-sm text-gray-600">
          Entrez vos identifiants.
        </p>

        <div className="mt-6 rounded-2xl border bg-gray-50 p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );

}

