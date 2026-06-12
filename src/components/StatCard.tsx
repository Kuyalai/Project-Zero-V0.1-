import { Badge } from "@/components/Badge";
import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string | number;
  detail: string;
  tone?: "calm" | "sand" | "rose" | "slate";
  note?: string;
};

const tones: Record<NonNullable<StatCardProps["tone"]>, string> = {
  calm: "from-calm-50 to-white border-calm-100",
  sand: "from-sand-50 to-white border-amber-100",
  rose: "from-rose-50 to-white border-rose-100",
  slate: "from-slate-50 to-white border-line",
};

export function StatCard({ label, value, detail, tone = "calm", note }: StatCardProps) {
  return (
    <div className={cn("rounded-[1.35rem] border bg-gradient-to-br p-5 shadow-soft transition hover:-translate-y-0.5", tones[tone])}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-[2rem]">{value}</p>
        </div>
        <Badge variant="outline">สรุป</Badge>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-[0.95rem]">{detail}</p>
      {note ? <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{note}</p> : null}
    </div>
  );
}
