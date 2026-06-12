"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";
import { appendBrowserTask } from "@/lib/browserTrialStore";

export function TaskForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsError(false);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    appendBrowserTask({
      id: `task-local-${Date.now()}`,
      title: String(payload.title ?? ""),
      owner: String(payload.owner ?? ""),
      team: String(payload.team ?? ""),
      deadline: String(payload.deadline ?? ""),
      priority: String(payload.priority ?? "ต่ำ") as never,
      status: String(payload.status ?? "ยังไม่เริ่ม") as never,
      note: String(payload.note ?? ""),
    });
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !result?.ok) {
        setMessage(`บันทึกงานไว้ในเบราว์เซอร์แล้ว (${response.status})`);
      } else {
        setMessage("บันทึกงานเรียบร้อย");
      }
      event.currentTarget.reset();
      router.refresh();
    } catch {
      setMessage("บันทึกงานไว้ในเบราว์เซอร์แล้ว");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-ink">เพิ่มงานทดลอง</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" placeholder="ชื่องาน" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="owner" placeholder="ผู้รับผิดชอบ" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="team" placeholder="ทีม" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="deadline" type="date" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="priority" placeholder="สูง/กลาง/ต่ำ" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="status" placeholder="ยังไม่เริ่ม/กำลังทำ/รอตรวจ/เสร็จแล้ว" className="min-h-11 rounded-2xl border border-line px-4" />
      </div>
      <textarea name="note" placeholder="หมายเหตุ" rows={3} className="w-full rounded-2xl border border-line px-4 py-3" />
      <ActionButton type="submit" size="lg" className="w-full sm:w-auto" disabled={loading as never}>
        {loading ? "กำลังบันทึก..." : "บันทึกงาน"}
      </ActionButton>
      {message ? <p className={`text-sm font-medium ${isError ? "text-red-600" : "text-emerald-700"}`}>{message}</p> : null}
    </form>
  );
}
