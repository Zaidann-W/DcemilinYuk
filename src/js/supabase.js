/* ===== DcemilinYuk - Supabase Client ===== */
// Credentials dibaca dari config.js
const SUPABASE_URL = (typeof CONFIG !== 'undefined') ? CONFIG.SUPABASE_URL : '';
const SUPABASE_KEY = (typeof CONFIG !== 'undefined') ? CONFIG.SUPABASE_KEY : '';

const db = (SUPABASE_URL && SUPABASE_KEY)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// Global data cache (diisi oleh initData)
let _products   = null;
let _categories = null;

async function initData() {
  try {
    const [{ data: prods, error: e1 }, { data: cats, error: e2 }] = await Promise.all([
      db.from('products').select('*').order('created_at'),
      db.from('categories').select('*').order('created_at')
    ]);
    _products   = (prods  && prods.length  > 0) ? prods  : DEFAULT_PRODUCTS;
    _categories = (cats   && cats.length   > 0) ? cats   : DEFAULT_CATEGORIES;
  } catch (err) {
    console.warn('Supabase tidak tersedia, pakai data default:', err);
    _products   = DEFAULT_PRODUCTS;
    _categories = DEFAULT_CATEGORIES;
  }
}

async function refreshData() {
  await initData();
}
