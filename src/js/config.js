/* ================================================================
   KONFIGURASI TOKO - Edit file ini untuk menyesuaikan toko Anda
   ================================================================ */

const CONFIG = {

  // ── IDENTITAS TOKO ──────────────────────────────────────────
  STORE_NAME:    'DcemilinYuk',
  STORE_TAGLINE: 'Jajanan Favorit Kamu Ada di Sini!',
  STORE_HIGHLIGHT: 'Favorit',              // Kata yang diwarnai di judul
  STORE_SUBTITLE: 'Temukan berbagai cemilan dan minuman lezat dari pedagang kecil terpercaya. Pesan langsung via WhatsApp, mudah dan cepat!',
  STORE_DESC_SHORT: 'Katalog cemilan dan minuman terbaik dari pedagang kecil lokal. Pesan langsung via WhatsApp, mudah dan cepat!',
  HERO_IMAGE: 'img/hero.png',

  // ── WHATSAPP ────────────────────────────────────────────────
  WA_NUMBER: '6282184445857',              // Format: 62xxx (tanpa +)
  WA_DEFAULT_MSG: 'Halo, saya ingin memesan dari {store}!',

  // ── KONTAK & SOSIAL MEDIA ───────────────────────────────────
  ADDRESS:   'Jl. Bogangin Baru Blok D No. 5',
  PHONE:     '082184445857',
  EMAIL:     '',
  INSTAGRAM: '@dcemilin_yuk',
  HOURS:     'Setiap Hari, 10:00 – 22:00 WIB',
  MAPS_URL:  '',                           // Link Google Maps (opsional)

  // ── HERO STATS ──────────────────────────────────────────────
  STATS: [
    { number: '16+', label: 'Produk' },
    { number: '4',   label: 'Kategori' },
    { number: 'WA',  label: 'Pesan Mudah' }
  ],

  // ── WARNA UTAMA (opsional, kosongkan untuk pakai default) ───
  // PRIMARY_COLOR: '#F97316',             // Hapus // untuk aktifkan

  // ── SUPABASE DATABASE ───────────────────────────────────────
  // Isi setelah buat project di supabase.com
  SUPABASE_URL: 'https://grbkjuyctjijnmaqvxib.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyYmtqdXljdGppam5tYXF2eGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3NjQsImV4cCI6MjA5NDMyODc2NH0.8btpBaS8rCQMjqyjEs8Jesle0WK0m_mVcqbdtndySiM',

  // ── SEO ─────────────────────────────────────────────────────
  META_DESCRIPTION: 'Katalog produk DcemilinYuk - Cemilan dan minuman terbaik. Pesan via WhatsApp!',
  COPYRIGHT_YEAR: '2025'
};
