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

export function readBrowserTrialDb(): BrowserTrialDb {
  if (!isBrowser()) return loadSeed();
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return loadSeed();
    const parsed = JSON.parse(raw) as StoredBrowserTrialDb;
    return {
      tasks: normalizeArray<TaskItem>(parsed.tasks),
      documents: normalizeArray<DocumentItem>(parsed.documents),
      handoverNotes: normalizeArray<HandoverItem>(parsed.handoverNotes),
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
    return normalizeArray<{ name: string; role: string; useful: string; confusing: string; suggestions: string; rating: number; createdAt: string }>(
      parsed.feedback,
    );
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
