"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

import { ActionButton } from "@/components/ActionButton";
import { Badge } from "@/components/Badge";
import { readBrowserTrialDb, writeBrowserTrialDb } from "@/lib/browserTrialStore";

const roles = ["กรรมการ", "หัวหน้าทีม", "เลขานุการ", "ผู้ช่วยงาน", "อื่น ๆ"];

export function FeedbackForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [latestFeedback, setLatestFeedback] = useState<{
    name: string;
    role: string;
    useful: string;
    suggestions: string;
    rating: number;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      useful: String(formData.get("useful") ?? ""),
      confusing: String(formData.get("confusing") ?? ""),
      suggestions: String(formData.get("suggestions") ?? ""),
      rating,
    };
    const current = readBrowserTrialDb();
    const nextFeedback = [
      {
        ...payload,
        createdAt: new Date().toISOString(),
      },
      ...(((current as unknown as { feedback?: Array<typeof payload & { createdAt: string }> }).feedback) ?? []),
    ];
    writeBrowserTrialDb({ ...(current as unknown as Record<string, unknown>), feedback: nextFeedback } as never);
    setLatestFeedback(payload);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) {
        setError(result.message ?? "ส่งความคิดเห็นไม่สำเร็จ ลองอีกครั้งได้เลย");
        return;
      }
      setSubmitted(true);
      setSuccess("ส่งความคิดเห็นเรียบร้อย");
      event.currentTarget.reset();
      setRating(5);
      router.refresh();
    } catch {
      setError("เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">แบบฟอร์มความเห็น</p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">บอกเราว่าหน้านี้ช่วยงานคุณแค่ไหน</h2>
          <p className="text-sm leading-6 text-slate-600">
            ฟอร์มนี้ใช้สำหรับเก็บความเห็นในเดโมเท่านั้น ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            ชื่อ
            <input
              name="name"
              required
              className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-calm-500"
              placeholder="ชื่อของคุณ"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            บทบาท
            <select
              name="role"
              required
              className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-calm-500"
              defaultValue=""
            >
              <option value="" disabled>
                เลือกบทบาท
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          สิ่งที่มีประโยชน์
          <textarea
            name="useful"
            rows={4}
            required
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-calm-500"
            placeholder="ส่วนไหนช่วยให้เข้าใจงานเร็วขึ้น"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          สิ่งที่ยังสับสน
          <textarea
            name="confusing"
            rows={4}
            required
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-calm-500"
            placeholder="มีจุดไหนที่อยากให้ชัดขึ้น"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          ข้อเสนอแนะ
          <textarea
            name="suggestions"
            rows={4}
            required
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-calm-500"
            placeholder="อยากให้เพิ่มอะไรใน V0.2"
          />
        </label>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">คะแนนความพึงพอใจ</p>
          <div className="grid grid-cols-5 gap-2 sm:flex sm:flex-wrap">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`min-h-12 rounded-full border px-4 text-sm font-medium transition ${
                  rating === value
                    ? "border-calm-600 bg-calm-600 text-white"
                    : "border-line bg-white text-slate-700 hover:bg-calm-50"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <input type="hidden" name="rating" value={rating} />
        <ActionButton type="submit" size="lg" className="w-full" disabled={loading as never}>
          {loading ? "กำลังส่ง..." : "ส่งความคิดเห็น"}
        </ActionButton>
        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
        {success ? <p className="text-sm font-medium text-emerald-700">{success}</p> : null}
        {latestFeedback ? (
          <div className="rounded-2xl border border-calm-200 bg-calm-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">ความเห็นล่าสุด</p>
            <p className="mt-2 text-base font-semibold text-ink">{latestFeedback.name}</p>
            <p className="mt-1 text-sm text-slate-600">{latestFeedback.role} · ให้คะแนน {latestFeedback.rating}/5</p>
            <p className="mt-2 text-sm text-slate-600">{latestFeedback.suggestions}</p>
          </div>
        ) : null}
      </form>

      <aside className="space-y-4 rounded-[1.35rem] border border-line bg-calm-50 p-5 shadow-soft sm:p-6">
        <div className="space-y-2">
          <Badge variant="default">ไม่มี backend</Badge>
          <h3 className="text-xl font-semibold text-ink">ผลลัพธ์แบบเดโม</h3>
          <p className="text-sm leading-6 text-slate-600">
            เมื่อกดส่ง ระบบจะแสดงข้อความสำเร็จทันที เพื่อใช้ทดสอบประสบการณ์การใช้งานและ flow ของฟอร์ม
          </p>
        </div>
        <div className="rounded-2xl border border-calm-100 bg-white p-4">
          <p className="text-sm font-medium text-slate-700">สถานะล่าสุด</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {submitted ? "ได้รับความคิดเห็นแล้ว ขอบคุณสำหรับข้อมูลที่ช่วยพัฒนาต้นแบบนี้" : "ยังไม่ได้ส่งความคิดเห็น"}
          </p>
        </div>
      </aside>
    </div>
  );
}
