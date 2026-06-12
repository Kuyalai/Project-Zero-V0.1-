"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ActionButton } from "@/components/ActionButton";
import { cn } from "@/lib/cn";
import { resetBrowserTrialDb } from "@/lib/browserTrialStore";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/guide", label: "คู่มือ" },
  { href: "/dashboard", label: "ภาพรวม" },
  { href: "/tasks", label: "งาน" },
  { href: "/documents", label: "เอกสาร" },
  { href: "/handover", label: "ส่งต่อ" },
  { href: "/feedback", label: "ความเห็น" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <div
        role="status"
        className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"
      >
        ข้อมูลทดลองที่เพิ่มจากหน้านี้จะเก็บในเครื่องนี้ก่อน ถ้าต้องการล้างเพื่อเริ่มใหม่ กดปุ่มรีเซ็ตข้อมูลทดลองด้านล่าง
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <nav
          aria-label="Main navigation"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-5",
                  "whitespace-nowrap",
                  active
                    ? "border-transparent bg-[linear-gradient(135deg,#239884_0%,#45b89f_48%,#87d9c8_100%)] text-white shadow-[0_10px_24px_rgba(35,152,132,0.22)]"
                    : "border-line bg-white/78 text-slate-700 shadow-[0_8px_20px_rgba(148,163,184,0.08)] hover:-translate-y-0.5 hover:border-calm-200 hover:bg-white active:translate-y-0 active:scale-[0.98]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ActionButton
          type="button"
          variant="secondary"
          size="md"
          className="sm:ml-auto"
          onClick={() => {
            resetBrowserTrialDb();
            window.location.reload();
          }}
        >
          รีเซ็ตข้อมูลทดลอง
        </ActionButton>
      </div>
    </div>
  );
}
