/* ===== DcemilinYuk - Products Data & Logic ===== */

const DEFAULT_PRODUCTS = [
  // Es Teh
  { id: 'et1', name: 'Es Teh Manis', category: 'esteh', price: 5000, image: 'img/esteh.png', description: 'Es teh manis klasik yang menyegarkan, dibuat dari teh pilihan.', rating: 4.8, sold: 1250, badge: 'Populer' },
  { id: 'et2', name: 'Es Teh Tarik', category: 'esteh', price: 8000, image: 'img/esteh.png', description: 'Es teh tarik dengan susu kental manis, creamy dan nikmat.', rating: 4.7, sold: 980, badge: '' },
  { id: 'et3', name: 'Es Teh Lemon', category: 'esteh', price: 7000, image: 'img/esteh.png', description: 'Perpaduan teh segar dengan perasan lemon asli.', rating: 4.6, sold: 756, badge: 'Baru' },
  { id: 'et4', name: 'Es Teh Susu', category: 'esteh', price: 8000, image: 'img/esteh.png', description: 'Es teh premium dengan campuran susu segar.', rating: 4.9, sold: 1100, badge: '' },

  // Pop Ice
  { id: 'pi1', name: 'Pop Ice Mangga', category: 'popice', price: 5000, image: 'img/popice.png', description: 'Pop Ice rasa mangga yang manis dan menyegarkan.', rating: 4.5, sold: 890, badge: '' },
  { id: 'pi2', name: 'Pop Ice Anggur', category: 'popice', price: 5000, image: 'img/popice.png', description: 'Pop Ice rasa anggur favorit semua kalangan.', rating: 4.4, sold: 720, badge: '' },
  { id: 'pi3', name: 'Pop Ice Strawberry', category: 'popice', price: 6000, image: 'img/popice.png', description: 'Pop Ice strawberry dengan rasa buah segar.', rating: 4.6, sold: 650, badge: 'Populer' },
  { id: 'pi4', name: 'Pop Ice Coklat', category: 'popice', price: 6000, image: 'img/popice.png', description: 'Pop Ice coklat yang creamy dan lezat.', rating: 4.3, sold: 580, badge: '' },

  // Ice Cream
  { id: 'ic1', name: 'Ice Cream Vanilla', category: 'icecream', price: 10000, image: 'img/icecream.png', description: 'Ice cream vanilla premium dengan biji vanilla asli.', rating: 4.8, sold: 1500, badge: 'Best Seller' },
  { id: 'ic2', name: 'Ice Cream Coklat', category: 'icecream', price: 10000, image: 'img/icecream.png', description: 'Ice cream coklat Belgian yang kaya rasa.', rating: 4.7, sold: 1320, badge: '' },
  { id: 'ic3', name: 'Ice Cream Strawberry', category: 'icecream', price: 12000, image: 'img/icecream.png', description: 'Ice cream strawberry dengan potongan buah asli.', rating: 4.9, sold: 980, badge: 'Baru' },
  { id: 'ic4', name: 'Ice Cream Matcha', category: 'icecream', price: 15000, image: 'img/icecream.png', description: 'Ice cream matcha Jepang premium grade A.', rating: 4.8, sold: 870, badge: '' },

  // Bolen
  { id: 'bl1', name: 'Bolen Pisang', category: 'bolen', price: 5000, image: 'img/bolen.png', description: 'Bolen pisang renyah dengan isian pisang manis.', rating: 4.7, sold: 2100, badge: 'Best Seller' },
  { id: 'bl2', name: 'Bolen Keju', category: 'bolen', price: 7000, image: 'img/bolen.png', description: 'Bolen keju dengan lelehan keju yang gurih.', rating: 4.6, sold: 1800, badge: '' },
  { id: 'bl3', name: 'Bolen Coklat', category: 'bolen', price: 7000, image: 'img/bolen.png', description: 'Bolen dengan isian coklat leleh yang nikmat.', rating: 4.8, sold: 1650, badge: 'Populer' },
  { id: 'bl4', name: 'Bolen Pisang Coklat', category: 'bolen', price: 8000, image: 'img/bolen.png', description: 'Kombinasi pisang dan coklat dalam pastry renyah.', rating: 4.9, sold: 1400, badge: '' }
];

const DEFAULT_CATEGORIES = [
  { id: 'esteh',    name: 'Es Teh',     icon: '🍵', desc: 'Segar & Nikmat' },
  { id: 'popice',   name: 'Pop Ice',    icon: '🧊', desc: 'Dingin & Manis' },
  { id: 'icecream', name: 'Ice Cream',  icon: '🍦', desc: 'Premium & Lezat' },
  { id: 'bolen',    name: 'Bolen',      icon: '🥐', desc: 'Renyah & Gurih' }
];

// ===== DATA ACCESS =====
// Baca dari localStorage jika ada, fallback ke default
function getProducts() {
  const saved = getStorage(STORAGE.PRODUCTS);
  return (saved && saved.length > 0) ? saved : DEFAULT_PRODUCTS;
}

function getCategories() {
  const saved = getStorage(STORAGE.CATEGORIES);
  return (saved && saved.length > 0) ? saved : DEFAULT_CATEGORIES;
}

// ===== RENDER =====
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function renderProductCard(product) {
  const cats = getCategories();
  const catName = cats.find(c => c.id === product.category)?.name || product.category;
  const badgeClass = product.badge === 'Best Seller' ? 'sale' : product.badge === 'Baru' ? 'new' : '';

  return `
    <div class="card product-card reveal" data-id="${product.id}">
      ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.src='img/placeholder.png'">
      <div class="card-body">
        <div class="product-category">${catName}</div>
        <h4 class="card-title">${product.name}</h4>
        <p class="card-text">${product.description}</p>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="count">(${product.sold} terjual)</span>
        </div>
        <div class="card-footer" style="border:none;padding:0;margin-top:0.75rem;">
          <span class="card-price">${formatCurrency(product.price)}</span>
          <button class="btn-wa-sm" onclick="openWhatsApp('${product.name.replace(/'/g, "\\'")}', ${product.price})" title="Pesan via WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Pesan
          </button>
        </div>
      </div>
    </div>
  `;
}

function filterProducts(category = 'all', search = '', sort = 'popular') {
  let filtered = [...getProducts()];
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  switch (sort) {
    case 'price-low':  filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'name':       filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating':     filtered.sort((a, b) => b.rating - a.rating); break;
    default:           filtered.sort((a, b) => b.sold - a.sold);
  }
  return filtered;
}

function renderProducts(container, products) {
  const el = typeof container === 'string' ? $(container) : container;
  if (!el) return;
  if (products.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Produk tidak ditemukan</h3><p>Coba kata kunci lain atau ubah filter.</p></div>`;
    return;
  }
  el.innerHTML = products.map(renderProductCard).join('');
  // Re-observe new cards for scroll reveal
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

function renderCategories(containerId) {
  const el = $(containerId);
  if (!el) return;
  el.innerHTML = getCategories().map(cat => `
    <div class="category-card reveal" onclick="window.location.href='Product.html?cat=${cat.id}'">
      <div class="category-icon">${cat.icon}</div>
      <h4>${cat.name}</h4>
      <p>${cat.desc}</p>
    </div>
  `).join('');
}
