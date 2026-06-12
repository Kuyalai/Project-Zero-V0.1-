import { NextResponse } from "next/server";

import { addTask, readTrialData } from "@/lib/trialDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const { tasks } = readTrialData();
  return NextResponse.json({ ok: true, tasks });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const title = String(body.title ?? "").trim();
  const owner = String(body.owner ?? "").trim();
  const team = String(body.team ?? "").trim();
  const deadline = String(body.deadline ?? "").trim();
  const priority = String(body.priority ?? "").trim();
  const status = String(body.status ?? "").trim();
  const note = String(body.note ?? "").trim();

  if (!title || !owner || !team || !deadline || !priority || !status || !note) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  const saved = addTask({ title, owner, team, deadline, priority: priority as never, status: status as never, note });
  return NextResponse.json({ ok: true, saved });
}
