-- =============================================
-- DcemilinYuk - Supabase Schema Setup
-- Jalankan di: Supabase → SQL Editor → New Query
-- =============================================

-- 1. Tabel Kategori
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '🛍️',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Produk
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  image TEXT DEFAULT '',
  description TEXT DEFAULT '',
  rating DECIMAL(3,1) DEFAULT 4.5,
  sold INTEGER DEFAULT 0,
  badge TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Aktifkan Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 4. Semua orang bisa READ
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- 5. Hanya admin (authenticated) yang bisa WRITE
CREATE POLICY "Auth write products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete products" ON products FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth write categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update categories" ON categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete categories" ON categories FOR DELETE TO authenticated USING (true);

-- 6. Insert data kategori default
INSERT INTO categories (id, name, icon, description) VALUES
  ('esteh',    'Es Teh',    '🍵', 'Segar & Nikmat'),
  ('popice',   'Pop Ice',   '🧊', 'Dingin & Manis'),
  ('icecream', 'Ice Cream', '🍦', 'Premium & Lezat'),
  ('bolen',    'Bolen',     '🥐', 'Renyah & Gurih')
ON CONFLICT (id) DO NOTHING;

-- 7. Insert produk default
INSERT INTO products (id, name, category, price, image, description, rating, sold, badge) VALUES
  ('et1', 'Es Teh Manis',       'esteh',    5000,  'img/esteh.png',   'Es teh manis klasik yang menyegarkan, dibuat dari teh pilihan.', 4.8, 1250, 'Populer'),
  ('et2', 'Es Teh Tarik',       'esteh',    8000,  'img/esteh.png',   'Es teh tarik dengan susu kental manis, creamy dan nikmat.', 4.7, 980, ''),
  ('et3', 'Es Teh Lemon',       'esteh',    7000,  'img/esteh.png',   'Perpaduan teh segar dengan perasan lemon asli.', 4.6, 756, 'Baru'),
  ('et4', 'Es Teh Susu',        'esteh',    8000,  'img/esteh.png',   'Es teh premium dengan campuran susu segar.', 4.9, 1100, ''),
  ('pi1', 'Pop Ice Mangga',     'popice',   5000,  'img/popice.png',  'Pop Ice rasa mangga yang manis dan menyegarkan.', 4.5, 890, ''),
  ('pi2', 'Pop Ice Anggur',     'popice',   5000,  'img/popice.png',  'Pop Ice rasa anggur favorit semua kalangan.', 4.4, 720, ''),
  ('pi3', 'Pop Ice Strawberry', 'popice',   6000,  'img/popice.png',  'Pop Ice strawberry dengan rasa buah segar.', 4.6, 650, 'Populer'),
  ('pi4', 'Pop Ice Coklat',     'popice',   6000,  'img/popice.png',  'Pop Ice coklat yang creamy dan lezat.', 4.3, 580, ''),
  ('ic1', 'Ice Cream Vanilla',  'icecream', 10000, 'img/icecream.png','Ice cream vanilla premium dengan biji vanilla asli.', 4.8, 1500, 'Best Seller'),
  ('ic2', 'Ice Cream Coklat',   'icecream', 10000, 'img/icecream.png','Ice cream coklat Belgian yang kaya rasa.', 4.7, 1320, ''),
  ('ic3', 'Ice Cream Strawberry','icecream',12000, 'img/icecream.png','Ice cream strawberry dengan potongan buah asli.', 4.9, 980, 'Baru'),
  ('ic4', 'Ice Cream Matcha',   'icecream', 15000, 'img/icecream.png','Ice cream matcha Jepang premium grade A.', 4.8, 870, ''),
  ('bl1', 'Bolen Pisang',       'bolen',    5000,  'img/bolen.png',   'Bolen pisang renyah dengan isian pisang manis.', 4.7, 2100, 'Best Seller'),
  ('bl2', 'Bolen Keju',         'bolen',    7000,  'img/bolen.png',   'Bolen keju dengan lelehan keju yang gurih.', 4.6, 1800, ''),
  ('bl3', 'Bolen Coklat',       'bolen',    7000,  'img/bolen.png',   'Bolen dengan isian coklat leleh yang nikmat.', 4.8, 1650, 'Populer'),
  ('bl4', 'Bolen Pisang Coklat','bolen',    8000,  'img/bolen.png',   'Kombinasi pisang dan coklat dalam pastry renyah.', 4.9, 1400, '')
ON CONFLICT (id) DO NOTHING;
