# SID PDF


**SID PDF** — web app buat ngolah PDF. Konversi, kompres, gabung-pisah, proteksi password, watermark. 

---

## Yang bisa dilakuin

- **Konversi dua arah** — PDF ↔ Word, Excel, PPT, JPG, PNG
- **Kompres** — 3 level, dari maksimum sampe ringan
- **Gabung / Pisah** — satuin atau ekstrak halaman
- **Password** — enkripsi AES-256 & buka kunci
- **Watermark** — teks custom, atur rotasi & opasitas
- **Batch** — proses 50 file sekaligus

---

## Tech

| Frontend | Backend |
|---|---|
| Next.js 16 + TypeScript | FastAPI + Python |
| Tailwind v4 + Framer Motion | pypdf, PyMuPDF, pdf2docx |

---

## Jalanin

```bash
# Terminal 1 — Backend
cd backend && source venv/bin/activate && python main.py

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

Buka `localhost:3000`, done.

---

## Kenapa bikin ini

Butuh alat PDF yang simpel, nggak pake upload ke server aneh-aneh, dan gue bisa kontrol sendiri. Plus — lumayan buat asah full-stack: Next.js + FastAPI + Python PDF libraries.

---

MIT © 2026 [Ari Rahmat](https://github.com/arighmt67-bit)
