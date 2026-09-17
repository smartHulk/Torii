"use client";

import Link from "next/link";
import signOut from "next-auth";

export default function HeaderComponent(
{
  page,
}: {
  page: string;
}) {

  return (
      <header className="border-b">
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <Link  href="/"
          className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-black" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Torii</div>
              <div className="text-xs text-gray-500">{page}</div>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/profile"
              className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profil
            </Link>

            {/* On met un lien vers une page logout (simple) */}
          <button onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-90"
            >
            Logout
          </button>

          </nav>
        </div>
      </header>
      )
  }