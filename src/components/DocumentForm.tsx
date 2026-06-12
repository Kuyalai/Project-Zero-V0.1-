"use client";

import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";

export function DocumentForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "บันทึกเอกสารเรียบร้อย" : "บันทึกเอกสารไม่สำเร็จ");
    if (response.ok) event.currentTarget.reset();
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
      <ActionButton type="submit" size="lg" className="w-full sm:w-auto">บันทึกเอกสาร</ActionButton>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}
