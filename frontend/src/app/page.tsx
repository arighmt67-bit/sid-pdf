"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/ui/section-label";
import {
  ArrowRight,
  FileText,
  Image,
  FileSpreadsheet,
  Presentation,
  Shrink,
  Edit3,
  Combine,
  Scissors,
  Lock,
  Shield,
  Layers,
  Infinity,
  Sparkles,
  ChevronRight,
  Zap,
  Globe,
  Database,
  BookOpen,
  Quote,
  Check,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const tools = [
  {
    icon: FileText,
    title: "Konversi PDF",
    desc: "PDF ↔ Word, Excel, PPT, JPG, PNG. Dua arah.",
    href: "/tools/convert",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    icon: Shrink,
    title: "Kompres PDF",
    desc: "Perkecil ukuran tanpa kehilangan kualitas signifikan.",
    href: "/tools/compress",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Edit3,
    title: "Edit PDF",
    desc: "Tambah teks, gambar, anotasi, dan tanda tangan.",
    href: "/tools/edit",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
  },
  {
    icon: Combine,
    title: "Gabung PDF",
    desc: "Gabungkan beberapa PDF menjadi satu dokumen.",
    href: "/tools/merge",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    icon: Scissors,
    title: "Pisah PDF",
    desc: "Ekstrak halaman atau pisah PDF menjadi beberapa file.",
    href: "/tools/split",
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
  },
  {
    icon: Lock,
    title: "Proteksi PDF",
    desc: "Enkripsi dengan password AES-256. Buka kunci juga.",
    href: "/tools/protect",
    gradient: "from-slate-600 to-slate-800",
    bg: "bg-slate-50",
  },
  {
    icon: Shield,
    title: "Watermark",
    desc: "Tambah teks atau gambar watermark ke dokumen.",
    href: "/tools/watermark",
    gradient: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Layers,
    title: "Batch Proses",
    desc: "Proses puluhan file sekaligus dalam satu klik.",
    href: "/tools/batch",
    gradient: "from-red-500 to-rose-500",
    bg: "bg-red-50",
  },
];

const formatPairs = [
  { from: "PDF", to: "Word", icon: FileText, color: "text-blue-600" },
  { from: "PDF", to: "Excel", icon: FileSpreadsheet, color: "text-emerald-600" },
  { from: "PDF", to: "PPT", icon: Presentation, color: "text-orange-600" },
  { from: "PDF", to: "JPG/PNG", icon: Image, color: "text-violet-600" },
  { from: "Word", to: "PDF", icon: FileText, color: "text-blue-600" },
  { from: "Excel", to: "PDF", icon: FileSpreadsheet, color: "text-emerald-600" },
  { from: "PPT", to: "PDF", icon: Presentation, color: "text-orange-600" },
  { from: "JPG/PNG", to: "PDF", icon: Image, color: "text-violet-600" },
];

const stats = [
  { value: "ISO 32000", label: "Standar PDF International" },
  { value: "AES-256", label: "Enkripsi Data" },
  { value: "Tanpa Batas", label: "Penggunaan Harian" },
  { value: "100% Lokal", label: "Pemrosesan Data" },
];

const journals = [
  {
    title: "PAWLS: PDF Annotation With Labels and Structure",
    institution: "Allen Institute for AI (AI2)",
    year: "2021",
    focus: "Struktur & anotasi PDF berbasis NLP",
  },
  {
    title: "SAFE-PDF: Robust Detection of JavaScript PDF Malware",
    institution: "Oracle Labs, Australia",
    year: "2018",
    focus: "Keamanan & deteksi malware PDF",
  },
  {
    title: "On Training Robust PDF Malware Classifiers",
    institution: "UC Berkeley",
    year: "2019",
    focus: "Keamanan PDF adversarial",
  },
  {
    title: "A Comparative Study of PDF Parsing Tools",
    institution: "University of North Carolina",
    year: "2024",
    focus: "Studi komparatif tool parsing PDF",
  },
];

const standards = [
  { code: "ISO 32000-2:2020", name: "Spesifikasi inti PDF 2.0", desc: "Standar utama format file PDF — struktur, rendering, dan interaktivitas." },
  { code: "ISO 19005 (PDF/A)", name: "Format arsip jangka panjang", desc: "Memastikan dokumen PDF dapat dibaca dalam jangka waktu tak terbatas." },
  { code: "ISO 14289 (PDF/UA)", name: "Universal Accessibility", desc: "Standar aksesibilitas untuk pengguna dengan disabilitas visual." },
  { code: "ISO 24517 (PDF/E)", name: "Engineering Documentation", desc: "Standar untuk dokumen teknik dan engineering." },
];

const faqs = [
  {
    q: "Apakah file saya aman?",
    a: "Ya. Semua file diproses secara lokal di server kami dan dihapus otomatis setelah 1 jam. Kami menggunakan enkripsi AES-256 untuk semua transfer data.",
  },
  {
    q: "Berapa batas penggunaan?",
    a: "SID PDF tidak memiliki batasan penggunaan harian. Anda dapat memproses file sebanyak yang dibutuhkan tanpa biaya.",
  },
  {
    q: "Format apa saja yang didukung?",
    a: "PDF, Word (.docx), Excel (.xlsx), PowerPoint (.pptx), JPG, PNG, dan masih banyak lagi. Lihat halaman Konversi untuk daftar lengkap.",
  },
  {
    q: "Apakah kualitas dokumen tetap terjaga?",
    a: "Ya. Kami menggunakan algoritma kompresi dan konversi berbasis riset akademik terbaru untuk menjaga kualitas semaksimal mungkin.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* ──── Hero Section ──── */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-secondary/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <SectionLabel label="SID PDF v1.0" pulse />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-display text-[2.75rem] md:text-6xl lg:text-[5.25rem] leading-[1.05] text-center max-w-4xl mx-auto"
          >
            Pengolah{" "}
            <span className="gradient-text">PDF</span> Modern
            <br />
            Tanpa Batas.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Konversi, kompres, edit, gabung, pisah, proteksi, dan watermark PDF
            — semuanya gratis, cepat, dan aman. Didukung standar ISO dan riset akademik.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link href="/tools/convert">
              <Button size="xl">
                Mulai Konversi
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#tools">
              <Button variant="secondary" size="xl">
                Lihat Semua Fitur
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Format Pairs */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex flex-wrap items-center justify-center gap-3"
          >
            {formatPairs.map((pair, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full text-sm shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-200"
              >
                <pair.icon className={`w-4 h-4 ${pair.color}`} />
                <span className="font-medium text-foreground">{pair.from}</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <span className="font-medium text-foreground">{pair.to}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ──── Stats Section (Inverted) ──── */}
      <section className="relative bg-foreground py-20">
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[150px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Tools Grid ──── */}
      <section id="tools" className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel label="Fitur Lengkap" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-5xl mt-4"
            >
              Semua yang Anda Butuhkan
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mt-4 max-w-xl mx-auto"
            >
              8+ fitur profesional untuk mengolah dokumen PDF Anda.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {tools.map((tool) => (
              <motion.div key={tool.title} variants={fadeInUp}>
                <Link href={tool.href}>
                  <Card className="group h-full cursor-pointer" padding="lg">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-sm group-hover:shadow-accent transition-shadow`}
                    >
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.desc}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──── How It Works ──── */}
      <section id="how" className="py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel label="Cara Kerja" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-5xl mt-4"
            >
              Tiga Langkah Mudah
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Upload File",
                desc: "Seret & lepas atau klik untuk mengunggah file PDF atau format lain.",
                icon: Upload,
              },
              {
                step: "02",
                title: "Proses Otomatis",
                desc: "Server kami memproses dengan algoritma berbasis riset terbaru.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Download Hasil",
                desc: "Unduh file yang sudah diproses — cepat, aman, tanpa registrasi.",
                icon: Download,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-5 shadow-accent">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-display gradient-text mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {item.desc}
                </p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-muted-foreground/30">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Standards & Journals ──── */}
      <section id="standards" className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel label="Standar & Riset" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-5xl mt-4"
            >
              Dibangun di Atas Standar
              <br />
              <span className="gradient-text">International</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mt-4 max-w-xl mx-auto"
            >
              SID PDF merujuk pada standar ISO resmi dan jurnal ilmiah dari universitas terkemuka.
            </motion.p>
          </motion.div>

          {/* ISO Standards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {standards.map((std, i) => (
              <motion.div
                key={std.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card padding="lg" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-accent mb-1">{std.code}</div>
                      <h3 className="font-semibold text-foreground">{std.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{std.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Journals */}
          <div id="journals">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-2xl md:text-3xl text-center mb-8"
            >
              Jurnal Ilmiah Pendukung
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {journals.map((j, i) => (
                <motion.div
                  key={j.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card padding="lg" className="h-full group">
                    <div className="flex items-start gap-3 mb-3">
                      <Quote className="w-4 h-4 text-accent/40 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                          {j.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {j.institution} &middot; {j.year}
                        </p>
                        <span className="inline-block mt-2 px-2.5 py-1 bg-accent/5 border border-accent/20 rounded-full text-[10px] font-mono text-accent uppercase tracking-wider">
                          {j.focus}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──── Why SID PDF ──── */}
      <section className="py-28 bg-foreground relative">
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[150px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel label="Keunggulan" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-5xl mt-4 text-white"
            >
              Mengapa{" "}
              <span className="gradient-text">SID PDF</span>?
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Infinity,
                title: "Tanpa Batas",
                desc: "Tidak ada limit harian. Proses file sebanyak yang Anda butuhkan, kapan saja.",
              },
              {
                icon: Database,
                title: "Data Aman",
                desc: "Semua file dienkripsi dengan AES-256 dan dihapus otomatis setelah 1 jam.",
              },
              {
                icon: Globe,
                title: "Berbasis Standar",
                desc: "Merujuk pada ISO 32000, PDF/A, PDF/UA, dan jurnal ilmiah universitas top dunia.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <Card className="text-center h-full bg-slate-800/50 border-slate-700/50" padding="xl">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-5 shadow-accent">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section id="faq" className="py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel label="FAQ" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-5xl mt-4"
            >
              Pertanyaan Umum
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card padding="lg" className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1.5">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──── Final CTA ──── */}
      <section className="py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl md:text-5xl mb-4">
              Siap Mengolah{" "}
              <span className="gradient-text">PDF</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Mulai sekarang — gratis, tanpa batas, dan tanpa registrasi.
            </p>
            <Link href="/tools/convert">
              <Button size="xl" className="shadow-accent hover:shadow-accent-lg">
                <Sparkles className="w-5 h-5" />
                Mulai Gratis Sekarang
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Upload(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function Download(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
