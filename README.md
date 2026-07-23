# 🦝 Raccly - Interactive English Learning Platform

**Raccly** adalah platform pembelajaran Bahasa Inggris interaktif yang dirancang dengan antarmuka modern, estetik, dan *game-like*. Raccly membantu siswa dan pembelajar menguasai **Vocabulary**, **Grammar**, dan **Reading** dengan cara yang menyenangkan, *scannable*, dan tidak membosankan.

---

## ✨ Fitur Utama

### 📚 1. Mode Vocabulary (Kosakata)
- **Flashcard Mode**: Kartu interaktif 2 sisi dengan animasi flip 3D, petunjuk pelafalan, *dashed inner frame*, pagination dot windowing, dan fitur *Tandai Sudah Hafal*.
- **Swipe Game Mode**: Mode geser cepat (*swipe right* jika sudah hafal, *swipe left* jika perlu diulang).
- **Multiple Choice Quiz**: Kuis pilihan ganda interaktif dengan umpan balik (*feedback*) langsung dari maskot.

### 📊 2. Mode Grammar (Tata Bahasa)
- **Card-Based Presentation**: Pembagian materi per section menjadi card-card visual terpisah.
- **Grid Card Fungsi (2x2)**: Penyajian fungsi utama tenses dalam format grid card yang ringkas.
- **Diagram Pattern Flow Pills**: Visualisasi rumus kalimat (`Subjek + Verb 1 + ...`) menjadi diagram pill visual yang mudah dipahami.
- **Warning Card Kesalahan Umum**: Card peringatan khusus (*soft warm orange*) dengan perbandingan berdampingan `❌ Salah (Incorrect)` vs `✓ Benar (Correct)`.
- **Progressive Disclosure (Accordion)**: Fitur buka-tutup detail untuk aturan panjang seperti *Irregular Verbs* dan aturan ejaan.
- **Latihan Soal Grammar**: Kuis evaluasi pemahaman di akhir setiap materi.

### 📖 3. Mode Reading (Membaca Cerita)
- Koleksi cerita pendek bilingual (Bahasa Inggris & Bahasa Indonesia).
- Kuis pemahaman bacaan di akhir cerita untuk menguji daya serap materi.

### 📈 4. Dashboard Progress & Statistik
- Pantau persentase kosakata yang sudah dikuasai.
- Pantau jumlah cerita yang telah dibaca.
- Rata-rata nilai kuis Vocabulary dan Grammar.

### 🦝 5. Maskot Interaktif (Raccly Host)
- Maskot rakun pintar yang memberikan motivasi, petunjuk, dan respon secara dinamis sesuai halaman yang dibuka pengguna.

---

## 🛠️ Teknologi yang Digunakan

- **Core**: [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Storage**: React Context API & `localStorage` (dengan *backward compatibility fallback*).

---

## 🚀 Panduan Memulai (Local Setup)

### 1. Clone Repositori
```bash
git clone https://github.com/AbdulGhoni109/Raccly.git
cd Raccly
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Dev Server
```bash
npm run dev
```
Buka browser dan akses alamat yang tertera (biasanya `http://localhost:5173` atau `http://localhost:5176`).

### 4. Build untuk Produksi
```bash
npm run build
```

---

## 📁 Struktur Direktori

```text
Raccly/
├── public/                # Asset statis & maskot
├── src/
│   ├── assets/            # Gambaran umum & vektor
│   ├── components/        # Komponen modular (Vocabulary, Grammar, Reading, Mascot)
│   ├── contexts/          # State global MascotContext
│   ├── data/              # Dataset kosakata, grammar, dan cerita
│   ├── hooks/             # Custom hook (useLocalStorage)
│   ├── pages/             # Halaman utama (Vocabulary, Grammar, Reading, Dashboard)
│   ├── App.jsx            # Routing & Layout utama
│   ├── main.jsx           # Entrypoint React
│   └── index.css          # Core CSS & Design System
├── index.html             # HTML Shell
└── package.json           # Dependensi & script proyek
```

---

## 📄 Lisensi

Hak Cipta © 2026 **Raccly Team**. Seluruh hak cipta dilindungi undang-undang.
