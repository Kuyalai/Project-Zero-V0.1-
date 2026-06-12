import type { ReactNode } from "react";

import { ActionLink } from "@/components/ActionButton";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(35,152,132,0.12),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(239,171,68,0.12),_transparent_24%),linear-gradient(180deg,_#f7faf9_0%,_#edf3f2_100%)] text-slate-800">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-calm-700">Ramathibodi Nursing Council OS</p>
            <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">Ramathibodi Nursing Student Council</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-[0.97rem]">
              พื้นที่ต้นแบบสำหรับจัดการงาน เอกสาร และความรู้ส่งต่อรุ่นถัดไป
            </p>
            <div className="pt-1">
              <ActionLink href="/guide" variant="secondary" size="md">
                เริ่มต้นใช้งานสำหรับผู้ใช้ใหม่
              </ActionLink>
            </div>
          </div>
          <Navigation />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
