/* ===== DcemilinYuk - Supabase Client ===== */
const SUPABASE_URL = 'https://grbkjuyctjijnmaqvxib.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyYmtqdXljdGppam5tYXF2eGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTI3NjQsImV4cCI6MjA5NDMyODc2NH0.8btpBaS8rCQMjqyjEs8Jesle0WK0m_mVcqbdtndySiM';

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
