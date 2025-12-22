# 🚀 AI CV Generator & Optimizer

Aplikasi pembuat CV modern yang menggunakan kecerdasan buatan (AI) untuk mengoptimalkan profil profesional agar lebih menarik bagi rekruter dan ramah terhadap sistem **ATS (Applicant Tracking System)**.

## ✨ Fitur Utama
- **AI Professional Profile Optimizer**: Mengubah data pengalaman mentah menjadi paragraf profil profesional yang berwibawa menggunakan model Llama 3.3 melalui Groq API.
- **Modern UI/UX**: Tampilan bersih dan minimalis yang fokus pada keterbacaan.
- **Multiple Templates**: Pilihan desain CV mulai dari Klasik Standar hingga Modern Executive.
- **Instant Preview & Print**: Lihat hasil CV secara real-time dan unduh sebagai PDF yang siap cetak.
- **Privacy Focused**: Data disimpan secara lokal menggunakan `localStorage` untuk keamanan data pengguna.

## 🛠️ Tech Stack
- **Framework**: [Next.js 14/15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Groq Cloud API](https://groq.com/) (Llama 3.3 70B Model)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone Repository**
   ```bash
   git clone [https://github.com/username-anda/nama-repo.git](https://github.com/username-anda/nama-repo.git)
   cd nama-repo

2. **Install Dependencies**
   ```bash
   npm install

3. **Konfigurasi Environment Variables** Buat file .env.local di root directory dan masukkan API Key Groq Anda:

4. **Jalankan Project**
   ```bash
   npm run dev

   Buka http://localhost:3000 di browser Anda.