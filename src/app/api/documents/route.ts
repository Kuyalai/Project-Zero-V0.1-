import { NextResponse } from "next/server";

import { addDocument, readTrialData } from "@/lib/trialDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const { documents } = readTrialData();
  return NextResponse.json({ ok: true, documents });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const category = String(body.category ?? "").trim();
  const owner = String(body.owner ?? "").trim();
  const updatedAt = String(body.updatedAt ?? "").trim();
  const visibility = String(body.visibility ?? "").trim();
  const fileUrl = String(body.fileUrl ?? "").trim();
  const summary = String(body.summary ?? "").trim();

  if (!name || !category || !owner || !updatedAt || !visibility || !fileUrl || !summary) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  const saved = addDocument({ name, category, owner, updatedAt, visibility: visibility as never, fileUrl, summary });
  return NextResponse.json({ ok: true, saved });
}
