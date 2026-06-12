"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/Badge";
import { readBrowserFeedback } from "@/lib/browserTrialStore";

type FeedbackItem = {
  name: string;
  role: string;
  useful: string;
  confusing: string;
  suggestions: string;
  rating: number;
  createdAt: string;
};

type Props = {
  initialFeedback: FeedbackItem[];
};

export function FeedbackBoard({ initialFeedback }: Props) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        const localFeedback = readBrowserFeedback();
        setFeedback([...localFeedback, ...initialFeedback]);
      } catch {
        setFeedback(initialFeedback);
      }
    };

    setReady(true);
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("project-zero-db-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("project-zero-db-updated", sync);
    };
  }, [initialFeedback]);

  if (!ready) {
    return <div className="rounded-2xl border border-line bg-white p-5 text-sm text-slate-500">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <article key={`${item.name}-${item.createdAt}`} className="rounded-[1.35rem] border border-line bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-ink">{item.name}</h3>
              <p className="text-sm text-slate-500">{item.role}</p>
            </div>
            <Badge variant="default">ให้คะแนน {item.rating}/5</Badge>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.useful}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.suggestions}</p>
        </article>
      ))}
    </div>
  );
}
