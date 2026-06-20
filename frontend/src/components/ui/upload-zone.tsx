"use client";

import { cn, formatFileSize } from "@/lib/utils";
import { Upload, File, X, FileText, Image, FileSpreadsheet } from "lucide-react";
import { useCallback, useState, type DragEvent } from "react";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

interface UploadZoneProps {
  onFilesChange: (files: UploadedFile[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // bytes
  label?: string;
  description?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "application/pdf": <FileText className="w-8 h-8 text-red-500" />,
  "image/": <Image className="w-8 h-8 text-green-500" />,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <FileText className="w-8 h-8 text-blue-500" />,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": <FileSpreadsheet className="w-8 h-8 text-emerald-500" />,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": <FileText className="w-8 h-8 text-orange-500" />,
};

function getFileIcon(type: string) {
  for (const [key, icon] of Object.entries(iconMap)) {
    if (type.startsWith(key)) return icon;
  }
  return <File className="w-8 h-8 text-muted-foreground" />;
}

export function UploadZone({
  onFilesChange,
  accept,
  multiple = true,
  maxFiles = 50,
  maxSize,
  label = "Seret & Lepas File di Sini",
  description = "atau klik untuk memilih file",
}: UploadZoneProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles: UploadedFile[] = Array.from(fileList)
        .slice(0, maxFiles - files.length)
        .map((file) => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
        }));
      const updated = [...files, ...newFiles];
      setFiles(updated);
      onFilesChange(updated);
    },
    [files, maxFiles, onFilesChange]
  );

  const removeFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onFilesChange(updated);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200",
          isDragging
            ? "border-accent bg-accent/[0.06] scale-[1.01]"
            : "border-slate-300 hover:border-accent/40 hover:bg-accent/[0.02]"
        )}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = accept || "*";
          input.multiple = multiple;
          input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files?.length) processFiles(target.files);
          };
          input.click();
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-accent">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          {accept && (
            <p className="text-xs text-muted-foreground/60">
              Format: {accept.replace(/\./g, "").replace(/,/g, ", ").toUpperCase()}
            </p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              {files.length} file dipilih
            </p>
            {files.length > 1 && (
              <button
                onClick={() => {
                  setFiles([]);
                  onFilesChange([]);
                }}
                className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
              >
                Hapus semua
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {files.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border group hover:border-accent/20 transition-all"
              >
                {getFileIcon(f.file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {f.file.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {formatFileSize(f.file.size)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(f.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded-md"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
