import { HandoverCard } from "@/components/HandoverCard";
import { HandoverForm } from "@/components/HandoverForm";
import { SectionHeader } from "@/components/SectionHeader";
import { readTrialData } from "@/lib/trialDb";

const categories = [
  "คู่มือบทบาท",
  "บทเรียนจากกิจกรรม",
  "เช็กลิสต์",
  "สรุปรายปี",
  "คำแนะนำ",
] as const;

export default function HandoverPage() {
  const { handoverNotes } = readTrialData();
  return (
    <div className="space-y-8">
      <HandoverForm />
      <SectionHeader
        eyebrow="ส่งต่อ"
        title="ศูนย์รวมความรู้สำหรับรุ่นถัดไป"
        description="รวมบทบาทหลัก บทเรียนจากกิจกรรม รายการตรวจ และคำแนะนำที่ช่วยให้คนถัดไปเริ่มงานได้เร็ว"
      />

      <section className="grid gap-4 rounded-[1.35rem] border border-line bg-white p-5 shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-calm-700">เริ่มอ่านตรงนี้</p>
          <h2 className="text-xl font-semibold tracking-tight text-ink">ถ้าคุณเป็นรุ่นถัดไป ให้เริ่มจาก 4 ขั้นนี้</h2>
          <ol className="space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-calm-100 text-xs font-semibold text-calm-700">1</span>
              ดูบทบาทของตำแหน่งที่คุณรับผิดชอบก่อน
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-calm-100 text-xs font-semibold text-calm-700">2</span>
              อ่านบทเรียนจากกิจกรรมเก่าที่คล้ายงานของคุณ
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-calm-100 text-xs font-semibold text-calm-700">3</span>
              เช็กเช็กลิสต์ก่อนเริ่มงานและก่อนปิดงาน
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-calm-100 text-xs font-semibold text-calm-700">4</span>
              เปิดสรุปรายปีเพื่อเห็นภาพรวมและสิ่งที่ต้องพัฒนา
            </li>
          </ol>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl bg-calm-50 px-4 py-4">
            <p className="text-sm font-semibold text-ink">สิ่งที่ควรเก็บ</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">ขั้นตอน สรุปมติ ลิงก์ไฟล์ และชื่อผู้รับผิดชอบ</p>
          </div>
          <div className="rounded-2xl bg-calm-50 px-4 py-4">
            <p className="text-sm font-semibold text-ink">สิ่งที่ควรเขียนต่อ</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">บันทึกปัญหาเดิมและวิธีแก้ไว้ให้ละเอียดขึ้นทุกครั้ง</p>
          </div>
          <div className="rounded-2xl bg-calm-50 px-4 py-4">
            <p className="text-sm font-semibold text-ink">สิ่งที่ไม่ควรหาย</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">ชื่อไฟล์เวอร์ชันล่าสุดและที่เก็บเอกสารกลาง</p>
          </div>
          <div className="rounded-2xl bg-calm-50 px-4 py-4">
            <p className="text-sm font-semibold text-ink">ผลลัพธ์ที่ดี</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">คนใหม่เปิดดูแล้วเริ่มทำงานต่อได้โดยไม่ต้องถามซ้ำเยอะ</p>
          </div>
        </div>
      </section>

      <div className="space-y-8">
        {categories.map((category) => {
          const items = handoverNotes.filter((note) => note.category === category);
          return (
            <section key={category} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-ink">{category}</h2>
                <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-slate-600">
                  {items.length} รายการ
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {items.map((note) => (
                  <HandoverCard key={note.id} note={note} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
