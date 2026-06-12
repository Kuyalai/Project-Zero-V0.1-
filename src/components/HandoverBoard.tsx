"use client";

import { useEffect, useState } from "react";

import { HandoverCard } from "@/components/HandoverCard";
import { readBrowserTrialDb } from "@/lib/browserTrialStore";
import type { HandoverItem } from "@/data/mockData";

type Props = {
  initialNotes: HandoverItem[];
  categories: readonly HandoverItem["category"][];
};

export function HandoverBoard({ initialNotes, categories }: Props) {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    const sync = () => {
      const browserDb = readBrowserTrialDb();
      setNotes([...browserDb.handoverNotes, ...initialNotes]);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("project-zero-db-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("project-zero-db-updated", sync);
    };
  }, [initialNotes]);

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const items = notes.filter((note) => note.category === category);
        return (
          <section key={category} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{category}</h2>
              <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {items.length} รายการ
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {items.map((note) => (
                <HandoverCard key={note.id} note={note} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
