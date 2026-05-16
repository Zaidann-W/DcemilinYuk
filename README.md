# 🛍️ Template Website Katalog Toko

Website katalog produk modern dengan admin panel, integrasi WhatsApp, dan database cloud (Supabase).

---

## ⚡ Setup untuk Klien Baru (± 30 menit)

### Langkah 1 — Edit `src/js/config.js`

Buka file `src/js/config.js` dan isi semua field:

```js
const CONFIG = {
  STORE_NAME:      'Nama Toko Klien',
  STORE_TAGLINE:   'Tagline toko yang menarik',
  STORE_HIGHLIGHT: 'Kata yang diwarnai di judul',
  STORE_SUBTITLE:  'Deskripsi hero section',
  STORE_DESC_SHORT:'Deskripsi pendek untuk footer',

  WA_NUMBER: '628xxxxxxxxxx',   // Nomor WA tanpa +

  ADDRESS:   'Alamat toko',
  EMAIL:     'email@toko.com',
  INSTAGRAM: '@namatoko',

  SUPABASE_URL: 'https://xxx.supabase.co',
  SUPABASE_KEY: 'eyJ...',

  COPYRIGHT_YEAR: '2025'
};
```

### Langkah 2 — Setup Supabase

1. Daftar gratis di [supabase.com](https://supabase.com)
2. Buat project baru
3. Jalankan file `supabase_setup.sql` di SQL Editor
4. Buat akun admin: **Authentication → Users → Add user**
5. Copy **Project URL** dan **anon public key** → paste ke `config.js`

### Langkah 3 — Ganti Foto & Konten

| File | Keterangan |
|------|-----------|
| `src/img/hero.png` | Foto utama hero section |
| `src/img/*.png` | Foto produk default |

### Langkah 4 — Deploy ke Netlify

1. Upload ke GitHub
2. Connect repo ke [netlify.com](https://netlify.com)
3. Publish directory: `src` | Build command: *(kosong)*
4. Deploy → selesai! 🚀

---

## 🔑 Akses Admin Panel

Buka: `[url-website]/Admin.html`  
Login dengan email + password yang dibuat di Supabase Auth.

---

## 📦 Fitur

- ✅ Katalog produk dinamis (dari Supabase database)
- ✅ Order via WhatsApp langsung
- ✅ Admin panel tanpa koding (tambah/edit/hapus produk)
- ✅ Dark mode / Light mode
- ✅ Responsif mobile
- ✅ Animasi background gradient
- ✅ Filter & search produk

---

## 🛠️ Customisasi Lanjutan

- **Warna**: Edit `src/css/variables.css`
- **Kategori**: Tambah via Admin Panel atau SQL
- **Font**: Ganti di `src/css/style.css` bagian Google Fonts

---

## 📞 Support

Untuk pertanyaan dan customisasi lebih lanjut, hubungi developer.
