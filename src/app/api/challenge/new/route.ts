import { NextResponse } from "next/server";
import { API_ROUTES } from "@/api/routes";
import { apiFetch } from "@/api/fetch";

export async function POST(req: Request) {

  try {
    const payload = await req.json();
    const data = await apiFetch(API_ROUTES.challenge.create, {
      body: payload,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to create challenge" },
      { status: 500 }
    );
  }
}