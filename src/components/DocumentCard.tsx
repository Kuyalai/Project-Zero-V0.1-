import { ActionLink } from "@/components/ActionButton";
import { Badge } from "@/components/Badge";
import type { DocumentItem } from "@/data/mockData";
import { formatThaiDate } from "@/lib/format";

type DocumentCardProps = {
  document: DocumentItem;
};

const visibilityVariant = {
  สาธารณะ: "default",
  ภายในทีม: "soft",
  "เฉพาะกรรมการ": "urgent",
} as const;

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <article className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{document.category}</Badge>
            <Badge variant={visibilityVariant[document.visibility]}>{document.visibility}</Badge>
          </div>
          <h3 className="text-lg font-semibold leading-7 text-ink">{document.name}</h3>
          <p className="text-sm leading-6 text-slate-600">{document.summary}</p>
        </div>
        <dl className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <dt className="font-medium text-slate-700">เจ้าของเอกสาร</dt>
            <dd>{document.owner}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <dt className="font-medium text-slate-700">อัปเดตล่าสุด</dt>
            <dd>{formatThaiDate(document.updatedAt)}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-xs text-slate-500">ไฟล์ตัวอย่าง</span>
          <ActionLink href={document.fileUrl} target="_blank" rel="noreferrer" size="md">
            เปิดไฟล์
          </ActionLink>
        </div>
      </div>
    </article>
  );
}
