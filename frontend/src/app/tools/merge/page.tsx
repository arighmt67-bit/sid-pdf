"use client";
import { ToolLayout } from "@/components/tool-layout";
import { Combine } from "lucide-react";

export default function MergePage() {
  return (
    <ToolLayout
      title="Gabung PDF"
      description="Gabungkan beberapa file PDF menjadi satu dokumen."
      icon={<Combine className="w-7 h-7 text-white" />}
      accept=".pdf"
      endpoint="/api/merge"
      processLabel="Gabung PDF"
    />
  );
}
