"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Shrink } from "lucide-react";
import { useState } from "react";

export default function CompressPage() {
  const [quality, setQuality] = useState("medium");

  return (
    <ToolLayout
      title="Kompres PDF"
      description="Perkecil ukuran file PDF tanpa kehilangan kualitas signifikan."
      icon={<Shrink className="w-7 h-7 text-white" />}
      accept=".pdf"
      endpoint="/api/compress"
      extraFields={{ quality }}
      processLabel="Kompres PDF"
    >
      <div className="mt-6 p-6 bg-muted/30 rounded-xl border border-border">
        <h4 className="font-semibold text-sm mb-3">Kualitas Kompresi</h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "low", label: "Maksimum", desc: "Ukuran terkecil" },
            { value: "medium", label: "Seimbang", desc: "Direkomendasikan" },
            { value: "high", label: "Minimum", desc: "Kualitas terbaik" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setQuality(opt.value)}
              className={`p-3 rounded-lg border text-sm transition-all ${
                quality === opt.value
                  ? "border-accent bg-accent/10 text-accent font-medium"
                  : "border-border bg-card hover:border-accent/30"
              }`}
            >
              <div className="font-semibold">{opt.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
