import type { DocumentItem, HandoverItem, TaskItem } from "@/data/mockData";

type BrowserTrialDb = {
  tasks: TaskItem[];
  documents: DocumentItem[];
  handoverNotes: HandoverItem[];
};

type StoredBrowserTrialDb = BrowserTrialDb & {
  feedback?: Array<Record<string, unknown> & { createdAt?: string }>;
};

const storageKey = "project-zero-browser-db";

const isBrowser = () => typeof window !== "undefined";

function loadSeed(): BrowserTrialDb {
  return { tasks: [], documents: [], handoverNotes: [] };
}

function normalizeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value.filter(Boolean) as T[]) : [];
}

function readString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function readTask(value: unknown): TaskItem | null {
  if (!value || typeof value !== "object") return null;
  const task = value as Record<string, unknown>;
  return {
    id: readString(task.id, `task-${Date.now()}`),
    title: readString(task.title, "งานใหม่"),
    owner: readString(task.owner, "ไม่ระบุ"),
    team: readString(task.team, "ไม่ระบุ"),
    deadline: readString(task.deadline, new Date().toISOString().slice(0, 10)),
    priority: (readString(task.priority, "ต่ำ") as TaskItem["priority"]),
    status: (readString(task.status, "ยังไม่เริ่ม") as TaskItem["status"]),
    note: readString(task.note, ""),
  };
}

function readDocument(value: unknown): DocumentItem | null {
  if (!value || typeof value !== "object") return null;
  const document = value as Record<string, unknown>;
  return {
    id: readString(document.id, `doc-${Date.now()}`),
    name: readString(document.name, "เอกสารใหม่"),
    category: readString(document.category, "ทั่วไป"),
    owner: readString(document.owner, "ไม่ระบุ"),
    updatedAt: readString(document.updatedAt, new Date().toISOString().slice(0, 10)),
    visibility: (readString(document.visibility, "สาธารณะ") as DocumentItem["visibility"]),
    fileUrl: readString(document.fileUrl, "#"),
    summary: readString(document.summary, ""),
  };
}

function readHandover(value: unknown): HandoverItem | null {
  if (!value || typeof value !== "object") return null;
  const note = value as Record<string, unknown>;
  const content = Array.isArray(note.content) ? note.content.map((item) => readString(item)).filter(Boolean) : [];
  return {
    id: readString(note.id, `hand-${Date.now()}`),
    title: readString(note.title, "หัวข้อใหม่"),
    category: (readString(note.category, "คู่มือบทบาท") as HandoverItem["category"]),
    owner: readString(note.owner, "ไม่ระบุ"),
    updatedAt: readString(note.updatedAt, new Date().toISOString().slice(0, 10)),
    content,
  };
}

export function readBrowserTrialDb(): BrowserTrialDb {
  if (!isBrowser()) return loadSeed();
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return loadSeed();
    const parsed = JSON.parse(raw) as StoredBrowserTrialDb;
    return {
      tasks: normalizeArray(parsed.tasks).map(readTask).filter(Boolean) as TaskItem[],
      documents: normalizeArray(parsed.documents).map(readDocument).filter(Boolean) as DocumentItem[],
      handoverNotes: normalizeArray(parsed.handoverNotes).map(readHandover).filter(Boolean) as HandoverItem[],
    };
  } catch {
    return loadSeed();
  }
}

export function readBrowserFeedback() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredBrowserTrialDb;
    return normalizeArray<{ name: string; role: string; useful: string; confusing: string; suggestions: string; rating: number; createdAt: string }>(parsed.feedback).map((item) => ({
      name: readString(item.name, "ไม่ระบุ"),
      role: readString(item.role, "ไม่ระบุ"),
      useful: readString(item.useful, ""),
      confusing: readString(item.confusing, ""),
      suggestions: readString(item.suggestions, ""),
      rating: Number.isFinite(Number(item.rating)) ? Number(item.rating) : 5,
      createdAt: readString(item.createdAt, new Date().toISOString()),
    }));
  } catch {
    return [];
  }
}

export function writeBrowserTrialDb(db: BrowserTrialDb) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(db));
  } catch {
    return;
  }
  const event = document.createEvent("Event");
  event.initEvent("project-zero-db-updated", true, true);
  window.dispatchEvent(event);
}

export function resetBrowserTrialDb() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    return;
  }
  const event = document.createEvent("Event");
  event.initEvent("project-zero-db-updated", true, true);
  window.dispatchEvent(event);
}

export function appendBrowserTask(task: TaskItem) {
  const db = readBrowserTrialDb();
  writeBrowserTrialDb({ ...db, tasks: [task, ...db.tasks] });
}

export function appendBrowserDocument(document: DocumentItem) {
  const db = readBrowserTrialDb();
  writeBrowserTrialDb({ ...db, documents: [document, ...db.documents] });
}

export function appendBrowserHandover(note: HandoverItem) {
  const db = readBrowserTrialDb();
  writeBrowserTrialDb({ ...db, handoverNotes: [note, ...db.handoverNotes] });
}
