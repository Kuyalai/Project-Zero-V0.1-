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

export function readTrialDb(): TrialDb {
  ensureDbFile();
  const raw = readFileSync(dataFile, "utf8");
  return JSON.parse(raw) as TrialDb;
}

export function readTrialData() {
  return readTrialDb();
}

export function addFeedback(entry: Omit<TrialFeedback, "createdAt">) {
  const db = readTrialDb();
  db.feedback.unshift({ ...entry, createdAt: new Date().toISOString() });
  writeFileSync(dataFile, JSON.stringify(db, null, 2), "utf8");
  return db.feedback[0];
}

export function addTask(entry: Omit<TrialDb["tasks"][number], "id">) {
  const db = readTrialDb();
  const nextId = `task-${Date.now()}`;
  const task = { id: nextId, ...entry };
  db.tasks.unshift(task);
  writeFileSync(dataFile, JSON.stringify(db, null, 2), "utf8");
  return task;
}

export function addDocument(entry: Omit<TrialDb["documents"][number], "id">) {
  const db = readTrialDb();
  const nextId = `doc-${Date.now()}`;
  const document = { id: nextId, ...entry };
  db.documents.unshift(document);
  writeFileSync(dataFile, JSON.stringify(db, null, 2), "utf8");
  return document;
}

export function addHandover(entry: Omit<TrialDb["handoverNotes"][number], "id">) {
  const db = readTrialDb();
  const nextId = `hand-${Date.now()}`;
  const note = { id: nextId, ...entry };
  db.handoverNotes.unshift(note);
  writeFileSync(dataFile, JSON.stringify(db, null, 2), "utf8");
  return note;
}
