import { FileText } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Produk: [
    { label: "Konversi PDF", href: "/tools/convert" },
    { label: "Kompres PDF", href: "/tools/compress" },
    { label: "Edit PDF", href: "/tools/edit" },
    { label: "Gabung PDF", href: "/tools/merge" },
    { label: "Pisah PDF", href: "/tools/split" },
  ],
  Keamanan: [
    { label: "Proteksi PDF", href: "/tools/protect" },
    { label: "Buka Kunci", href: "/tools/unlock" },
    { label: "Watermark", href: "/tools/watermark" },
  ],
  Referensi: [
    { label: "ISO 32000-2:2020", href: "/#standards" },
    { label: "ISO 19005 (PDF/A)", href: "/#standards" },
    { label: "Jurnal Ilmiah", href: "/#journals" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg text-white">
                SID <span className="gradient-text">PDF</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Aplikasi pengolah PDF modern berbasis web. Dibangun dengan standar ISO dan riset akademik.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3 text-slate-200">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SID PDF. Semua data diproses secara lokal dan aman.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privasi
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
