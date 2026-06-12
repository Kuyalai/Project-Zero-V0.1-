import { NextResponse } from "next/server";

import { addHandover, readTrialData } from "@/lib/trialDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const { handoverNotes } = readTrialData();
  return NextResponse.json({ ok: true, handoverNotes });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const title = String(body.title ?? "").trim();
  const category = String(body.category ?? "").trim();
  const owner = String(body.owner ?? "").trim();
  const updatedAt = String(body.updatedAt ?? "").trim();
  const content = Array.isArray(body.content) ? body.content.map((item) => String(item).trim()).filter(Boolean) : [];

  if (!title || !category || !owner || !updatedAt || content.length === 0) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  const saved = addHandover({ title, category: category as never, owner, updatedAt, content });
  return NextResponse.json({ ok: true, saved });
}
