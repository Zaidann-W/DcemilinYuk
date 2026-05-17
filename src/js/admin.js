/* ===== DcemilinYuk - Admin Panel Logic (Supabase) ===== */

// ===== AUTH =====
async function checkAdminAuth() {
  if (!db) return false;
  try {
    const { data } = await db.auth.getSession();
    return !!data.session;
  } catch { return false; }
}

async function adminLogin(email, password) {
  if (!db) { showToast('Supabase belum dikonfigurasi di config.js!', 'error'); return false; }
  const { error } = await db.auth.signInWithPassword({ email, password });
  return !error;
}

async function adminLogout() {
  if (db) await db.auth.signOut();
  showLoginScreen();
}

// ===== SCREENS =====
function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-panel').style.display  = 'none';
}

function showAdminPanel() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display  = 'block';
  renderAdminPanel();
}

// ===== RENDER ADMIN =====
function renderAdminPanel() {
  renderAdminProducts();
  renderAdminCategories();
  updateStats();
}

function updateStats() {
  document.getElementById('stat-products').textContent   = getProducts().length;
  document.getElementById('stat-categories').textContent = getCategories().length;
}

function renderAdminProducts() {
  const products = getProducts();
  const cats     = getCategories();
  const grid     = document.getElementById('admin-products-grid');
  if (!products.length) {
    grid.innerHTML = `<div class="admin-empty">Belum ada produk. Klik "+ Tambah Produk"!</div>`;
    return;
  }
  grid.innerHTML = products.map((p, idx) => {
    const catName   = cats.find(c => c.id === p.category)?.name || p.category;
    const available = p.available !== false; // default: tersedia
    return `
      <div class="admin-product-card ${available ? '' : 'unavailable'}" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="admin-product-img" onerror="this.src='img/placeholder.png'">
        ${!available ? '<div class="admin-habis-badge">HABIS</div>' : ''}
        <div class="admin-product-info">
          <div class="admin-product-top">
            <div>
              <span class="admin-cat-tag">${catName}</span>
              ${p.badge ? `<span class="admin-badge-tag">${p.badge}</span>` : ''}
            </div>
            <div class="admin-product-actions">
              <label class="avail-switch" title="${available ? 'Klik untuk tandai Habis' : 'Klik untuk tandai Tersedia'}">
                <input type="checkbox" ${available ? 'checked' : ''} onchange="toggleAvailable('${p.id}', ${available})" onclick="event.stopPropagation()">
                <span class="avail-track">
                  <span class="avail-thumb"></span>
                </span>
                <span class="avail-label">${available ? 'Tersedia' : 'Habis'}</span>
              </label>
              <button class="admin-btn admin-btn-edit"   onclick="openEditModal('${p.id}')">Edit</button>
              <button class="admin-btn admin-btn-delete" onclick="deleteProduct('${p.id}')">Hapus</button>
            </div>
          </div>
          <h4 class="admin-product-name">${p.name}</h4>
          <p class="admin-product-desc">${p.description}</p>
          <div class="admin-product-price">${formatCurrency(p.price)}</div>
        </div>
      </div>`;
  }).join('');
}

function renderAdminCategories() {
  const categories = getCategories();
  document.getElementById('admin-categories-list').innerHTML = categories.map(cat => {
    const iconHtml = cat.icon && cat.icon.startsWith('fa-')
      ? `<i class="${cat.icon}"></i>`
      : (cat.icon || '🛍️');
    return `
    <div class="admin-cat-item">
      <span class="cat-icon">${iconHtml}</span>
      <div class="cat-details">
        <strong>${cat.name}</strong>
        <span class="cat-id">ID: ${cat.id}</span>
      </div>
      <button class="admin-btn admin-btn-delete" onclick="deleteCategory('${cat.id}')">Hapus</button>
    </div>`;
  }).join('');

  ['edit-product-category'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    if (cur) sel.value = cur;
  });
}

// ===== PRODUCT MODAL =====
function openAddModal() {
  document.getElementById('modal-title').textContent = 'Tambah Produk Baru';
  document.getElementById('product-form').reset();
  document.getElementById('edit-product-id').value = '';
  document.getElementById('image-preview').style.display = 'none';
  document.getElementById('product-modal').style.display = 'flex';
}

