import { SectionHeader } from "@/components/SectionHeader";
import { TaskForm } from "@/components/TaskForm";
import { TaskBoard } from "@/components/TaskBoard";
import { readTrialData } from "@/lib/trialDb";
import type { TaskStatus } from "@/data/mockData";

const statuses: TaskStatus[] = ["ยังไม่เริ่ม", "กำลังทำ", "รอตรวจ", "เสร็จแล้ว"];

export default function TasksPage() {
  const { tasks } = readTrialData();
  return (
    <div className="space-y-8">
      <TaskForm />
      <SectionHeader
        eyebrow="งาน"
        title="งานทั้งหมดแยกตามสถานะ"
        description="การ์ดแต่ละใบแสดงเจ้าของทีม กำหนดส่ง ความสำคัญ และหมายเหตุสำคัญ"
      />

      <section className="grid gap-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft lg:grid-cols-3">
        <div className="rounded-2xl bg-calm-50 px-4 py-4">
          <p className="text-sm font-semibold text-ink">อ่านบนมือถือได้ง่าย</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">แต่ละการ์ดเรียงเป็นแนวตั้ง ไม่มีตารางยาวให้ต้องซูม</p>
        </div>
        <div className="rounded-2xl bg-calm-50 px-4 py-4">
          <p className="text-sm font-semibold text-ink">ดูสถานะเร็ว</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">สีและป้ายช่วยแยกงานยังไม่เริ่ม กำลังทำ รอตรวจ และเสร็จแล้ว</p>
        </div>
        <div className="rounded-2xl bg-calm-50 px-4 py-4">
          <p className="text-sm font-semibold text-ink">คัดงานสำคัญก่อน</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">ป้ายกำหนดส่งและความสำคัญช่วยให้รู้ว่าต้องทำอะไรก่อน</p>
        </div>
      </section>

      <TaskBoard initialTasks={tasks} statuses={statuses} />
    </div>
  );
}
