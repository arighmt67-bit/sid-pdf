"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/section-label";
import { UploadZone, type UploadedFile } from "@/components/ui/upload-zone";
import { API_BASE, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  accept?: string;
  options?: ReactNode;
  endpoint: string;
  method?: "POST" | "GET";
  extraFields?: Record<string, string>;
  processLabel?: string;
  children?: ReactNode;
}

export function ToolLayout({
  title,
  description,
  icon,
  accept,
  options,
  endpoint,
  method = "POST",
  extraFields,
  processLabel = "Proses",
  children,
}: ToolLayoutProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [resultName, setResultName] = useState<string>("");

  const handleProcess = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setErrorMsg("");

    try {
      const formData = new FormData();
      if (method === "POST" && files.length > 1) {
        // For merge endpoint — send all files under 'files' key
        files.forEach((f) => formData.append("files", f.file));
      } else {
        // Single file — send under 'file' key
        if (files.length > 0) formData.append("file", files[0].file);
      }
      if (extraFields) {
        Object.entries(extraFields).forEach(([k, v]) => formData.append(k, v));
      }

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        body: method === "POST" ? formData : undefined,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Processing failed" }));
        throw new Error(err.detail || `Error ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const disposition = res.headers.get("content-disposition");
      let filename = "result";
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
      } else {
        // Fallback: derive extension from Content-Type
        const extMap: Record<string, string> = {
          "application/pdf": ".pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "application/zip": ".zip",
        };
        const contentType = res.headers.get("content-type") || "";
        const ext = extMap[contentType] || "";
        const baseName = files[0]?.file.name?.replace(/\.[^.]+$/, "") || "result";
        filename = `${baseName}${ext}`;
      }
      // SAFEGUARD: ensure filename always has correct extension
      if (!filename.includes(".")) {
        filename = filename + ".pdf";
      }

      setDownloadUrl(url);
      setResultName(filename);
      setStatus("done");
    } catch (e: any) {
      setErrorMsg(e.message || "Terjadi kesalahan saat memproses file.");
      setStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setStatus("idle");
    setDownloadUrl("");
    setErrorMsg("");
    setResultName("");
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-foreground">{title}</span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-5 shadow-accent">
              {icon}
            </div>
            <h1 className="font-display text-3xl md:text-4xl mb-3">{title}</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
          </motion.div>

          {/* Upload Zone */}
          {status === "idle" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Card padding="xl">
                <UploadZone
                  onFilesChange={setFiles}
                  accept={accept}
                  maxFiles={50}
                />
              </Card>

              {options && (
                <Card padding="lg">
                  <h3 className="font-semibold text-sm mb-4">Opsi</h3>
                  {options}
                </Card>
              )}

              {children}

              <div className="flex justify-center">
                <Button
                  size="xl"
                  onClick={handleProcess}
                  disabled={files.length === 0}
                >
                  {processLabel}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Processing */}
          {status === "processing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-6 shadow-accent animate-pulse">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <h2 className="font-display text-2xl mb-2">Memproses...</h2>
              <p className="text-muted-foreground">
                Mohon tunggu sebentar, file Anda sedang diproses.
              </p>
            </motion.div>
          )}

          {/* Done */}
          {status === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-display text-2xl mb-2">Selesai!</h2>
                <p className="text-muted-foreground">File Anda telah berhasil diproses.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = resultName;
                    a.click();
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download {resultName}
                </Button>
                <Button variant="secondary" size="lg" onClick={reset}>
                  Proses File Lain
                </Button>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h2 className="font-display text-2xl mb-2">Gagal</h2>
                <p className="text-muted-foreground max-w-md mx-auto">{errorMsg}</p>
              </div>
              <Button variant="secondary" size="lg" onClick={reset}>
                Coba Lagi
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
