import { useEffect, useState } from "react";

export default function TableListComponent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://example.com/api/items";

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const r = Array.isArray(data) ? data : (data.items ?? []);
        if (!cancelled) setRows(r);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p style={{ color: "crimson" }}>Erreur : {error}</p>;
  if (!rows.length) return <p>Aucune donnée.</p>;

  const columns = Object.keys(rows[0]);

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} style={{ border: "1px solid #ddd", padding: 8, background: "#f5f5f5" }}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.id ?? i}>
            {columns.map((c) => (
              <td key={c} style={{ border: "1px solid #ddd", padding: 8 }}>
                {String(row[c] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
