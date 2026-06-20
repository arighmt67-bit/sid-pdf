"use client";
import { ToolLayout } from "@/components/tool-layout";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";

export default function ProtectPage() {
  const [mode, setMode] = useState<"protect" | "unlock">("protect");
  const [password, setPassword] = useState("");

  return (
    <ToolLayout
      title={mode === "protect" ? "Proteksi PDF" : "Buka Kunci PDF"}
      description={
        mode === "protect"
          ? "Enkripsi PDF dengan password AES-256."
          : "Hapus password dari PDF yang terkunci."
      }
      icon={mode === "protect" ? <Lock className="w-7 h-7 text-white" /> : <Unlock className="w-7 h-7 text-white" />}
      accept=".pdf"
      endpoint={mode === "protect" ? "/api/protect" : "/api/unlock"}
      extraFields={{ password }}
      processLabel={mode === "protect" ? "Proteksi PDF" : "Buka Kunci"}
    >
      <div className="mt-6 p-6 bg-muted/30 rounded-xl border border-border space-y-4">
        <div className="flex gap-3">
          {[
            { value: "protect" as const, label: "Proteksi", icon: Lock },
            { value: "unlock" as const, label: "Buka Kunci", icon: Unlock },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all ${
                mode === opt.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card hover:border-accent/30"
              }`}
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </button>
          ))}
        </div>

        {mode === "protect" && (
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full h-12 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
