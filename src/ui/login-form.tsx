"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setIsLoading(false);

    if (!res) return setError("Erreur inattendue.");
    if (res.error) {
      return setError(
        res.error === "CredentialsSignin"
          ? "Identifiants invalides."
          : "Connexion impossible."
      );
    }

    router.push(res.url ?? callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Mot de passe</label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none"
          required
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
