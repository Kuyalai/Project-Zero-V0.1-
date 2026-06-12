"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";
import { appendBrowserHandover } from "@/lib/browserTrialStore";

export function HandoverForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestHandover, setLatestHandover] = useState<{
    title: string;
    category: string;
    owner: string;
    updatedAt: string;
    content: string[];
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsError(false);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const content = String(formData.get("content") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const payload = {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? ""),
      owner: String(formData.get("owner") ?? ""),
      updatedAt: String(formData.get("updatedAt") ?? ""),
      content,
    };
    const nextHandover = {
      id: `hand-local-${Date.now()}`,
      title: payload.title,
      category: payload.category as never,
      owner: payload.owner,
      updatedAt: payload.updatedAt,
      content: payload.content,
    };
    appendBrowserHandover(nextHandover);
    setLatestHandover(nextHandover);
    try {
      const response = await fetch("/api/handover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      setMessage(response.ok && result?.ok ? "บันทึกส่งต่อเรียบร้อย" : `บันทึกส่งต่อไว้ในเบราว์เซอร์แล้ว (${response.status})`);
      event.currentTarget.reset();
      router.refresh();
    } catch {
      setMessage("บันทึกส่งต่อไว้ในเบราว์เซอร์แล้ว");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-ink">เพิ่มบันทึกส่งต่อ</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" placeholder="หัวข้อ" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="category" placeholder="หมวด" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="owner" placeholder="เจ้าของ" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="updatedAt" type="date" className="min-h-11 rounded-2xl border border-line px-4" />
      </div>
      <textarea name="content" placeholder="ใส่รายการทีละบรรทัด" rows={4} className="w-full rounded-2xl border border-line px-4 py-3" />
      <ActionButton type="submit" size="lg" className="w-full sm:w-auto" disabled={loading as never}>
        {loading ? "กำลังบันทึก..." : "บันทึกส่งต่อ"}
      </ActionButton>
      {message ? <p className={`text-sm font-medium ${isError ? "text-red-600" : "text-emerald-700"}`}>{message}</p> : null}
      {latestHandover ? (
        <div className="rounded-2xl border border-calm-200 bg-calm-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">บันทึกล่าสุด</p>
          <p className="mt-2 text-base font-semibold text-ink">{latestHandover.title}</p>
          <p className="mt-1 text-sm text-slate-600">{latestHandover.category} · {latestHandover.owner}</p>
          <p className="mt-2 text-sm text-slate-600">อัปเดต {latestHandover.updatedAt} · {latestHandover.content.length} บรรทัด</p>
        </div>
      ) : null}
    </form>
  );
}
