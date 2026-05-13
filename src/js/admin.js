/* ===== DcemilinYuk - Admin Panel Logic ===== */

const ADMIN_PASSWORD = 'dcemilin2026';

// ===== AUTH =====
function checkAdminAuth() {
  return sessionStorage.getItem('dcemilin_admin') === 'true';
}

function adminLogin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('dcemilin_admin', 'true');
    return true;
  }
  return false;
}

function adminLogout() {
  sessionStorage.removeItem('dcemilin_admin');
  showLoginScreen();
}

// ===== DATA =====
function getAdminProducts() {
  const saved = getStorage(STORAGE.PRODUCTS);
  return (saved && saved.length > 0) ? saved : [...DEFAULT_PRODUCTS];
}

function getAdminCategories() {
  const saved = getStorage(STORAGE.CATEGORIES);
  return (saved && saved.length > 0) ? saved : [...DEFAULT_CATEGORIES];
}

function saveProducts(products) {
  setStorage(STORAGE.PRODUCTS, products);
}

function saveCategories(categories) {
  setStorage(STORAGE.CATEGORIES, categories);
}

function resetToDefault() {
  if (!confirm('Reset semua produk ke data awal? Produk yang sudah ditambahkan akan hilang.')) return;
  localStorage.removeItem(STORAGE.PRODUCTS);
  localStorage.removeItem(STORAGE.CATEGORIES);
  showToast('Data direset ke default!', 'success');
  renderAdminPanel();
}

// ===== SCREENS =====
function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
}

function showAdminPanel() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
  renderAdminPanel();
}

// ===== RENDER ADMIN =====
function renderAdminPanel() {
  renderAdminProducts();
  renderAdminCategories();
  updateStats();
}

function updateStats() {
  const products = getAdminProducts();
  const categories = getAdminCategories();
  document.getElementById('stat-products').textContent = products.length;
  document.getElementById('stat-categories').textContent = categories.length;
}

