import { Badge } from "@/components/Badge";
import type { TaskItem } from "@/data/mockData";
import { formatThaiDate, relativeDeadlineLabel } from "@/lib/format";

type TaskCardProps = {
  task: TaskItem;
};

const priorityVariant = {
  สูง: "urgent",
  กลาง: "soft",
  ต่ำ: "outline",
} as const;

const statusVariant = {
  "ยังไม่เริ่ม": "outline",
  "กำลังทำ": "default",
  "รอตรวจ": "soft",
  "เสร็จแล้ว": "default",
} as const;

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-7 text-ink">{task.title}</h3>
            <p className="mt-1 text-sm text-slate-600">
              {task.owner} · {task.team}
            </p>
          </div>
          <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
          <Badge variant="outline">{relativeDeadlineLabel(task.deadline)}</Badge>
        </div>
        <dl className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <dt className="font-medium text-slate-700">กำหนดส่ง</dt>
            <dd>{formatThaiDate(task.deadline)}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <dt className="font-medium text-slate-700">หมายเหตุ</dt>
            <dd className="leading-6">{task.note}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
