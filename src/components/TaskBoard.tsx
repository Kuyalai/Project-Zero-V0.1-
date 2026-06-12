"use client";

import { useEffect, useState } from "react";

import { TaskCard } from "@/components/TaskCard";
import { readBrowserTrialDb } from "@/lib/browserTrialStore";
import type { TaskItem, TaskStatus } from "@/data/mockData";

type Props = {
  initialTasks: TaskItem[];
  statuses: readonly TaskStatus[];
};

export function TaskBoard({ initialTasks, statuses }: Props) {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const sync = () => {
      const browserDb = readBrowserTrialDb();
      setTasks([...browserDb.tasks, ...initialTasks]);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("project-zero-db-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("project-zero-db-updated", sync);
    };
  }, [initialTasks]);

  return (
    <div className="space-y-6">
      {statuses.map((status) => {
        const items = tasks.filter((task) => task.status === status);
        return (
          <section key={status} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{status}</h2>
              <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {items.length} รายการ
              </span>
            </div>
            {items.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {items.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-white p-5 text-sm text-slate-500">
                ยังไม่มีงานในสถานะนี้
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
