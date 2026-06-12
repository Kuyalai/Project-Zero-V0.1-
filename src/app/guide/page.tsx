import { ActionLink } from "@/components/ActionButton";
import { Badge } from "@/components/Badge";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    title: "เริ่มจากหน้าแรก",
    description: "ดูว่าระบบนี้ช่วยเรื่องอะไรบ้าง และกดทางลัดไปยังหน้าที่ต้องการ",
    href: "/",
    label: "เปิดหน้าแรก",
  },
  {
    title: "เช็กภาพรวมก่อน",
    description: "เปิดหน้า ภาพรวม เพื่อดูงานด่วน เอกสารล่าสุด และสิ่งที่ต้องส่งต่อ",
    href: "/dashboard",
    label: "ดูภาพรวม",
  },
  {
    title: "จัดการงาน",
    description: "เข้าไปที่หน้า งาน เพื่อดูว่าแต่ละเรื่องอยู่ในสถานะไหนและใครรับผิดชอบ",
    href: "/tasks",
    label: "เปิดหน้างาน",
  },
  {
    title: "ค้นหาเอกสาร",
    description: "ใช้หน้า เอกสาร เมื่ออยากเปิดไฟล์อ้างอิง คู่มือ หรือแบบฟอร์มที่เกี่ยวข้อง",
    href: "/documents",
    label: "เปิดคลังเอกสาร",
  },
  {
    title: "อ่านบันทึกส่งต่อ",
    description: "ถ้ารับช่วงงานใหม่ ให้เปิดหน้า ส่งต่อ เพื่อเข้าใจบริบทและบทเรียนเดิม",
    href: "/handover",
    label: "เปิดศูนย์ส่งต่อ",
  },
];

const faq = [
  {
    q: "ถ้าเป็นผู้ใช้ใหม่ ควรเริ่มจากหน้าไหน",
    a: "เริ่มจากหน้านี้ แล้วไปต่อที่หน้า ภาพรวม ก่อนค่อยเปิด งาน เอกสาร และ ส่งต่อ ตามลำดับ",
  },
  {
    q: "ถ้าอยากรู้ว่าอะไรด่วนที่สุด",
    a: "ดูหน้า ภาพรวม เพราะมีสรุปงานด่วนและเดดไลน์ที่ใกล้ที่สุดไว้ให้แล้ว",
  },
  {
    q: "ถ้าหาไฟล์ไม่เจอ",
    a: "ให้เปิดหน้า เอกสาร แล้วดูจากหมวด ชื่อเอกสาร เจ้าของไฟล์ และคำอธิบายสั้นของแต่ละการ์ด",
  },
];

export default function GuidePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="คู่มือ"
        title="คู่มือการใช้งาน Project Zero V0.1"
        description="ออกแบบสำหรับผู้ใช้ใหม่ ให้เปิดหน้านี้ครั้งเดียวแล้วเริ่มใช้งานเว็บต่อได้ทันที"
      />

      <section className="grid gap-6 rounded-[1.6rem] border border-white/70 bg-white/90 p-5 shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">เริ่มใช้งานได้ใน 2 นาที</Badge>
            <Badge variant="outline">เหมาะกับผู้ใช้ใหม่</Badge>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              ถ้าเพิ่งเข้ามาใช้เว็บนี้ครั้งแรก ให้เริ่มตามลำดับนี้
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Project Zero V0.1 ช่วยจัดการงาน เอกสาร และความรู้ส่งต่อของสภานักศึกษาพยาบาล
              จุดสำคัญคือไม่ต้องจำทุกอย่างในครั้งเดียว แค่รู้ว่าแต่ละหน้าช่วยอะไรและควรใช้ตอนไหน
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/dashboard" size="lg">
              เริ่มที่หน้าภาพรวม
            </ActionLink>
            <ActionLink href="/documents" variant="secondary" size="lg">
              ดูคลังเอกสาร
            </ActionLink>
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-calm-100 bg-gradient-to-br from-calm-50 to-white p-5">
          <p className="text-sm font-semibold text-calm-700">จำง่าย ๆ ว่า</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li className="rounded-2xl bg-white px-4 py-3">ภาพรวม = รู้สถานะทั้งหมดเร็วที่สุด</li>
            <li className="rounded-2xl bg-white px-4 py-3">งาน = เช็กว่าอะไรค้าง อะไรเร่ง</li>
            <li className="rounded-2xl bg-white px-4 py-3">เอกสาร = หาคู่มือ แบบฟอร์ม และไฟล์อ้างอิง</li>
            <li className="rounded-2xl bg-white px-4 py-3">ส่งต่อ = เรียนรู้บริบทสำหรับรุ่นถัดไป</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="ขั้นตอน"
          title="ลำดับการใช้งานที่แนะนำ"
          description="เดินตามลำดับนี้ได้เลย ถ้าคุณยังไม่คุ้นกับระบบ"
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <Badge variant="outline">ขั้นตอน {index + 1}</Badge>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{step.title}</h2>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              <ActionLink href={step.href} variant="ghost" className="mt-5 w-full justify-between sm:w-auto">
                {step.label}
              </ActionLink>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
          <SectionHeader
            eyebrow="คำแนะนำ"
            title="วิธีใช้งานให้เข้าใจเร็ว"
            description="เคล็ดลับสั้น ๆ ที่ช่วยให้ใช้งานเว็บได้ลื่นขึ้น"
          />
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              ถ้าดูภาพรวมแล้วค่อยเจาะลงหน้ารายละเอียด จะลดการสลับหน้าไปมา
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              ถ้าไม่แน่ใจว่าเอกสารไหนใช้ทำอะไร ให้ดูหมวดและเจ้าของเอกสารก่อนเปิดไฟล์
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-calm-500" />
              ถ้ารับช่วงงานต่อจากรุ่นพี่ ให้เปิดหน้า ส่งต่อ ทุกครั้งก่อนเริ่มลงมือ
            </li>
          </ul>
        </div>

        <div className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
          <SectionHeader
            eyebrow="คำถามพบบ่อย"
            title="FAQ สำหรับผู้ใช้ใหม่"
            description="รวมคำตอบสั้น ๆ ของคำถามที่มักเกิดขึ้น"
          />
          <div className="mt-5 space-y-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-sm font-semibold text-ink">{item.q}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
