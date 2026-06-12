import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { documents as seedDocuments, handoverNotes as seedHandoverNotes, tasks as seedTasks } from "@/data/mockData";

export type TrialFeedback = {
  name: string;
  role: string;
  useful: string;
  confusing: string;
  suggestions: string;
  rating: number;
  createdAt: string;
};

type TrialDb = {
  tasks: typeof seedTasks;
  documents: typeof seedDocuments;
  handoverNotes: typeof seedHandoverNotes;
  feedback: TrialFeedback[];
};

const dataDir = join(process.cwd(), "data");
const dataFile = join(dataDir, "trial-db.json");
const memoryKey = Symbol.for("project-zero.trial-db");

type TrialDbState = TrialDb & { __source?: "file" | "memory" };

function getMemoryDb(): TrialDbState | null {
  return (globalThis as typeof globalThis & { [memoryKey]?: TrialDbState })[memoryKey] ?? null;
}

function setMemoryDb(db: TrialDbState) {
  (globalThis as typeof globalThis & { [memoryKey]?: TrialDbState })[memoryKey] = db;
}

function createInitialDb(): TrialDb {
  return {
    tasks: seedTasks,
    documents: seedDocuments,
    handoverNotes: seedHandoverNotes,
    feedback: [],
  };
}

function ensureDbFile() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!existsSync(dataFile)) {
    writeFileSync(dataFile, JSON.stringify(createInitialDb(), null, 2), "utf8");
  }
}

function loadFromFile(): TrialDbState | null {
  try {
    ensureDbFile();
    const raw = readFileSync(dataFile, "utf8");
    return { ...(JSON.parse(raw) as TrialDb), __source: "file" };
  } catch {
    return null;
  }
}

function persistDb(db: TrialDbState) {
  try {
    ensureDbFile();
    writeFileSync(dataFile, JSON.stringify(db, null, 2), "utf8");
    setMemoryDb({ ...db, __source: "file" });
    return;
  } catch {
    setMemoryDb({ ...db, __source: "memory" });
  }
}

export function readTrialDb(): TrialDb {
  const memoryDb = getMemoryDb();
  if (memoryDb) {
    return memoryDb;
  }

  const fileDb = loadFromFile();
  if (fileDb) {
    setMemoryDb(fileDb);
    return fileDb;
  }

  const initial = { ...createInitialDb(), __source: "memory" as const };
  setMemoryDb(initial);
  return initial;
}

export function readTrialData() {
  return readTrialDb();
}

export function addFeedback(entry: Omit<TrialFeedback, "createdAt">) {
  const db = readTrialDb();
  const nextDb = {
    ...db,
    feedback: [{ ...entry, createdAt: new Date().toISOString() }, ...db.feedback],
  };
  persistDb(nextDb);
  return nextDb.feedback[0];
}

export function addTask(entry: Omit<TrialDb["tasks"][number], "id">) {
  const db = readTrialDb();
  const nextId = `task-${Date.now()}`;
  const task = { id: nextId, ...entry };
  persistDb({ ...db, tasks: [task, ...db.tasks] });
  return task;
}

export function addDocument(entry: Omit<TrialDb["documents"][number], "id">) {
  const db = readTrialDb();
  const nextId = `doc-${Date.now()}`;
  const document = { id: nextId, ...entry };
  persistDb({ ...db, documents: [document, ...db.documents] });
  return document;
}

export function addHandover(entry: Omit<TrialDb["handoverNotes"][number], "id">) {
  const db = readTrialDb();
  const nextId = `hand-${Date.now()}`;
  const note = { id: nextId, ...entry };
  persistDb({ ...db, handoverNotes: [note, ...db.handoverNotes] });
  return note;
}
