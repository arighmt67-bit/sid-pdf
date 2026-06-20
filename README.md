# SID PDF

<div align="center">

**Smart PDF Tools — Pengolah PDF Modern Berbasis Web**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## 🚀 Apa itu SID PDF?

**SID PDF** adalah aplikasi pengolah PDF modern yang berjalan di browser. Dibangun untuk kebutuhan dokumen sehari-hari — dari konversi, kompresi, gabung-pisah, sampai proteksi password dan watermark. Semua pemrosesan dilakukan di sisi server, file kamu aman dan otomatis terhapus setelah 1 jam.

> **Dibangun dengan standar ISO** (32000-2, PDF/A, PDF/UA, PDF/E) **dan riset akademik** (Allen AI, Oracle Labs, UC Berkeley, UNC).

---

## ✨ Fitur Lengkap

| Fitur | Deskripsi |
|---|---|
| 🔄 **Konversi Dua Arah** | PDF ↔ Word, Excel, PPT, JPG, PNG |
| 📦 **Kompres PDF** | 3 level: Maksimum, Seimbang, Ringan |
| 🔗 **Gabung PDF** | Gabung banyak file jadi satu dokumen |
| ✂️ **Pisah PDF** | Ekstrak halaman tertentu |
| 🔒 **Proteksi** | Enkripsi password AES-256 |
| 🔓 **Buka Kunci** | Dekripsi PDF yang terkunci |
| 💧 **Watermark** | Tambah teks custom (rotasi, opasitas, ukuran) |
| 📚 **Batch** | Proses sampai 50 file sekaligus |
| 🎨 **Drag & Drop** | Upload file tinggal seret |

---

## 🎨 Design System

> **Electrik Blue Minimalist** — clean, modern, fokus ke konten.

| Elemen | Value |
|---|---|
| Gradien | `linear-gradient(135deg, #0052FF, #4D7CFF)` |
| Font Display | **Calistoga** _(headlines)_ |
| Font UI | **Inter** _(body, labels)_ |
| Font Mono | **JetBrains Mono** _(badges, code)_ |
| Animasi | Framer Motion + floating elements |

---

## 🏗️ Tech Stack

```
sid-pdf/
├── frontend/          # Next.js 16 + TypeScript + Tailwind v4
│   └── src/
│       ├── app/       # 9 halaman (landing + 7 tools + batch)
│       ├── components/# UI components reusable
│       └── lib/       # Utils (cn, formatFileSize)
│
└── backend/           # FastAPI + Python
    └── main.py        # 12 endpoint PDF processing
```

---

## ⚡ Quick Start

### Prasyarat

- **Python 3.12+**
- **Node.js 22+**
- **pip** & **npm**

### 1. Clone & Setup Backend

```bash
git clone https://github.com/arighmt67-bit/sid-pdf.git
cd sid-pdf/backend

# Buat virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pypdf pdf2docx PyMuPDF python-docx python-pptx openpyxl Pillow reportlab

# Jalankan backend
python main.py
# → Running on http://localhost:8000
```

### 2. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Jalankan dev server
npm run dev
# → Running on http://localhost:3000
```

### 3. Buka Browser

Buka **http://localhost:3000** dan mulai olah PDF kamu!

---

## 🔧 API Endpoints

| Method | Endpoint | Fungsi |
|---|---|---|
| `POST` | `/api/convert/pdf-to-word` | PDF → DOCX |
| `POST` | `/api/convert/pdf-to-excel` | PDF → XLSX |
| `POST` | `/api/convert/pdf-to-images` | PDF → JPG/PNG |
| `POST` | `/api/convert/pdf-to-ppt` | PDF → PPTX |
| `POST` | `/api/convert/office-to-pdf` | DOCX/Image → PDF |
| `POST` | `/api/compress` | Kompres PDF |
| `POST` | `/api/merge` | Gabung PDF |
| `POST` | `/api/split` | Pisah PDF |
| `POST` | `/api/protect` | Enkripsi password |
| `POST` | `/api/unlock` | Buka kunci PDF |
| `POST` | `/api/watermark` | Tambah watermark |

---

## 📚 Standar & Referensi

### ISO Standards

- **ISO 32000-2:2020** — Document management, PDF 2.0
- **ISO 19005 (PDF/A)** — Archiving standard
- **ISO 14289 (PDF/UA)** — Universal accessibility
- **ISO 24517 (PDF/E)** — Engineering workflows

### Riset Akademik

- **Allen Institute for AI** — Document understanding & parsing
- **Oracle Labs** — PDF content extraction techniques
- **UC Berkeley** — Document layout analysis
- **UNC Chapel Hill** — PDF security & encryption research

---

## 🔐 Keamanan

- File diproses di server lokal, tidak diupload ke cloud
- **Auto-delete** — semua file temporary terhapus setelah 1 jam
- **AES-256** encryption untuk proteksi password
- Tidak ada tracking, tidak ada analytics
- **Unlimited usage** — tanpa batasan jumlah file

---

## 🤝 Kontribusi

Pull request dipersilakan! Untuk perubahan besar, buka issue dulu untuk diskusi.

1. Fork repo
2. Buat branch fitur (`git checkout -b fitur/keren`)
3. Commit perubahan (`git commit -m 'Tambah fitur keren'`)
4. Push ke branch (`git push origin fitur/keren`)
5. Buka Pull Request

---

## 📄 Lisensi

MIT © 2026 [arighmt67-bit](https://github.com/arighmt67-bit)

---

<div align="center">

**Dibuat dengan ☕ oleh [Ari Rahmat](https://github.com/arighmt67-bit)**

</div>
