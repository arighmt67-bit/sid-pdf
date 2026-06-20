"use client";
import { ToolLayout } from "@/components/tool-layout";
import { Scissors } from "lucide-react";
import { useState } from "react";

export default function SplitPage() {
  const [pages, setPages] = useState("");

  return (
    <ToolLayout
      title="Pisah PDF"
      description="Ekstrak halaman tertentu atau pisah PDF menjadi beberapa file."
      icon={<Scissors className="w-7 h-7 text-white" />}
      accept=".pdf"
      endpoint="/api/split"
      extraFields={{ pages }}
      processLabel="Pisah PDF"
    >
      <div className="mt-6 p-6 bg-muted/30 rounded-xl border border-border">
        <h4 className="font-semibold text-sm mb-2">Halaman yang Diekstrak</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Kosongkan untuk memisah semua halaman. Contoh: 1-3,5,7-9
        </p>
        <input
          type="text"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="contoh: 1-3,5,7-9"
          className="w-full h-12 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        />
      </div>
    </ToolLayout>
  );
}
