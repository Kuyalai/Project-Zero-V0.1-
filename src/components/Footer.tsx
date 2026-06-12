import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/70 py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-sm text-slate-600 sm:px-6 lg:px-8">
        <p>Ramathibodi Nursing Council OS เป็นเว็บไซต์ต้นแบบสำหรับ Ramathibodi Nursing Student Council</p>
        <p>
          คู่มือการใช้งานอยู่ที่{" "}
          <Link href="/guide" className="font-medium text-calm-700 underline decoration-calm-200 underline-offset-4">
            หน้าคู่มือ
          </Link>
          {" "}และ{" "}
          <Link href="/about" className="font-medium text-calm-700 underline decoration-calm-200 underline-offset-4">
            เกี่ยวกับโครงการ
          </Link>
        </p>
        <p className="font-medium text-slate-700">Created by นายซียภัทร์ ลูกหวาย | Seayaphat Lookwhile | RANS</p>
      </div>
    </footer>
  );
}
