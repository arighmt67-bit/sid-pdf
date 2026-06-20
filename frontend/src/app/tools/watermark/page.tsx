"use client";
import { ToolLayout } from "@/components/tool-layout";
import { Shield } from "lucide-react";
import { useState } from "react";

export default function WatermarkPage() {
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(60);
  const [rotation, setRotation] = useState(0);

  return (
    <ToolLayout
      title="Watermark PDF"
      description="Tambahkan teks watermark ke dokumen PDF Anda."
      icon={<Shield className="w-7 h-7 text-white" />}
      accept=".pdf"
      endpoint="/api/watermark"
      extraFields={{
        text,
        opacity: String(opacity),
        font_size: String(fontSize),
        rotation: String(rotation),
      }}
      processLabel="Tambah Watermark"
    >
      <div className="mt-6 p-6 bg-muted/30 rounded-xl border border-border space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Teks Watermark</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Ukuran Font: {fontSize}px</label>
            <input
              type="range"
              min={20}
              max={120}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Rotasi: {rotation}°</label>
            <select
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-12 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value={0}>0° (Normal)</option>
              <option value={90}>90°</option>
              <option value={180}>180°</option>
              <option value={270}>270°</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Opasitas: {Math.round(opacity * 100)}%</label>
            <input
              type="range"
              min={5}
              max={80}
              value={opacity * 100}
              onChange={(e) => setOpacity(Number(e.target.value) / 100)}
              className="w-full accent-accent"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
