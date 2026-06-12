"use client";

import { useEffect, useState } from "react";

import { DocumentCard } from "@/components/DocumentCard";
import { readBrowserTrialDb } from "@/lib/browserTrialStore";
import type { DocumentItem } from "@/data/mockData";

type Props = {
  initialDocuments: DocumentItem[];
};

export function DocumentBoard({ initialDocuments }: Props) {
  const [documents, setDocuments] = useState(initialDocuments);

  useEffect(() => {
    const sync = () => {
      const browserDb = readBrowserTrialDb();
      setDocuments([...browserDb.documents, ...initialDocuments]);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("project-zero-db-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("project-zero-db-updated", sync);
    };
  }, [initialDocuments]);

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
}
