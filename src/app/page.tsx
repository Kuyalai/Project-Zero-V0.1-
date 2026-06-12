import { ActionLink } from "@/components/ActionButton";
import { CartoonPerson } from "@/components/CartoonPerson";
import { Badge } from "@/components/Badge";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { readTrialData } from "@/lib/trialDb";

const quickLinks = [
  { href: "/dashboard", label: "ภาพรวม", description: "ดูสรุปงานและเอกสาร" },
  { href: "/tasks", label: "งาน", description: "เช็กงานที่กำลังทำอยู่" },
  { href: "/documents", label: "เอกสาร", description: "เปิดคลังเอกสารสำคัญ" },
  { href: "/handover", label: "ส่งต่อ", description: "อ่านคู่มือรุ่นถัดไป" },
];

export default function HomePage() {
  const { tasks, documents } = readTrialData();
  const dashboardStats = {
    totalTasks: tasks.length,
    totalDocuments: documents.length,
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-soft sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">ต้นแบบทดลอง</Badge>
            <Badge variant="outline">V0.1</Badge>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-calm-50 px-4 py-2 text-sm font-medium text-calm-800">
              <span className="text-xl">🐣</span>
              <span>สวัสดี เราช่วยพาคุณเริ่มใช้งานเว็บนี้แบบง่าย ๆ</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="space-y-3">
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  เว็บสำหรับสภานักศึกษาพยาบาล ที่ดูเข้าใจง่ายและไม่รก
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  Project Zero V0.1 คือเว็บไซต์ต้นแบบสำหรับ Ramathibodi Nursing Student Council ใช้ดูงาน เอกสาร และบันทึกส่งต่อแบบสั้น ๆ
                  เหมาะกับผู้ใช้ใหม่ที่อยากเริ่มอ่านได้เร็ว
                </p>
              </div>
              <div className="mx-auto w-28 sm:w-32">
                <CartoonPerson mood="wave" className="drop-shadow-[0_12px_20px_rgba(35,152,132,0.12)]" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <ActionLink href="/guide" size="lg">
              เปิดคู่มือ
            </ActionLink>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.5rem] border border-calm-100 bg-gradient-to-br from-calm-50 to-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-600">ผู้ใช้ใหม่ควรเริ่มที่</p>
                <p className="mt-1 text-2xl font-semibold text-ink">คู่มือ 2 นาที</p>
              </div>
              <div className="text-3xl">🧭</div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">จากนั้นค่อยดูภาพรวม แล้วไปที่งาน เอกสาร และส่งต่อ</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="งานทั้งหมด" value={dashboardStats.totalTasks} detail="งานตัวอย่างในระบบ" tone="calm" />
            <StatCard label="เอกสาร" value={dashboardStats.totalDocuments} detail="คลังเอกสารตัวอย่าง" tone="sand" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="ทางลัด" title="ไปยังหน้าสำคัญ" description="มีแค่เมนูหลักที่ควรใช้จริงในเดโมนี้" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <ActionLink
              key={link.href}
              href={link.href}
              variant={index === 0 ? "primary" : "secondary"}
              className="min-h-[104px] items-start justify-start rounded-[1.25rem] p-5 text-left shadow-soft"
            >
              <span className="space-y-1">
                <span className="block text-base font-semibold text-ink">{link.label}</span>
                <span className="block text-sm leading-6 text-slate-600">{link.description}</span>
              </span>
            </ActionLink>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
          <SectionHeader eyebrow="สรุป" title="เว็บนี้ช่วยอะไร" description="ภาพรวมสั้น ๆ สำหรับคนที่เพิ่งเข้ามาดูครั้งแรก" />
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              ดูงานที่ต้องทำได้เร็ว
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              เปิดเอกสารสำคัญได้จากหน้าเดียว
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              มีคู่มือสำหรับส่งต่อให้รุ่นถัดไป
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
          <SectionHeader eyebrow="ขอบเขต" title="V0.1 ตั้งใจทำอะไรไว้" description="เวอร์ชันนี้ยังเป็นเดโม ไม่มีส่วนเกิน" />
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              ไม่มีล็อกอิน
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              ไม่มีฐานข้อมูล
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              ไม่มี chatbot หรือ notification
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
