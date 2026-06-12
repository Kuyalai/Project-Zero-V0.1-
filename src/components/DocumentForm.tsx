"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";
import { appendBrowserDocument } from "@/lib/browserTrialStore";

export function DocumentForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestDocument, setLatestDocument] = useState<{
    name: string;
    category: string;
    owner: string;
    updatedAt: string;
    visibility: string;
    fileUrl: string;
    summary: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsError(false);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const nextDocument = {
      id: `doc-local-${Date.now()}`,
      name: String(payload.name ?? ""),
      category: String(payload.category ?? ""),
      owner: String(payload.owner ?? ""),
      updatedAt: String(payload.updatedAt ?? ""),
      visibility: String(payload.visibility ?? "สาธารณะ") as never,
      fileUrl: String(payload.fileUrl ?? ""),
      summary: String(payload.summary ?? ""),
    };
    appendBrowserDocument(nextDocument);
    setLatestDocument(nextDocument);
    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      setMessage(response.ok && result?.ok ? "บันทึกเอกสารเรียบร้อย" : `บันทึกเอกสารไว้ในเบราว์เซอร์แล้ว (${response.status})`);
      event.currentTarget.reset();
      router.refresh();
    } catch {
      setMessage("บันทึกเอกสารไว้ในเบราว์เซอร์แล้ว");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-ink">เพิ่มเอกสารทดลอง</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="ชื่อเอกสาร" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="category" placeholder="หมวดเอกสาร" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="owner" placeholder="เจ้าของ" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="updatedAt" type="date" className="min-h-11 rounded-2xl border border-line px-4" />
        <input name="visibility" placeholder="สาธารณะ/ภายในทีม/เฉพาะกรรมการ" className="min-h-11 rounded-2xl border border-line px-4 sm:col-span-2" />
        <input name="fileUrl" placeholder="ลิงก์ไฟล์" className="min-h-11 rounded-2xl border border-line px-4 sm:col-span-2" />
      </div>
      <textarea name="summary" placeholder="สรุปสั้น ๆ" rows={3} className="w-full rounded-2xl border border-line px-4 py-3" />
      <ActionButton type="submit" size="lg" className="w-full sm:w-auto" disabled={loading as never}>
        {loading ? "กำลังบันทึก..." : "บันทึกเอกสาร"}
      </ActionButton>
      {message ? <p className={`text-sm font-medium ${isError ? "text-red-600" : "text-emerald-700"}`}>{message}</p> : null}
      {latestDocument ? (
        <div className="rounded-2xl border border-calm-200 bg-calm-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">บันทึกล่าสุด</p>
          <p className="mt-2 text-base font-semibold text-ink">{latestDocument.name}</p>
          <p className="mt-1 text-sm text-slate-600">{latestDocument.category} · {latestDocument.owner}</p>
          <p className="mt-2 text-sm text-slate-600">อัปเดต {latestDocument.updatedAt} · {latestDocument.visibility}</p>
        </div>
      ) : null}
    </form>
  );
}
