import { NextResponse } from "next/server";
import { API_ROUTES } from "@/api/routes";
import { apiFetch } from "@/api/fetch";

const ENUM_MAP = {
  challenge_unit: API_ROUTES.enum.challenge_unit,
  periodicity: API_ROUTES.enum.periodicity,
  validation_criteria: API_ROUTES.enum.validation_criteria,
} as const;

type EnumName = keyof typeof ENUM_MAP;

type Option = {
  value: string;
  label: string;
};

type EnumOptionsConfig = {
  empty?: boolean;
  select?: boolean;
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ name: string }> }
) {
  const { name } = await ctx.params;
  const { searchParams } = new URL(_req.url);

  if (!(name in ENUM_MAP)) {
    return NextResponse.json({ error: "Unknown enum" }, { status: 404 });
  }

  const route = ENUM_MAP[name as EnumName];

  try {
    let data = await apiFetch(route); // -> Array<string>
    const options: Option[] = [];

    if (searchParams.get("select") === "true") {
        if (searchParams.get("empty") === "true") {
          options.push({ value: "", label: "— Sélectionner —" });
        }
        options.push(
        ...data.map((value: string) => ({
          value: value,
          label: value,
        }))
      );

      return NextResponse.json(options, { status: 200 });
    }
        if (searchParams.get("empty") === "true") {
          data = ["", ...data];
        }

    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to load enum" },
      { status: 500 }
    );
  }
}
