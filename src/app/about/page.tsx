import { ActionLink } from "@/components/ActionButton";
import { SectionHeader } from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="เกี่ยวกับโครงการ"
        title="Ramathibodi Nursing Council OS คืออะไร"
        description="หน้าแนะนำสาธารณะสำหรับคนที่ต้องการเข้าใจโครงการนี้แบบรวดเร็ว"
      />

      <section className="grid gap-6 rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-soft sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">เว็บต้นแบบสำหรับการทำงานของสภานักศึกษาพยาบาล</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            โครงการนี้ถูกออกแบบมาเพื่อช่วยจัดการงาน เอกสาร บันทึกส่งต่อ และความคิดเห็นจากผู้ใช้ในที่เดียว
            เป้าหมายคือทำให้ทีมงานใช้เว็บได้จริงในชีวิตประจำวัน และให้รุ่นถัดไปเข้าใจระบบต่อได้ง่าย
          </p>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/guide">อ่านคู่มือ</ActionLink>
            <ActionLink href="/dashboard" variant="secondary">
              ดูภาพรวม
            </ActionLink>
          </div>
        </div>
        <div className="rounded-[1.35rem] border border-calm-100 bg-calm-50 p-5">
          <p className="text-sm font-semibold text-calm-700">สิ่งที่มีในตอนนี้</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>• หน้าสำหรับดูงาน เอกสาร และบันทึกส่งต่อ</li>
            <li>• ฟอร์มทดลองเพิ่มข้อมูลได้จริง</li>
            <li>• ฟีดแบ็กที่บันทึกเข้า backend ทดลอง</li>
            <li>• sitemap และ robots พร้อมสำหรับ search engine</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
