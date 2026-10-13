# PaaS Express Worker on Cloudflare Workers

Proyek praktikum mandiri Mata Pelajaran **Platform as a Service (PaaS) – Semester 1 (Minggu 5, P1)**.  
Kode Modul: **S1-M05-P1**  
Praktikan: **Atha**  
Project Name: `paas-express-atha`

---

## 1. Konsep & Arsitektur

Pada modul Minggu 5 ini, terjadi transisi dari hosting aset statis (Minggu 4) menuju **backend dinamis berbasis Node.js & Express** yang berjalan di serverless edge Cloudflare Workers.

- **Tanpa Server Fisik/Always-on VM**: Worker tidak menjalankan loop OS long-running layaknya VPS/container (seperti Docker di Railway/Render), melainkan dieksekusi on-demand di ratusan lokasi edge Cloudflare.
- **Node.js Compatibility Layer**: `cloudflare:node` menyediakan API runtime Node.js bawaan.
- **Adapter `httpServerHandler`**: Memetakan event incoming fetch request dari Cloudflare langsung ke virtual port internal 3000 pada listener Express.

```
Internet Request (HTTPS) ──> Cloudflare Edge Worker (httpServerHandler) ──> Virtual Port 3000 (Express App) ──> JSON Response
```

---

## 2. Struktur Proyek

```text
paas-express-worker/
├── src/
│   └── index.ts         # Inisialisasi Express, routing, dan adapter httpServerHandler
├── package.json         # Dependency: express, @types/express, wrangler, typescript
├── tsconfig.json        # Konfigurasi TypeScript untuk environment Workers
├── wrangler.jsonc       # Konfigurasi Cloudflare Workers (entry point & compatibility)
└── README.md            # Dokumentasi & panduan pengujian
```

---

## 3. Daftar Endpoint API

| Method | Endpoint | Fungsi | Contoh Response JSON |
|---|---|---|---|
| `GET` | `/` | Endpoint Root | `{"message":"Hello Express on Cloudflare Workers!","author":"Atha",...}` |
| `GET` | `/api/status` | Status Sistem | `{"status":"ok","subject":"PaaS","week":5,"platform":"Cloudflare Workers",...}` |
| `GET` | `/api/info` | Challenge Info | `{"framework":"Express","runtime":"Cloudflare Workers","course":"Platform as a Service",...}` |
| `GET` | `/api/log-test` | Observability & Log | `{"logged":true,"timestamp":"...","message":"Log berhasil dikirim..."}` |

---

## 4. Cara Menjalankan & Pengujian

### A. Instalasi Dependensi
Pastikan kamu berada di folder proyek:
```bash
cd paas-express-worker
npm install
```

### B. Uji Coba Lokal (Local Dev Server)
Jalankan simulator Workers di komputer:
```bash
npm run dev
```
Buka browser atau Postman pada:
- `http://localhost:8787/`
- `http://localhost:8787/api/status`
- `http://localhost:8787/api/info`
- `http://localhost:8787/api/log-test`

### C. Live Log Streaming (Observability)
Untuk melihat output `console.log()` secara real-time saat endpoint diakses:
```bash
npm run tail
# atau: npx wrangler tail
```

### D. Deployment ke Cloudflare Workers
Deploy langsung ke internet publik:
```bash
npx wrangler login   # Jika belum login akun Cloudflare
npm run deploy       # Build & upload ke Cloudflare Edge
```
URL publik akan aktif pada format:
```text
https://paas-express-atha.<subdomain-akun>.workers.dev
```

---

## 5. Checklist Bukti Praktikum (Evidence)

- [ ] Screenshot struktur direktori proyek dan isi file `wrangler.jsonc` di VS Code.
- [ ] Screenshot terminal saat menjalankan `npm run dev` dan hasil curl/browser ke `localhost:8787`.
- [ ] Screenshot output terminal saat `npm run deploy` berhasil diunggah ke Cloudflare.
- [ ] Screenshot akses URL publik `*.workers.dev` pada endpoint `/`, `/api/status`, dan `/api/info`.
- [ ] Screenshot terminal `npx wrangler tail` menangkap log dari `/api/log-test`.
