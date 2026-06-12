import { SectionHeader } from "@/components/SectionHeader";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { readTrialData } from "@/lib/trialDb";
import type { TaskStatus } from "@/data/mockData";

const statuses: TaskStatus[] = ["ยังไม่เริ่ม", "กำลังทำ", "รอตรวจ", "เสร็จแล้ว"];

export default function TasksPage() {
  const { tasks } = readTrialData();
  const grouped = statuses.map((status) => ({
    status,
    items: tasks.filter((task) => task.status === status),
  }));

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

      <div className="space-y-6">
        {grouped.map(({ status, items }) => (
          <section key={status} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{status}</h2>
              <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {items.length} รายการ
              </span>
            </div>
            {items.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {items.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-white p-5 text-sm text-slate-500">
                ไม่มีงานในสถานะนี้
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
