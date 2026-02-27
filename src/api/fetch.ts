import { ApiRoute } from "@/types/api/api"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { query } from "@/types/api/query";

export async function apiFetch(
  route: ApiRoute,
  opts: {
    body?: any;
    headers?: Record<string, string>;
    cache?: RequestCache;
    query?: query;
  } = {}
) {
  const session = await getServerSession(authOptions);
  const base = process.env.API_URL;
  if (!base) throw new Error("API_URL manquant");

  if (!base) {
    throw new Error("API_URL manquant dans .env");
  }

  const url = new URL(route.path, base);
  // url.searchParams.set("[page][offset]", String(page));
  // url.searchParams.set("[page][limit]", String(limit));
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  console.log(url.toString());
  console.log(opts.body);

  const response = await fetch(url.toString(), {
    method: route.method,
    cache: opts.cache ?? "no-store",
    headers: {
      ...(opts.headers ?? {}),
      Accept: "application/json",
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...(route.auth ? { Authorization: `Bearer ${session?.accessToken}` } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(json));
    return json;
  }

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  return text;
}
