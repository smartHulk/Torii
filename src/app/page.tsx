import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import DashboardPage from "@/app/dashboard/page"


export default async function HomePage() {
  const session = await getServerSession(authOptions);

  console.log(!session?.accessToken, session?.accessToken);

  if (false == !session?.accessToken) {
      return <DashboardPage />
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-black" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Torii</div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-90"
            >
              login
            </Link>
          </nav>
        </div>
      </header>
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t text-xs text-gray-500 text-center py-3">
        © {new Date().getFullYear()} YogaGrammar. Tous droits réservés.
      </footer>
    </main>
  );
}
