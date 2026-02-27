"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import  SelectComponent from "@/component/select/select"

type Schedule = "daily" | "weekly" | "monthly";
type ValidationCriteria = "at_least" | "exactly" | "at_most";
type ChallengeUnit = "at_least" | "exactly" | "at_most";

export default function NewChallengeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [value, setValue] = useState<number>(0);
  const [unit, setChallengeUnit] = useState("");
  const [validationCriteria, setValidationCriteria] =useState("");

type SelectOption = { value: string; label: string };

const [periodicityOptions, setPeriodicityOptions] = useState<SelectOption[]>([]);
const [challengeUnitOptions, setChallengeUnitOptions] = useState<SelectOption[]>([]);
const [validationCriteriaOptions, setValidationCriteriaOptions] = useState<SelectOption[]>([]);

useEffect(() => {
  (async () => {
    const [periodicity, challengeUnit, validationCriteria] = await Promise.all([
      fetch("/api/enum/periodicity?select=true&empty=true").then((r) => r.json()),
      fetch("/api/enum/challenge_unit?select=true&empty=true").then((r) => r.json()),
      fetch("/api/enum/validation_criteria?select=true&empty=true").then((r) => r.json()),
    ]);

    setPeriodicityOptions(periodicity);
    setChallengeUnitOptions(challengeUnit);
    setValidationCriteriaOptions(validationCriteria);
  })().catch(console.error);
}, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log(JSON.stringify({
          title,
          description: description.trim() ? description : null,
          schedule,
          value,
          unit,
          validationCriteria}));

    try {
      const CreateChallengeResponse = await fetch("/api/challenge/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description.trim() ? description : null,
          schedule,
          value,
          unit,
          validationCriteria,
        }),
      });

      if (!CreateChallengeResponse.ok) {
        const json = await CreateChallengeResponse.json();
        throw new Error(json || `HTTP ${CreateChallengeResponse.status}`);
      }

      router.push("/challenge"); // ou vers /challenge/:id si ton API renvoie l'id
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-gray-50 p-6">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <label className="text-sm font-medium">Titre</label>
        <input
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={120}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Fréquence</label>
          <SelectComponent
            value={schedule}
            options={periodicityOptions}
            onChange={(value) => setSchedule(value as Schedule)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Critère</label>
          <SelectComponent
            value={validationCriteria}
            options={validationCriteriaOptions}
            onChange={(value) => setValidationCriteria(value as ValidationCriteria)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Valeur</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="number"
            value={value}
            min={0}
            step="1"
            onChange={(e) => setValue(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Unité</label>
          <SelectComponent
            value={unit}
            options={challengeUnitOptions}
            onChange={(value) => setChallengeUnit(value as ChallengeUnit)}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Création..." : "Créer"}
        </button>

        <button
          type="button"
          className="rounded-xl border px-4 py-2"
          onClick={() => router.back()}
          disabled={loading}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
