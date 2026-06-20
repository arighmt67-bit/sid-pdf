"use client";
import { ToolLayout } from "@/components/tool-layout";
import { Layers } from "lucide-react";

export default function BatchPage() {
  return (
    <ToolLayout
      title="Batch Proses"
      description="Proses puluhan file PDF sekaligus dalam satu klik."
      icon={<Layers className="w-7 h-7 text-white" />}
      accept=".pdf"
      endpoint="/api/compress"
      processLabel="Proses Semua File"
    />
  );
}
