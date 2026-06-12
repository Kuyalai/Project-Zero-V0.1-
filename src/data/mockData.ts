export type TaskStatus = "ยังไม่เริ่ม" | "กำลังทำ" | "รอตรวจ" | "เสร็จแล้ว";
export type Priority = "สูง" | "กลาง" | "ต่ำ";
export type Visibility = "สาธารณะ" | "ภายในทีม" | "เฉพาะกรรมการ";

export type TaskItem = {
  id: string;
  title: string;
  owner: string;
  team: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
  note: string;
};

export type DocumentItem = {
  id: string;
  name: string;
  category: string;
  owner: string;
  updatedAt: string;
  visibility: Visibility;
  fileUrl: string;
  summary: string;
};

export type HandoverItem = {
  id: string;
  title: string;
  category: "คู่มือบทบาท" | "บทเรียนจากกิจกรรม" | "เช็กลิสต์" | "สรุปรายปี" | "คำแนะนำ";
  owner: string;
  updatedAt: string;
  content: string[];
};

export const tasks: TaskItem[] = [
  {
    id: "task-1",
    title: "เตรียมหนังสือเชิญประชุมคณะทำงาน",
    owner: "อิงฟ้า",
    team: "งานเลขานุการ",
    deadline: "2026-06-14",
    priority: "สูง",
    status: "กำลังทำ",
    note: "รอเช็กชื่อผู้รับผิดชอบและแนบวาระประชุมล่าสุด",
  },
  {
    id: "task-2",
    title: "สรุปงบประมาณกิจกรรมรับน้อง",
    owner: "มินนี่",
    team: "งานการเงิน",
    deadline: "2026-06-13",
    priority: "สูง",
    status: "รอตรวจ",
    note: "มีเอกสารแนบครบแล้ว รอผู้ตรวจทานอนุมัติ",
  },
  {
    id: "task-3",
    title: "อัปเดตปฏิทินงานสภานักศึกษา",
    owner: "ภีม",
    team: "งานสื่อสาร",
    deadline: "2026-06-18",
    priority: "กลาง",
    status: "ยังไม่เริ่ม",
    note: "รอข้อมูลวันเวลาและภาพปกจากทีมโครงการ",
  },
  {
    id: "task-4",
    title: "ตรวจเอกสารเวรนิสิตพยาบาลประจำเดือน",
    owner: "ฟ้า",
    team: "งานประสานงาน",
    deadline: "2026-06-12",
    priority: "สูง",
    status: "รอตรวจ",
    note: "ตรวจชื่อเวรและหมายเหตุพิเศษก่อนปล่อยเวอร์ชันจริง",
  },
  {
    id: "task-5",
    title: "บันทึกผลประชุมสรุปงานกิจกรรม",
    owner: "ต้นกล้า",
    team: "งานบริหาร",
    deadline: "2026-06-11",
    priority: "ต่ำ",
    status: "เสร็จแล้ว",
    note: "เผยแพร่ในคลังเอกสารแล้ว",
  },
  {
    id: "task-6",
    title: "วางแผนรอบส่งต่อข้อมูลรุ่นถัดไป",
    owner: "น้ำฝน",
    team: "งานส่งต่อ",
    deadline: "2026-06-20",
    priority: "กลาง",
    status: "ยังไม่เริ่ม",
    note: "ต้องสรุปรายชื่อไฟล์หลักและผู้ถือครองข้อมูล",
  },
];

export const documents: DocumentItem[] = [
  {
    id: "doc-1",
    name: "คู่มือการประชุมประจำเดือน",
    category: "ระเบียบงาน",
    owner: "งานเลขานุการ",
    updatedAt: "2026-06-10",
    visibility: "ภายในทีม",
    fileUrl: "/files/placeholder-document.txt",
    summary: "อธิบายลำดับวาระ วิธีสรุปมติ และรูปแบบไฟล์ที่ใช้ส่งต่อ",
  },
  {
    id: "doc-2",
    name: "แบบฟอร์มสรุปกิจกรรมคณะกรรมการ",
    category: "แบบฟอร์ม",
    owner: "งานบริหาร",
    updatedAt: "2026-06-08",
    visibility: "สาธารณะ",
    fileUrl: "/files/placeholder-document.txt",
    summary: "แบบฟอร์มมาตรฐานสำหรับกิจกรรมและรายงานหลังจบงาน",
  },
  {
    id: "doc-3",
    name: "แนวทางประสานงานกับภาควิชา",
    category: "คู่มือประสานงาน",
    owner: "งานประสานงาน",
    updatedAt: "2026-06-07",
    visibility: "เฉพาะกรรมการ",
    fileUrl: "/files/placeholder-document.txt",
    summary: "รวมวิธีติดต่อ ช่องทางอัปเดต และข้อควรระวังก่อนส่งหนังสือ",
  },
  {
    id: "doc-4",
    name: "เช็กลิสต์เอกสารก่อนปิดโปรเจกต์",
    category: "เช็กลิสต์",
    owner: "งานส่งต่อ",
    updatedAt: "2026-06-12",
    visibility: "ภายในทีม",
    fileUrl: "/files/placeholder-document.txt",
    summary: "รายการตรวจความครบของเอกสารก่อนเก็บเข้าคลังกลาง",
  },
];