function renderAdminProducts() {
  const products = getAdminProducts();
  const cats = getAdminCategories();
  const grid = document.getElementById('admin-products-grid');

  if (products.length === 0) {
    grid.innerHTML = `<div class="admin-empty">Belum ada produk. Tambahkan produk pertama!</div>`;
    return;
  }

  grid.innerHTML = products.map((p, idx) => {
    const catName = cats.find(c => c.id === p.category)?.name || p.category;
    return `
      <div class="admin-product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="admin-product-img" onerror="this.src='img/placeholder.png'">
        <div class="admin-product-info">
          <div class="admin-product-top">
            <div>
              <span class="admin-cat-tag">${catName}</span>
              ${p.badge ? `<span class="admin-badge-tag">${p.badge}</span>` : ''}
            </div>
            <div class="admin-product-actions">
              <button class="admin-btn admin-btn-edit" onclick="openEditModal(${idx})" title="Edit">Edit</button>
              <button class="admin-btn admin-btn-delete" onclick="deleteProduct('${p.id}')" title="Hapus">Hapus</button>
            </div>
          </div>
          <h4 class="admin-product-name">${p.name}</h4>
          <p class="admin-product-desc">${p.description}</p>
          <div class="admin-product-price">${formatCurrency(p.price)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAdminCategories() {
  const categories = getAdminCategories();
  const list = document.getElementById('admin-categories-list');
  list.innerHTML = categories.map((cat, idx) => `
    <div class="admin-cat-item">
      <span class="cat-icon">${cat.icon}</span>
      <div class="cat-details">
        <strong>${cat.name}</strong>
        <span class="cat-id">ID: ${cat.id}</span>
      </div>
      <button class="admin-btn admin-btn-delete" onclick="deleteCategory('${cat.id}')">Hapus</button>
    </div>
  `).join('');

  // Update category dropdown in product form
  const selects = ['product-category', 'edit-product-category'];
  selects.forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    if (current) sel.value = current;
  });
}

// ===== PRODUCT CRUD =====
function openAddModal() {
  document.getElementById('modal-title').textContent = 'Tambah Produk Baru';
  document.getElementById('product-form').reset();
  document.getElementById('edit-product-id').value = '';
  document.getElementById('image-preview').style.display = 'none';
  document.getElementById('product-modal').style.display = 'flex';
}

function openEditModal(idx) {
  const products = getAdminProducts();
  const p = products[idx];
  if (!p) return;

  document.getElementById('modal-title').textContent = 'Edit Produk';
  document.getElementById('edit-product-id').value = p.id;
  document.getElementById('edit-product-name').value = p.name;
  document.getElementById('edit-product-category').value = p.category;
  document.getElementById('edit-product-price').value = p.price;
  document.getElementById('edit-product-desc').value = p.description;
  document.getElementById('edit-product-image').value = p.image;
  document.getElementById('edit-product-badge').value = p.badge || '';
  document.getElementById('edit-product-rating').value = p.rating;
  document.getElementById('edit-product-sold').value = p.sold;

  previewImage('edit-product-image', 'image-preview');
  document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('edit-product-id').value;
  const name = document.getElementById('edit-product-name').value.trim();
  const category = document.getElementById('edit-product-category').value;
  const price = parseInt(document.getElementById('edit-product-price').value);
  const description = document.getElementById('edit-product-desc').value.trim();
  const image = document.getElementById('edit-product-image').value.trim();
  const badge = document.getElementById('edit-product-badge').value;
  const rating = parseFloat(document.getElementById('edit-product-rating').value) || 4.5;
  const sold = parseInt(document.getElementById('edit-product-sold').value) || 0;

  if (!name || !category || !price) {
    showToast('Nama, kategori, dan harga wajib diisi!', 'error');
    return;
  }

  const products = getAdminProducts();

  if (id) {
    // Edit existing
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], name, category, price, description, image, badge, rating, sold };
      showToast(`Produk "${name}" berhasil diupdate!`, 'success');
    }
  } else {
    // Add new
    const newProduct = {
      id: 'usr_' + generateId(),
      name, category, price, description,
      image: image || 'img/placeholder.png',
      badge, rating, sold
    };
    products.push(newProduct);
    showToast(`Produk "${name}" berhasil ditambahkan!`, 'success');
  }

  saveProducts(products);
  closeModal();
  renderAdminPanel();
}

function deleteProduct(id) {
  const products = getAdminProducts();
  const p = products.find(x => x.id === id);
  if (!confirm(`Hapus produk "${p?.name}"?`)) return;
  const updated = products.filter(x => x.id !== id);
  saveProducts(updated);
  showToast('Produk dihapus!', 'success');
  renderAdminPanel();
}

// ===== CATEGORY CRUD =====
function addCategory(e) {
  e.preventDefault();
  const name = document.getElementById('cat-name').value.trim();
  const icon = document.getElementById('cat-icon').value.trim() || '🛍️';
  const desc = document.getElementById('cat-desc').value.trim() || '';

  if (!name) { showToast('Nama kategori wajib diisi!', 'error'); return; }

  const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  const categories = getAdminCategories();

  if (categories.find(c => c.id === id)) {
    showToast('Kategori dengan nama ini sudah ada!', 'error');
    return;
  }

  categories.push({ id, name, icon, desc });
  saveCategories(categories);
  document.getElementById('cat-form').reset();
  showToast(`Kategori "${name}" ditambahkan!`, 'success');
  renderAdminPanel();
}

function deleteCategory(id) {
  const cats = getAdminCategories();
  const cat = cats.find(c => c.id === id);
  const products = getAdminProducts();
  const inUse = products.filter(p => p.category === id);

  if (inUse.length > 0) {
    showToast(`Tidak bisa hapus! Ada ${inUse.length} produk dalam kategori ini.`, 'error');
    return;
  }

  if (!confirm(`Hapus kategori "${cat?.name}"?`)) return;
  saveCategories(cats.filter(c => c.id !== id));
  showToast('Kategori dihapus!', 'success');
  renderAdminPanel();
}

// ===== IMAGE PREVIEW =====
function previewImage(inputId, previewId) {
  const url = document.getElementById(inputId)?.value?.trim();
  const preview = document.getElementById(previewId);
  if (!preview) return;
  if (url) {
    preview.src = url;
    preview.style.display = 'block';
    preview.onerror = () => { preview.style.display = 'none'; };
  } else {
    preview.style.display = 'none';
  }
}

// ===== SEARCH FILTER =====
function filterAdminProducts() {
  const q = document.getElementById('admin-search').value.toLowerCase();
  document.querySelectorAll('.admin-product-card').forEach(card => {
    const name = card.querySelector('.admin-product-name').textContent.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  if (checkAdminAuth()) {
    showAdminPanel();
  } else {
    showLoginScreen();
  }

  // Login form
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('admin-password').value;
    if (adminLogin(pw)) {
      showAdminPanel();
    } else {
      showToast('Password salah!', 'error');
      document.getElementById('admin-password').value = '';
      document.getElementById('admin-password').focus();
    }
  });

  // Product form
  document.getElementById('product-form').addEventListener('submit', saveProduct);

  // Category form
  document.getElementById('cat-form').addEventListener('submit', addCategory);

  // Close modal on overlay click
  document.getElementById('product-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('product-modal')) closeModal();
  });
});
