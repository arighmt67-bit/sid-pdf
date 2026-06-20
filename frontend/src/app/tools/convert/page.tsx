"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadZone, type UploadedFile } from "@/components/ui/upload-zone";
import { API_BASE, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowRightLeft,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ConversionDirection = {
  id: string;
  label: string;
  from: string;
  to: string;
  endpoint: string;
  accept: string;
  icon: React.ComponentType<{ className?: string }>;
};

const conversions: ConversionDirection[] = [
  {
    id: "pdf-to-word",
    label: "PDF → Word",
    from: "PDF",
    to: "Word",
    endpoint: "/api/convert/pdf-to-word",
    accept: ".pdf",
    icon: FileText,
  },
  {
    id: "pdf-to-excel",
    label: "PDF → Excel",
    from: "PDF",
    to: "Excel",
    endpoint: "/api/convert/pdf-to-excel",
    accept: ".pdf",
    icon: FileSpreadsheet,
  },
  {
    id: "pdf-to-images",
    label: "PDF → JPG/PNG",
    from: "PDF",
    to: "JPG/PNG",
    endpoint: "/api/convert/pdf-to-images",
    accept: ".pdf",
    icon: Image,
  },
  {
    id: "pdf-to-ppt",
    label: "PDF → PPT",
    from: "PDF",
    to: "PPT",
    endpoint: "/api/convert/pdf-to-ppt",
    accept: ".pdf",
    icon: Presentation,
  },
  {
    id: "word-to-pdf",
    label: "Word → PDF",
    from: "Word",
    to: "PDF",
    endpoint: "/api/convert/office-to-pdf",
    accept: ".docx",
    icon: FileText,
  },
  {
    id: "excel-to-pdf",
    label: "Excel → PDF",
    from: "Excel",
    to: "PDF",
    endpoint: "/api/convert/office-to-pdf",
    accept: ".xlsx",
    icon: FileSpreadsheet,
  },
  {
    id: "ppt-to-pdf",
    label: "PPT → PDF",
    from: "PPT",
    to: "PDF",
    endpoint: "/api/convert/office-to-pdf",
    accept: ".pptx",
    icon: Presentation,
  },
  {
    id: "image-to-pdf",
    label: "JPG/PNG → PDF",
    from: "JPG/PNG",
    to: "PDF",
    endpoint: "/api/convert/office-to-pdf",
    accept: ".jpg,.jpeg,.png",
    icon: Image,
  },
];

export default function ConvertPage() {
  const [selected, setSelected] = useState<ConversionDirection>(conversions[0]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [resultName, setResultName] = useState("");

  const handleProcess = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", files[0].file);

      const res = await fetch(`${API_BASE}${selected.endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Gagal memproses file" }));
        throw new Error(err.detail || `Error ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const disposition = res.headers.get("content-disposition");
      let filename = `converted_${files[0].file.name}`;
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
      // SAFEGUARD: force correct extension based on conversion direction
      const targetExt = selected.to === "Word" ? ".docx" :
        selected.to === "Excel" ? ".xlsx" :
        selected.to === "PPT" ? ".pptx" :
        selected.to === "PDF" ? ".pdf" :
        selected.to === "JPG/PNG" ? ".zip" : "";
      if (targetExt && !filename.toLowerCase().endsWith(targetExt)) {
        filename = filename.replace(/\.[^.]+$/, "") + targetExt;
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

  const handleDirectionChange = (dir: ConversionDirection) => {
    setSelected(dir);
    setFiles([]);
    setStatus("idle");
    setDownloadUrl("");
    setErrorMsg("");
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
              <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
              <span>/</span>
              <span className="text-foreground">Konversi</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-5 shadow-accent">
              <ArrowRightLeft className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl mb-3">
              Konversi {selected.from} → {selected.to}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Pilih arah konversi, upload file, dan dapatkan hasilnya dalam hitungan detik.
            </p>
          </motion.div>

          {/* Conversion Direction Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card padding="lg">
              <h3 className="font-semibold text-sm mb-4">Pilih Arah Konversi</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {conversions.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleDirectionChange(conv)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-lg border text-sm transition-all duration-200",
                      selected.id === conv.id
                        ? "border-accent bg-accent/10 text-accent font-medium shadow-sm"
                        : "border-border bg-card text-foreground hover:border-accent/30 hover:bg-accent/[0.03]"
                    )}
                  >
                    <conv.icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        selected.id === conv.id ? "text-accent" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-left leading-tight">{conv.label}</span>
                  </button>
                ))}
              </div>
            </Card>
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
                  accept={selected.accept}
                  multiple={false}
                  maxFiles={1}
                  label={`Upload File ${selected.from}`}
                  description={`Pilih file ${selected.from} untuk dikonversi ke ${selected.to}`}
                />
              </Card>

              <div className="flex justify-center">
                <Button
                  size="xl"
                  onClick={handleProcess}
                  disabled={files.length === 0}
                >
                  Konversi ke {selected.to}
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
              <h2 className="font-display text-2xl mb-2">Mengonversi...</h2>
              <p className="text-muted-foreground">
                {selected.from} → {selected.to}
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
                <h2 className="font-display text-2xl mb-2">Konversi Berhasil!</h2>
                <p className="text-muted-foreground">
                  {files[0]?.file.name} → {resultName}
                </p>
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
                  Konversi File Lain
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
