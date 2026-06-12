"use client";

import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";

export function HandoverForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    const response = await fetch("/api/handover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "บันทึกบันทึกส่งต่อเรียบร้อย" : "บันทึกส่งต่อไม่สำเร็จ");
    if (response.ok) event.currentTarget.reset();
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
      <ActionButton type="submit" size="lg" className="w-full sm:w-auto">บันทึกส่งต่อ</ActionButton>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}
