# Template XML Blogspot Streaming Anime & Donghua

Template XML Blogspot profesional untuk website streaming anime dan donghua dengan fitur lengkap dan tampilan modern.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Struktur File](#struktur-file)
- [Cara Instalasi](#cara-instalasi)
- [Konfigurasi](#konfigurasi)
- [Halaman yang Tersedia](#halaman-yang-tersedia)
- [Fitur Keamanan](#fitur-keamanan)
- [Tips Penggunaan](#tips-penggunaan)
- [Troubleshooting](#troubleshooting)
- [Pembaruan](#pembaruan)

## 🌟 Fitur Utama

### ✅ Tampilan Modern
- Desain dark mode yang elegan
- Responsive dan mobile-first
- Animasi smooth dan interaktif
- Loading screen profesional

### ✅ Generator Otomatis
- **Generator Series**: Buat postingan series otomatis dengan template profesional
- **Generator Episode**: Generate multiple episode sekaligus dengan berbagai pilihan server
- **Batch Processing**: Proses banyak episode dalam satu kali generate

### ✅ Manajemen Konten
- **Kelola Series**: Panel administrasi untuk mengelola series dan episode
- **Jadwal Rilis**: Halaman jadwal lengkap dengan filter dan pencarian
- **Pengumuman**: Sistem pengumuman dengan prioritas

### ✅ Keamanan & Perlindungan
- **NSFW Detection**: Deteksi otomatis konten dewasa dengan peringatan
- **Anti-Copy Protection**: Perlindungan terhadap pencurian konten
- **Watermark**: Watermark otomatis pada video player
- **DMCA Policy**: Sistem laporan pelanggaran hak cipta

### ✅ Fitur Interaktif
- **Dark Mode**: Toggle dark mode otomatis
- **Lazy Loading**: Loading gambar yang efisien
- **Infinite Scroll**: Scroll tanpa batas
- **Live Search**: Pencarian realtime
- **Notification System**: Sistem notifikasi modern

## 📁 Struktur File

```
template_anime_streaming/
├── template_anime_streaming.xml    # Template XML utama Blogspot
├── css/
│   └── unified.css                 # Styling seragam semua halaman
├── js/
│   └── unified.js                  # JavaScript interaktif
├── page_pengumuman.html              # Halaman pengumuman
├── page_jadwal.html                   # Halaman jadwal rilis
├── page_generator_series.html         # Generator series otomatis
├── page_generator_eps.html            # Generator episode otomatis
├── page_kelola.html                   # Panel kelola series & episode
├── page_disclaimer.html               # Disclaimer & DMCA Policy
├── page_intro.html                    # Halaman intro/selamat datang
└── README.md                          # Dokumentasi ini
```

## 🚀 Cara Instalasi

### 1. Instalasi Template XML

1. **Backup Blog Lama**: Ekspor template XML Blogspot Anda yang lama
2. **Upload Template Baru**:
   - Masuk ke Blogger Dashboard
   - Pilih "Tema" → "Edit HTML"
   - Hapus semua kode yang ada
   - Copy semua kode dari `template_anime_streaming.xml`
   - Paste ke editor HTML
   - Klik "Simpan Tema"

### 2. Upload File CSS & JavaScript

1. **Upload CSS**:
   - Masuk ke "Tata Letak" → "Tambahkan Gadget"
   - Pilih "HTML/JavaScript"
   - Letakkan di bagian head atau sebelum `</head>`
   - Copy kode dari `css/unified.css`
   - Tambahkan tag `<style>` di awal dan akhir

2. **Upload JavaScript**:
   - Buat halaman statis baru
   - Copy kode dari `js/unified.js`
   - Simpan dengan nama `unified-js`
   - Dapatkan URL halamannya
   - Tambahkan referensi di template XML

### 3. Buat Halaman Statis

Untuk setiap halaman HTML, buat halaman statis di Blogspot:

1. Masuk ke "Halaman" → "Halaman Baru"
2. Pilih mode "HTML"
3. Copy kode dari file yang sesuai
4. Simpan dengan nama yang sesuai
5. Dapatkan URL halamannya untuk navigasi

## ⚙️ Konfigurasi

### Konfigurasi Utama

Edit bagian berikut di template XML:

```xml
<script type='text/javascript'>
  const SITE_CONFIG = {
    name: 'NamaWebsiteAnda',  // Ganti dengan nama website
    apiUrl: '/api',
    debug: true,
    
    // NSFW Keywords
    nsfwKeywords: ['yaoi', 'bl', 'gl', 'bxb', 'gxg', 'hentai'],
    
    // Anti-copy protection
    antiCopy: {
      enabled: true,
      message: 'Konten ini dilindungi hak cipta'
    },
    
    // Watermark settings
    watermark: {
      enabled: true,
      text: 'NamaWebsiteAnda',  // Ganti dengan nama website
      opacity: 0.7,
      position: 'bottom-right'
    }
  };
</script>
```

### Konfigurasi Server

Untuk generator episode, konfigurasikan server streaming:

```javascript
serverConfigs: {
  server1: { 
    url: 'https://server1.com/embed/', 
    quality: ['360p', '480p', '720p', '1080p'] 
  },
  server2: { 
    url: 'https://server2.com/embed/', 
    quality: ['720p', '1080p'] 
  },
  server3: { 
    url: 'https://server3.com/embed/', 
    quality: ['480p', '720p'] 
  }
}
```

## 📄 Halaman yang Tersedia

### 1. Halaman Utama (index)
- Hero section dengan slider anime terbaru
- Grid anime dengan filter dan pencarian
- Navigation menu yang responsive

### 2. Halaman Pengumuman (`page_pengumuman.html`)
- Menampilkan pengumuman dengan prioritas
- Sistem filter berdasarkan kategori
- Auto-refresh setiap 5 menit

### 3. Halaman Jadwal (`page_jadwal.html`)
- Jadwal rilis anime per hari
- Filter berdasarkan tipe (anime/donghua)
- Pencarian realtime
- Indikator waktu untuk episode yang sedang tayang

### 4. Generator Series (`page_generator_series.html`)
- Form otomatis untuk membuat postingan series
- Template pilihan: Standard, Premium, Minimal
- Deteksi NSFW otomatis
- Preview langsung
- Copy ke clipboard

### 5. Generator Episode (`page_generator_eps.html`)
- Generate multiple episode sekaligus
- Banyak pilihan server streaming
- Konfigurasi kualitas video
- Batch processing
- Navigasi episode otomatis

### 6. Panel Kelola (`page_kelola.html`)
- Dashboard statistik lengkap
- Tambah/edit series dan episode
- Export data ke JSON
- Filter dan sorting
- Management konten

### 7. Disclaimer & DMCA (`page_disclaimer.html`)
- Kebijakan penggunaan website
- Prosedur DMCA untuk pelaporan pelanggaran
- Informasi kontak untuk DMCA
- Peringatan konten dewasa

### 8. Halaman Intro (`page_intro.html`)
- Welcome screen dengan animasi
- Verifikasi usia untuk konten NSFW
- Penjelasan fitur website
- Auto-redirect setelah verifikasi

## 🔒 Fitur Keamanan

### 1. NSFW Detection
```javascript
// Deteksi otomatis konten dewasa
NSFWManager.checkContent(title, tags);
NSFWManager.showWarning(title, callback);
```

### 2. Anti-Copy Protection
```javascript
// Mencegah copy-paste konten
AntiCopy.init();
```

### 3. Watermark System
```javascript
// Tambahkan watermark otomatis
Watermark.add('video-container', 'NamaWebsite');
```

### 4. DMCA Compliance
- Form pelaporan pelanggaran hak cipta
- Proses penanganan 1-3 hari kerja
- Perlindungan terhadap klaim palsu

## 💡 Tips Penggunaan

### 1. Label Blogger yang Direkomendasikan

Untuk organisasi konten yang baik, gunakan label berikut:

```
# Label Tipe Konten
Anime, Donghua, Movie, OVA, Special

# Label Status
Ongoing, Completed, Upcoming, Hiatus

# Label Genre
Action, Adventure, Comedy, Drama, Fantasy, Romance, Sci-Fi, Thriller

# Label Musim
Winter 2026, Spring 2026, Summer 2026, Fall 2026

# Label Khusus (untuk NSFW)
Yaoi, BL, GL, Ecchi, Hentai (gunakan dengan hati-hati)
```

### 2. Struktur Penamaan Postingan

```
Format: [Judul Series] Episode [Nomor] Sub Indo
Contoh: Solo Leveling Season 2 Episode 7 Sub Indo
```

### 3. Penggunaan Generator

1. **Untuk Series Baru**:
   - Isi form lengkap di generator series
   - Pilih template yang sesuai
   - Copy hasil ke postingan Blogger baru

2. **Untuk Episode Baru**:
   - Gunakan generator episode
   - Masukkan range episode (misal: 1-12)
   - Konfigurasikan server streaming
   - Generate dan copy hasilnya

## 🔧 Troubleshooting

### Masalah Umum

#### 1. Template tidak muncul dengan benar
- Pastikan semua file CSS dan JavaScript sudah diupload
- Cek konsol browser untuk error
- Verifikasi struktur XML tidak rusak

#### 2. Video tidak dapat diputar
- Periksa URL embed dari server streaming
- Pastikan server mendukung iframe embed
- Coba gunakan server alternatif

#### 3. NSFW warning tidak muncul
- Pastikan keyword NSFW sudah benar di konfigurasi
- Cek browser console untuk error JavaScript
- Verifikasi localStorage diizinkan

#### 4. Dark mode tidak berfungsi
- Pastikan localStorage diizinkan di browser
- Cek apakah ada konflik dengan script lain
- Refresh browser setelah mengubah tema

### Error Messages

#### "Konten dilindungi hak cipta"
- Fitur anti-copy sedang aktif
- Disable melalui konfigurasi jika diperlukan

#### "Server tidak tersedia"
- Server streaming mungkin down
- Gunakan server alternatif
- Cek koneksi internet

## 🔄 Pembaruan

Untuk memperbarui template:

1. Backup konfigurasi Anda
2. Download versi terbaru
3. Bandingkan perubahan dengan versi lama
4. Update file yang diperlukan
5. Test semua fitur

### Fitur yang Akan Datang

- [ ] Sistem komentar yang lebih baik
- [ ] Rating dan review anime
- [ ] Rekomendasi berdasarkan history
- [ ] Offline mode
- [ ] Progressive Web App (PWA)
- [ ] Multi-bahasa support
- [ ] Advanced analytics
- [ ] Social sharing

## 📞 Dukungan

Jika mengalami masalah:

1. Cek dokumentasi ini terlebih dahulu
2. Pastikan semua langkah instalasi diikuti
3. Cek browser console untuk error messages
4. Hubungi developer jika masalah berlanjut

## 📄 Lisensi

Template ini gratis untuk digunakan dengan ketentuan:
- Tidak untuk dijual kembali
- Credit tetap disertakan
- Gunakan dengan bijak dan etis

---

**Catatan Penting**: Template ini dibuat untuk tujuan edukatif. Pastikan Anda mematuhi hukum yang berlaku di negara Anda dan hormati hak cipta pembuat konten asli.

© 2026 StreamingHub Template - All rights reserved.