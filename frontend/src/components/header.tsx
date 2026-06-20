"use client";

import { cn } from "@/lib/utils";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#tools", label: "Fitur" },
  { href: "/#how", label: "Cara Kerja" },
  { href: "/#standards", label: "Standar" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-accent group-hover:shadow-accent-lg transition-shadow">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl text-foreground">
            SID <span className="gradient-text">PDF</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/tools/convert" className="inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 h-9 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
            Mulai Gratis
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tools/convert"
            className="block w-full text-center rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium py-2.5 text-sm"
            onClick={() => setOpen(false)}
          >
            Mulai Gratis
          </Link>
        </div>
      )}
    </header>
  );
}
