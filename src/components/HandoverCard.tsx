import { Badge } from "@/components/Badge";
import type { HandoverItem } from "@/data/mockData";
import { formatThaiDate } from "@/lib/format";

type HandoverCardProps = {
  note: HandoverItem;
};

export function HandoverCard({ note }: HandoverCardProps) {
  return (
    <article className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <Badge variant="outline">{note.category}</Badge>
            <h3 className="text-lg font-semibold leading-7 text-ink">{note.title}</h3>
            <p className="text-sm text-slate-600">ดูแลโดย {note.owner}</p>
          </div>
          <Badge variant="default">{formatThaiDate(note.updatedAt)}</Badge>
        </div>
        <ul className="space-y-3">
          {note.content.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
