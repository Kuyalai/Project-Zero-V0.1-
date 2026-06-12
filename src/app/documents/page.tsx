import Link from "next/link";
import { ActionLink } from "@/components/ActionButton";
import { DocumentCard } from "@/components/DocumentCard";
import { DocumentForm } from "@/components/DocumentForm";
import { SectionHeader } from "@/components/SectionHeader";
import { readTrialData } from "@/lib/trialDb";

export default function DocumentsPage() {
  const { documents } = readTrialData();
  return (
    <div className="space-y-8">
      <DocumentForm />
      <SectionHeader
        eyebrow="เอกสาร"
        title="คลังเอกสารที่ค้นง่ายและเปิดอ่านสบาย"
        description="หน้าเอกสารออกแบบให้คนใหม่เข้าใจได้ทันทีว่าไฟล์ไหนคืออะไร ใครดูแล และควรเปิดอ่านเมื่อไร"
        action={
          <ActionLink href="/guide" variant="secondary">
            วิธีใช้คลังเอกสาร
          </ActionLink>
        }
      />

      <section className="grid gap-5 rounded-[1.45rem] border border-line bg-white/95 p-5 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">ใช้งานครั้งแรก</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">เริ่มจากดูชื่อไฟล์ หมวด และเจ้าของเอกสาร</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              ทุกการ์ดมีข้อมูลสำคัญครบในบรรทัดเดียวกัน ช่วยให้รู้ได้เร็วว่าไฟล์นี้ใช้ทำอะไร ควรเปิดเมื่อไร และต้องถามใครถ้าต้องอัปเดตต่อ
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-calm-100 bg-calm-50 p-4">
              <p className="text-sm font-semibold text-ink">เหมาะกับผู้ใช้ใหม่</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">ไม่ต้องจำชื่อไฟล์เอง เริ่มจากหมวดและคำอธิบายสั้น ๆ ได้เลย</p>
            </div>
            <div className="rounded-2xl border border-calm-100 bg-calm-50 p-4">
              <p className="text-sm font-semibold text-ink">ดูต่อได้ทันที</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">ถ้าเจอไฟล์ที่เกี่ยวข้อง สามารถกดเปิดไฟล์ตัวอย่างได้จากการ์ดเดียวกัน</p>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-sm font-semibold text-ink">ลำดับการใช้งานที่แนะนำ</p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>1. ดูหมวดเอกสารก่อน เพื่อจับว่าไฟล์นี้อยู่กลุ่มไหน</li>
              <li>2. อ่านคำอธิบายสั้นเพื่อรู้บริบท</li>
              <li>3. เช็กเจ้าของเอกสารและวันอัปเดตล่าสุด</li>
              <li>4. เปิดไฟล์เมื่อพร้อมอ่านรายละเอียดต่อ</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-dashed border-line px-4 py-4">
            <p className="text-sm font-semibold text-ink">ถ้ายังไม่แน่ใจว่าจะเริ่มตรงไหน</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">เปิดหน้าคู่มือก่อน แล้วกลับมาดูคลังเอกสารอีกครั้ง จะช่วยให้เห็น flow เร็วขึ้นมาก</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft lg:grid-cols-3">
        <div className="rounded-2xl bg-calm-50 px-4 py-4">
          <p className="text-sm font-semibold text-ink">เน้นอ่านเร็ว</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">ข้อมูลสำคัญอยู่ด้านบน และมีปุ่มเปิดไฟล์ตัวอย่างชัดเจน</p>
        </div>
        <div className="rounded-2xl bg-calm-50 px-4 py-4">
          <p className="text-sm font-semibold text-ink">ไม่ล้นจอมือถือ</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">ใช้การ์ดแทนตารางบนจอเล็กเพื่อเลี่ยงการเลื่อนแนวนอน</p>
        </div>
        <div className="rounded-2xl bg-calm-50 px-4 py-4">
          <p className="text-sm font-semibold text-ink">มองหาง่าย</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">มีป้ายหมวดและการมองเห็นของเอกสารกำกับทุกไฟล์</p>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
}