export const handoverNotes: HandoverItem[] = [
  {
    id: "hand-1",
    title: "บทบาทประธานสภานักศึกษาพยาบาล",
    category: "คู่มือบทบาท",
    owner: "งานส่งต่อ",
    updatedAt: "2026-06-12",
    content: [
      "ดูภาพรวมวาระรายเดือน และคุมจังหวะการสื่อสารระหว่างทีม",
      "ต้องมีรายชื่อผู้รับผิดชอบหลักและวันครบกำหนดของทุกงาน",
      "สรุปมติประชุมให้สั้น ชัด และส่งต่อได้ทันที",
    ],
  },
  {
    id: "hand-2",
    title: "บทเรียนจากกิจกรรมรับน้อง",
    category: "บทเรียนจากกิจกรรม",
    owner: "งานกิจกรรม",
    updatedAt: "2026-06-11",
    content: [
      "เริ่มจากการล็อกตารางสถานที่ก่อนประกาศรายละเอียดกับนิสิต",
      "ไฟล์สื่อควรเก็บชื่อเวอร์ชันให้ชัดเจนเพื่อกันใช้ไฟล์ผิด",
      "มีจุดติดต่อฉุกเฉินและรายชื่อผู้ประสานสำรองทุกครั้ง",
    ],
  },
  {
    id: "hand-3",
    title: "เช็กลิสต์ก่อนปิดรอบงาน",
    category: "เช็กลิสต์",
    owner: "งานบริหาร",
    updatedAt: "2026-06-12",
    content: [
      "ตรวจว่าเอกสารสำคัญถูกอัปโหลดในคลังกลางครบ",
      "เช็กว่ามีหมายเหตุงานค้างและผู้รับผิดชอบรุ่นถัดไปแล้ว",
      "สรุปไฟล์ที่ต้องติดตามต่อในสัปดาห์หน้า",
    ],
  },
  {
    id: "hand-4",
    title: "สรุปรายปีของคณะกรรมการ",
    category: "สรุปรายปี",
    owner: "งานเลขานุการ",
    updatedAt: "2026-06-10",
    content: [
      "กิจกรรมหลัก 4 ชุดดำเนินงานครบตามแผน",
      "จุดเด่นคือการตอบสนองงานเร็วขึ้นจากรอบก่อน",
      "จุดที่ควรพัฒนาคือการเก็บเอกสารภาคสนามให้เป็นมาตรฐานเดียวกัน",
    ],
  },
  {
    id: "hand-5",
    title: "คำแนะนำสำหรับรุ่นถัดไป",
    category: "คำแนะนำ",
    owner: "รุ่นพี่ส่งต่อ",
    updatedAt: "2026-06-12",
    content: [
      "อย่าเก็บความรู้ไว้กับคนเดียว ให้ทำเป็นชุดไฟล์ที่ค้นง่าย",
      "อธิบายบริบทงานก่อนบอกขั้นตอน จะช่วยลดการถามซ้ำ",
      "ทุกครั้งที่มีงานใหม่ ให้เพิ่มบันทึกสั้น ๆ ลงคลังทันที",
    ],
  },
];

const urgentTaskCount = tasks.filter((task) => task.priority === "สูง").length;
const upcomingDeadlines = tasks.filter((task) => ["2026-06-12", "2026-06-13", "2026-06-14"].includes(task.deadline)).length;

export const dashboardStats = {
  totalTasks: tasks.length,
  urgentTasks: urgentTaskCount,
  upcomingDeadlines,
  totalDocuments: documents.length,
  handoverNotes: handoverNotes.length,
};
