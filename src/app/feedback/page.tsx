import { CartoonPerson } from "@/components/CartoonPerson";
import { FeedbackForm } from "@/components/FeedbackForm";
import { SectionHeader } from "@/components/SectionHeader";

export default function FeedbackPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-soft sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-3">
          <SectionHeader
            eyebrow="ความเห็น"
            title="แบบฟอร์มความคิดเห็นสำหรับต้นแบบ"
            description="ใช้ทดสอบความเข้าใจและความชัดเจนของ Project Zero V0.1 โดยไม่ต้องเชื่อม backend"
          />
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            ถ้ารู้สึกว่าหน้าไหนรกไปหรืออ่านยาก บอกเราได้เลย เดี๋ยวจะเก็บให้เรียบและใช้งานง่ายขึ้นอีก
          </p>
        </div>
        <div className="mx-auto w-32 sm:w-36">
          <CartoonPerson mood="smile" className="drop-shadow-[0_12px_20px_rgba(35,152,132,0.12)]" />
        </div>
      </section>

      <FeedbackForm />
    </div>
  );
}