function openEditModal(id) {
  const p = getProducts().find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-title').textContent       = 'Edit Produk';
  document.getElementById('edit-product-id').value         = p.id;
  document.getElementById('edit-product-name').value       = p.name;
  document.getElementById('edit-product-category').value   = p.category;
  document.getElementById('edit-product-price').value      = p.price;
  document.getElementById('edit-product-desc').value       = p.description;
  document.getElementById('edit-product-image').value      = p.image;
  document.getElementById('edit-product-badge').value      = p.badge || '';
  document.getElementById('edit-product-rating').value     = p.rating;
  document.getElementById('edit-product-sold').value       = p.sold;

  // Populate variants: array/json -> "label:harga" per baris
  let variantText = '';
  if (p.variants) {
    try {
      const arr = typeof p.variants === 'string' ? JSON.parse(p.variants) : p.variants;
      variantText = arr.map(v => `${v.label}:${v.price}`).join('\n');
    } catch {}
  }
  document.getElementById('edit-product-variants').value = variantText;

  previewImage('edit-product-image', 'image-preview');
  document.getElementById('product-modal').style.display   = 'flex';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

async function saveProduct(e) {
  e.preventDefault();
  const id          = document.getElementById('edit-product-id').value;
  const name        = document.getElementById('edit-product-name').value.trim();
  const category    = document.getElementById('edit-product-category').value;
  const price       = parseInt(document.getElementById('edit-product-price').value);
  const description = document.getElementById('edit-product-desc').value.trim();
  const image       = document.getElementById('edit-product-image').value.trim() || 'img/placeholder.png';
  const badge       = document.getElementById('edit-product-badge').value;
  const rating      = parseFloat(document.getElementById('edit-product-rating').value) || 4.5;
  const sold        = parseInt(document.getElementById('edit-product-sold').value) || 0;

  // Parse variants dari textarea "label:harga" per baris
  const variantRaw = document.getElementById('edit-product-variants').value.trim();
  let variants = null;
  if (variantRaw) {
    const parsed = variantRaw.split('\n')
      .map(line => line.trim())
      .filter(line => line.includes(':'))
      .map(line => {
        const idx   = line.lastIndexOf(':');
        const label = line.slice(0, idx).trim();
        const price = parseInt(line.slice(idx + 1).trim());
        return { label, price };
      })
      .filter(v => v.label && !isNaN(v.price));
    if (parsed.length) variants = JSON.stringify(parsed);
  }

  if (!name || !category || !price) { showToast('Nama, kategori, dan harga wajib diisi!', 'error'); return; }
  if (!db) { showToast('Supabase belum dikonfigurasi!', 'error'); return; }

  const payload = { name, category, price, description, image, badge, rating, sold, variants };

  let error;
  if (id) {
    ({ error } = await db.from('products').update(payload).eq('id', id));
  } else {
    const newId = 'usr_' + generateId();
    ({ error } = await db.from('products').insert({ id: newId, ...payload }));
  }

  if (error) { showToast('Gagal menyimpan: ' + error.message, 'error'); return; }

  showToast(`Produk "${name}" berhasil disimpan!`, 'success');
  await refreshData();
  closeModal();
  renderAdminPanel();
}

async function deleteProduct(id) {
  const p = getProducts().find(x => x.id === id);
  if (!confirm(`Hapus produk "${p?.name}"?`)) return;
  if (!db) { showToast('Supabase belum dikonfigurasi!', 'error'); return; }
  const { error } = await db.from('products').delete().eq('id', id);
  if (error) { showToast('Gagal hapus: ' + error.message, 'error'); return; }
  showToast('Produk dihapus!', 'success');
  await refreshData();
  renderAdminPanel();
}

async function toggleAvailable(id, currentlyAvailable) {
  const newVal = !currentlyAvailable;
  if (db) {
    const { error } = await db.from('products').update({ available: newVal }).eq('id', id);
    if (error) { showToast('Gagal update: ' + error.message, 'error'); return; }
  } else {
    // Fallback: update di _products (cache lokal)
    if (_products) {
      const p = _products.find(x => x.id === id);
      if (p) p.available = newVal;
    }
  }
  const label = newVal ? 'Tersedia' : 'Habis';
  showToast(`Produk ditandai: ${label}`, newVal ? 'success' : 'warning');
  await refreshData();
  renderAdminPanel();
}

// ===== CATEGORY CRUD =====
async function addCategory(e) {
  e.preventDefault();
  const name        = document.getElementById('cat-name').value.trim();
  const icon        = document.getElementById('cat-icon').value.trim() || '🛍️';
  const description = document.getElementById('cat-desc').value.trim();
  if (!name) { showToast('Nama kategori wajib!', 'error'); return; }

  const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  if (getCategories().find(c => c.id === id)) { showToast('Kategori sudah ada!', 'error'); return; }
  if (!db) { showToast('Supabase belum dikonfigurasi!', 'error'); return; }

  const { error } = await db.from('categories').insert({ id, name, icon, description });
  if (error) { showToast('Gagal tambah kategori: ' + error.message, 'error'); return; }

  showToast(`Kategori "${name}" ditambahkan!`, 'success');
  document.getElementById('cat-form').reset();
  await refreshData();
  renderAdminPanel();
}

async function deleteCategory(id) {
  const cat = getCategories().find(c => c.id === id);
  const inUse = getProducts().filter(p => p.category === id);
  if (inUse.length) { showToast(`Ada ${inUse.length} produk di kategori ini!`, 'error'); return; }
  if (!confirm(`Hapus kategori "${cat?.name}"?`)) return;
  const { error } = await db.from('categories').delete().eq('id', id);
  if (error) { showToast('Gagal hapus: ' + error.message, 'error'); return; }
  showToast('Kategori dihapus!', 'success');
  await refreshData();
  renderAdminPanel();
}

async function resetToDefault() {
  if (!confirm('Reset semua produk ke data default? Semua produk custom akan hilang!')) return;
  if (!db) { showToast('Supabase belum dikonfigurasi!', 'error'); return; }
  await db.from('products').delete().neq('id', '');
  await db.from('categories').delete().neq('id', '');
  await db.from('categories').insert(DEFAULT_CATEGORIES.map(c => ({ id: c.id, name: c.name, icon: c.icon, description: c.description || '' })));
  await db.from('products').insert(DEFAULT_PRODUCTS);
  showToast('Data direset ke default!', 'success');
  await refreshData();
  renderAdminPanel();
}

// ===== IMAGE PREVIEW =====
function previewImage(inputId, previewId) {
  const url     = document.getElementById(inputId)?.value?.trim();
  const preview = document.getElementById(previewId);
  if (!preview) return;
  if (!url) { preview.style.display = 'none'; return; }

  // Reset dulu
  preview.style.display = 'none';
  preview.src = '';

  const testImg = new Image();
  testImg.onload  = () => { preview.src = url; preview.style.display = 'block'; };
  testImg.onerror = () => { preview.style.display = 'none'; };
  testImg.src = url;
}

function filterAdminProducts() {
  const q = document.getElementById('admin-search').value.toLowerCase();
  document.querySelectorAll('.admin-product-card').forEach(card => {
    card.style.display = card.querySelector('.admin-product-name').textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();

  // Check session
  const isAuth = await checkAdminAuth();
  if (isAuth) {
    await refreshData();
    showAdminPanel();
  } else {
    showLoginScreen();
  }

  // Login
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const btn      = e.target.querySelector('button[type=submit]');
    btn.textContent = 'Masuk...';
    btn.disabled    = true;

    const ok = await adminLogin(email, password);
    if (ok) {
      await refreshData();
      showAdminPanel();
    } else {
      showToast('Email atau password salah!', 'error');
      btn.textContent = 'Masuk';
      btn.disabled    = false;
    }
  });

  document.getElementById('product-form').addEventListener('submit', saveProduct);
  document.getElementById('cat-form').addEventListener('submit', addCategory);
  document.getElementById('product-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('product-modal')) closeModal();
  });
});
