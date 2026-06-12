import Link from "next/link";
import { ActionLink } from "@/components/ActionButton";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { DocumentCard } from "@/components/DocumentCard";
import { HandoverCard } from "@/components/HandoverCard";
import { readTrialData } from "@/lib/trialDb";

export default function DashboardPage() {
  const { tasks, documents, handoverNotes } = readTrialData();
  const recentTasks = tasks.slice(0, 3);
  const recentDocuments = documents.slice(0, 3);
  const recentHandover = handoverNotes.slice(0, 3);
  const urgentTasks = tasks.filter((task) => task.priority === "สูง").length;
  const upcomingDeadlines = tasks.filter((task) => ["2026-06-12", "2026-06-13", "2026-06-14"].includes(task.deadline)).length;
  const dashboardStats = {
    totalTasks: tasks.length,
    urgentTasks,
    upcomingDeadlines,
    totalDocuments: documents.length,
    handoverNotes: handoverNotes.length,
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="ภาพรวม"
        title="อ่านสถานะทั้งหมดให้จบในหน้าเดียว"
        description="หน้านี้ออกแบบมาให้เห็นงานด่วน เอกสารล่าสุด และเรื่องที่ต้องส่งต่อได้ในไม่กี่นาที"
        action={
          <ActionLink href="/guide" variant="secondary">
            ดูคู่มือ
          </ActionLink>
        }
      />

      <section className="grid gap-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">วิธีอ่านเร็ว</p>
          <h2 className="text-xl font-semibold tracking-tight text-ink">เริ่มดู 3 จุดนี้ก่อน</h2>
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-2xl bg-calm-50 px-4 py-4">
              <p className="font-medium text-ink">1. งานด่วน</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">ดูจำนวนงานเร่งด่วนและงานใกล้ถึงเดดไลน์ก่อน</p>
            </div>
            <div className="rounded-2xl bg-calm-50 px-4 py-4">
              <p className="font-medium text-ink">2. งานล่าสุด</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">เช็กว่าทีมกำลังทำอะไรอยู่และติดตรงไหน</p>
            </div>
            <div className="rounded-2xl bg-calm-50 px-4 py-4">
              <p className="font-medium text-ink">3. ส่งต่อ</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">อ่านบันทึกที่ช่วยให้รุ่นถัดไปเริ่มงานต่อได้เร็ว</p>
            </div>
          </div>
        </div>
        <div className="rounded-[1.2rem] border border-calm-100 bg-gradient-to-br from-calm-50 to-white p-5">
          <p className="text-sm font-medium text-slate-600">สรุปวันนี้</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">{dashboardStats.urgentTasks}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">งานด่วนที่ควรโฟกัสก่อนเปิดหน้าอื่น</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">งานใกล้ถึง</p>
              <p className="mt-1 text-lg font-semibold text-ink">{dashboardStats.upcomingDeadlines}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">เอกสาร</p>
              <p className="mt-1 text-lg font-semibold text-ink">{dashboardStats.totalDocuments}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="งานทั้งหมด"
          value={dashboardStats.totalTasks}
          detail="งานตัวอย่างที่เก็บอยู่ในระบบ"
          tone="calm"
          note="ดูภาพรวม"
        />
        <StatCard
          label="งานด่วน"
          value={dashboardStats.urgentTasks}
          detail="งานที่ถูกจัดเป็นความสำคัญสูง"
          tone="rose"
          note="ต้องดูวันนี้"
        />
        <StatCard
          label="เดดไลน์ใกล้ถึง"
          value={dashboardStats.upcomingDeadlines}
          detail="งานที่ครบกำหนดภายในช่วงสั้น ๆ"
          tone="sand"
          note="โฟกัสสั้น ๆ"
        />
        <StatCard
          label="เอกสารทั้งหมด"
          value={dashboardStats.totalDocuments}
          detail="ไฟล์ในคลังเอกสารตัวอย่าง"
          tone="slate"
          note="พร้อมเปิดอ่าน"
        />
        <StatCard
          label="บันทึกส่งต่อ"
          value={dashboardStats.handoverNotes}
          detail="ชุดความรู้สำหรับรุ่นถัดไป"
          tone="calm"
          note="ใช้ส่งมอบ"
        />
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="งานล่าสุด"
          title="สิ่งที่ทีมกำลังทำตอนนี้"
          description="รายการตัวอย่างที่เน้นสิ่งสำคัญก่อน"
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {recentTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="เอกสารล่าสุด"
          title="ไฟล์สำคัญที่ควรรู้จัก"
          description="เอกสารที่ทีมอัปเดตบ่อยและควรเข้าถึงได้ง่าย"
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {recentDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="ส่งต่อ"
          title="บันทึกที่ช่วยให้รุ่นถัดไปเริ่มงานได้เร็ว"
          description="สรุปบทเรียน แนวทาง และเช็กลิสต์ที่ช่วยให้คนรุ่นถัดไปเริ่มงานได้เร็ว"
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {recentHandover.map((note) => (
            <HandoverCard key={note.id} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
