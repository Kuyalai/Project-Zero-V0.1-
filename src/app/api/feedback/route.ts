import { NextResponse } from "next/server";

import { addFeedback, readTrialDb } from "@/lib/trialDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const db = readTrialDb();
  return NextResponse.json({
    ok: true,
    count: db.feedback.length,
    feedback: db.feedback,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const useful = typeof body.useful === "string" ? body.useful.trim() : "";
  const confusing = typeof body.confusing === "string" ? body.confusing.trim() : "";
  const suggestions = typeof body.suggestions === "string" ? body.suggestions.trim() : "";
  const rating = Number(body.rating);

  if (!name || !role || !useful || !confusing || !suggestions || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  const saved = addFeedback({ name, role, useful, confusing, suggestions, rating });

  return NextResponse.json({ ok: true, saved });
}
