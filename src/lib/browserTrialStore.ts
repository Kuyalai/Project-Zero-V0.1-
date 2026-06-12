import type { DocumentItem, HandoverItem, TaskItem } from "@/data/mockData";

type BrowserTrialDb = {
  tasks: TaskItem[];
  documents: DocumentItem[];
  handoverNotes: HandoverItem[];
};

const storageKey = "project-zero-browser-db";

const isBrowser = () => typeof window !== "undefined";

function loadSeed(): BrowserTrialDb {
  return { tasks: [], documents: [], handoverNotes: [] };
}

export function readBrowserTrialDb(): BrowserTrialDb {
  if (!isBrowser()) return loadSeed();
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return loadSeed();
    return JSON.parse(raw) as BrowserTrialDb;
  } catch {
    return loadSeed();
  }
}

export function writeBrowserTrialDb(db: BrowserTrialDb) {
  if (!isBrowser()) return;
  window.localStorage.setItem(storageKey, JSON.stringify(db));
  window.dispatchEvent(new Event("project-zero-db-updated"));
}

export function resetBrowserTrialDb() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event("project-zero-db-updated"));
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
