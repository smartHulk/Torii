import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import HeaderComponent from "@/component/header"
import { API_ROUTES } from "@/api/routes";
import { apiFetch } from "@/api/fetch";

function toInt(v: string | string[] | undefined, fallback: number) {
  const s = Array.isArray(v) ? v[0] : v;
  const n = Number.parseInt(String(s ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function formatDateFR(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default async function ChallengePage(
  props: {
    searchParams?: Promise<{ page?: string; limit?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = toInt(searchParams?.page, 1);
  const limit = toInt(searchParams?.limit, 50);

  const json = await apiFetch(API_ROUTES.challenge.list);

  const canPrev = json.page > 1;
  const canNext = json.page < json.totalPages;


  const session = await getServerSession(authOptions);

  if (true == !session?.accessToken) {
    redirect("/");
  }

  return (
    <main className="min-h-full bg-white">
      {/* Header */}
      <HeaderComponent page="Challenges" />

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        <h1>Challenges</h1>
        <div className="rounded-2xl bg-gray-50 p-6">


    <div style={{ padding: 16 }}>
        <Link
            href="/challenge/new"
            className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-90"
          >
            login
        </Link>

      {json.data.length === 0 ? (
        <p>Aucune donnée.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                {[
                  "Titre",
                  "Description",
                  "Fréquence",
                  "Valeur",
                  "Unité",
                  "Critère",
                  "Mis à jour",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      border: "1px solid #ddd",
                      padding: 8,
                      background: "#f5f5f5",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {json.data.map((row) => (
                <tr key={row.id}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{row.title}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {row.description ?? ""}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{row.schedule}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{row.value}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>{row.unit}</td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {row.validationCriteria}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8, whiteSpace: "nowrap" }}>
                    {formatDateFR(row.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {canPrev ? (
            <Link href={`/challenges?page=${json.page - 1}&limit=${json.limit}`}>← Précédent</Link>
          ) : (
            <span style={{ opacity: 0.5 }}>← Précédent</span>
          )}

          {canNext ? (
            <Link href={`/challenges?page=${json.page + 1}&limit=${json.limit}`}>Suivant →</Link>
          ) : (
            <span style={{ opacity: 0.5 }}>Suivant →</span>
          )}
        </div>
                <div style={{ marginBottom: 12 }}>
          <strong>
            Page {json.page} / {json.totalPages}
          </strong>
          {" · "}
          Total: {json.totalItems} item(s)
        </div>
       </div>
      </div>
          <div className="p-6">
        {/* <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-black px-4 py-2 text-white"
        >
          Ouvrir la modal
        </button>


        <ModalComponent open={open} title="Créer un challenge" onClose={() => setOpen(false)}>
          <p className="text-sm text-gray-600">
            Ici tu mets ton formulaire / contenu.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              className="rounded-xl bg-black px-4 py-2 text-white"
              onClick={() => setOpen(false)}
            >
              OK
            </button>
            <button
              className="rounded-xl border px-4 py-2"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
          </div>
        </ModalComponent> */}
      </div>

      </section>
    </main>
  );
}




