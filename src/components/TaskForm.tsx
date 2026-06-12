"use client";

import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";

export function TaskForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "บันทึกงานเรียบร้อย" : "บันทึกงานไม่สำเร็จ");
    if (response.ok) event.currentTarget.reset();
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
      <ActionButton type="submit" size="lg" className="w-full sm:w-auto">บันทึกงาน</ActionButton>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}
