/* ===== DcemilinYuk - Products Data & Logic ===== */

const DEFAULT_PRODUCTS = [
  { id: 'et1', name: 'Es Teh Manis',        category: 'esteh',    price: 5000,  image: 'img/esteh.png',    description: 'Es teh manis klasik yang menyegarkan, dibuat dari teh pilihan.', rating: 4.8, sold: 1250, badge: 'Populer' },
  { id: 'et2', name: 'Es Teh Tarik',        category: 'esteh',    price: 8000,  image: 'img/esteh.png',    description: 'Es teh tarik dengan susu kental manis, creamy dan nikmat.', rating: 4.7, sold: 980,  badge: '' },
  { id: 'et3', name: 'Es Teh Lemon',        category: 'esteh',    price: 7000,  image: 'img/esteh.png',    description: 'Perpaduan teh segar dengan perasan lemon asli.', rating: 4.6, sold: 756,  badge: 'Baru' },
  { id: 'et4', name: 'Es Teh Susu',         category: 'esteh',    price: 8000,  image: 'img/esteh.png',    description: 'Es teh premium dengan campuran susu segar.', rating: 4.9, sold: 1100, badge: '' },
  { id: 'pi1', name: 'Pop Ice Mangga',      category: 'popice',   price: 5000,  image: 'img/popice.png',   description: 'Pop Ice rasa mangga yang manis dan menyegarkan.', rating: 4.5, sold: 890,  badge: '' },
  { id: 'pi2', name: 'Pop Ice Anggur',      category: 'popice',   price: 5000,  image: 'img/popice.png',   description: 'Pop Ice rasa anggur favorit semua kalangan.', rating: 4.4, sold: 720,  badge: '' },
  { id: 'pi3', name: 'Pop Ice Strawberry',  category: 'popice',   price: 6000,  image: 'img/popice.png',   description: 'Pop Ice strawberry dengan rasa buah segar.', rating: 4.6, sold: 650,  badge: 'Populer' },
  { id: 'pi4', name: 'Pop Ice Coklat',      category: 'popice',   price: 6000,  image: 'img/popice.png',   description: 'Pop Ice coklat yang creamy dan lezat.', rating: 4.3, sold: 580,  badge: '' },
  {
    id: 'ic1', name: 'Es cemil', category: 'icecream', price: 5000,
    image: 'img/escemil.jpeg',
    description: 'Es cemil lezat dengan aneka topping — tersedia porsi 5k dan 10k.',
    rating: 4.9, sold: 1500, badge: 'Best Seller',
    variants: [
      { name: 'Porsi Kecil', price: 5000,  label: '5k'  },
      { name: 'Porsi Besar', price: 10000, label: '10k' }
    ]
  },
  { id: 'ic2', name: 'Es cemil Coklat',    category: 'icecream', price: 10000, image: 'img/escemil.jpeg', description: 'Es cemil dengan topping coklat Belgian yang kaya rasa.', rating: 4.7, sold: 1320, badge: '' },
  { id: 'ic3', name: 'Es cemil Strawberry',category: 'icecream', price: 10000, image: 'img/escemil.jpeg', description: 'Es cemil dengan topping strawberry segar.', rating: 4.9, sold: 980,  badge: 'Baru' },
  { id: 'bl1', name: 'Bolen Pisang',        category: 'bolen',    price: 5000,  image: 'img/bolen.png',    description: 'Bolen pisang renyah dengan isian pisang manis.', rating: 4.7, sold: 2100, badge: 'Best Seller' },
  { id: 'bl2', name: 'Bolen Keju',          category: 'bolen',    price: 7000,  image: 'img/bolen.png',    description: 'Bolen keju dengan lelehan keju yang gurih.', rating: 4.6, sold: 1800, badge: '' },
  { id: 'bl3', name: 'Bolen Coklat',        category: 'bolen',    price: 7000,  image: 'img/bolen.png',    description: 'Bolen dengan isian coklat leleh yang nikmat.', rating: 4.8, sold: 1650, badge: 'Populer' },
  { id: 'bl4', name: 'Bolen Pisang Coklat', category: 'bolen',    price: 8000,  image: 'img/bolen.png',    description: 'Kombinasi pisang dan coklat dalam pastry renyah.', rating: 4.9, sold: 1400, badge: '' },
  // ── MAKANAN BERAT ──
  { id: 'mb1', name: 'Nasi Ayam Bakar',      category: 'makberat', price: 15000, image: 'img/nasiayam1.jpeg', description: 'Nasi ayam bakar hemat, gurih dan lezat dengan sambal spesial.',    rating: 4.8, sold: 320, badge: 'Populer' },
  { id: 'mb2', name: 'Nasi Kotak Ayam Bakar',category: 'makberat', price: 20000, image: 'img/nasiayam2.jpeg', description: 'Nasi kotak ayam bakar lengkap dengan lauk dan sayur.',                 rating: 4.7, sold: 210, badge: '' },
  { id: 'mb3', name: 'Burger Sapi/Ayam',     category: 'makberat', price: 15000, image: 'img/burger.jpeg',   description: 'Burger juicy pilihan daging sapi atau ayam, saus spesial.',        rating: 4.6, sold: 185, badge: '' },
  { id: 'mb4', name: 'Kebab Sapi',           category: 'makberat', price: 12000, image: 'img/kebab.jpeg',    description: 'Kebab sapi dengan sayuran segar dan saus mayonaise pedas.',       rating: 4.5, sold: 160, badge: '' },
  { id: 'mb5', name: 'Mie Geprek Katsu',     category: 'makberat', price: 15000, image: 'img/miegeprek.jpeg', description: 'Mie geprek dengan katsu ayam crispy dan sambal geprek pedas.',    rating: 4.7, sold: 140, badge: 'Baru' },
  { id: 'mb6', name: 'Seblak Rafael',        category: 'makberat', price: 12000, image: 'img/seblak.jpeg',   description: 'Seblak khas Rafael, pedas gurih dengan aneka topping.',            rating: 4.6, sold: 130, badge: '' },
  { id: 'mb7', name: 'Martabak Kulit Lumpia',category: 'makberat', price: 10000, image: 'img/martabak.jpeg', description: 'Martabak telur renyah dengan kulit lumpia tipis, gurih nikmat.',   rating: 4.8, sold: 200, badge: 'Populer' }
];

const DEFAULT_CATEGORIES = [
  { id: 'esteh',    name: 'Es Teh',        icon: 'fa-solid fa-mug-hot',    description: 'Segar & Nikmat' },
  { id: 'popice',   name: 'Pop Ice',       icon: 'fa-solid fa-snowflake',   description: 'Dingin & Manis' },
  { id: 'icecream', name: 'Ice Cream',     icon: 'fa-solid fa-ice-cream',   description: 'Premium & Lezat' },
  { id: 'bolen',    name: 'Bolen',         icon: 'fa-solid fa-bread-slice', description: 'Renyah & Gurih' },
  { id: 'makberat', name: 'Makanan Berat', icon: 'fa-solid fa-utensils',    description: 'Mengenyangkan' }
];

// Gunakan cache dari supabase.js (_products, _categories)
// Fallback ke DEFAULT jika belum init
function getProducts()   { return _products   || DEFAULT_PRODUCTS; }
function getCategories() { return _categories || DEFAULT_CATEGORIES; }

// ===== VARIANT & QTY HELPERS =====
function changeVariant(btn, price, label) {
  const card = btn.closest('.product-card');
  card.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  card.dataset.currentPrice = price;
  card.dataset.currentVariant = label;
  const priceEl = card.querySelector('.card-price');
  if (priceEl) priceEl.textContent = formatCurrency(price);
}

function changeQty(btn, delta) {
  const card = btn.closest('.product-card');
  const qtyEl = card.querySelector('.qty-value');
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 1) qty = 1;
  if (qty > 99) qty = 99;
  qtyEl.textContent = qty;
}

function orderProductCard(btn) {
  const card  = btn.closest('.product-card');
  const id    = card.dataset.id;
  const prods = getProducts();
  const prod  = prods.find(p => p.id === id);
  if (!prod) return;

  const price   = parseInt(card.dataset.currentPrice  || prod.price);
  const variant = card.dataset.currentVariant || '';
  const qty     = parseInt(card.querySelector('.qty-value')?.textContent || '1');
  const total   = price * qty;

  const variantText = variant ? ` (${variant})` : '';
  const message = encodeURIComponent(
    `Halo DcemilinYuk! Saya mau pesan:\n\n` +
    `*${prod.name}${variantText}*\n` +
    `Harga satuan: ${formatCurrency(price)}\n` +
    `Jumlah: ${qty} porsi\n` +
    `Total: *${formatCurrency(total)}*\n\n` +
    `Mohon konfirmasi ketersediaan ya! Terima kasih 🙏`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

// ===== RENDER =====
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function renderProductCard(product) {
  const cats    = getCategories();
  const catName = cats.find(c => c.id === product.category)?.name || product.category;
  const badgeClass = product.badge === 'Best Seller' ? 'sale' : product.badge === 'Baru' ? 'new' : '';

  // Parse variants (bisa string JSON dari Supabase atau array dari DEFAULT)
  let variants = null;
  if (product.variants) {
    variants = typeof product.variants === 'string'
      ? (() => { try { return JSON.parse(product.variants); } catch { return null; } })()
      : product.variants;
  }

  const defaultPrice   = variants ? variants[0].price : product.price;
  const defaultVariant = variants ? variants[0].label : '';

  const waIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

  const variantHtml = variants ? `
    <div class="variant-selector">
      <span class="variant-label">Pilih Porsi:</span>
      <div class="variant-pills">
        ${variants.map((v, i) => `
          <button class="variant-pill ${i === 0 ? 'active' : ''}"
            onclick="changeVariant(this, ${v.price}, '${v.label}')"
            title="${v.name}">${v.label}</button>`).join('')}
      </div>
    </div>` : '';

  return `
    <div class="card product-card reveal" data-id="${product.id}" data-current-price="${defaultPrice}" data-current-variant="${defaultVariant}">
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
        ${variantHtml}
        <div class="card-footer" style="border:none;padding:0;margin-top:0.75rem;">
          <div class="card-bottom-row">
            <span class="card-price">${formatCurrency(defaultPrice)}</span>
            <div class="qty-selector">
              <button class="qty-btn" onclick="changeQty(this, -1)">−</button>
              <span class="qty-value">1</span>
              <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
            </div>
          </div>
          <button class="btn-wa-sm btn-order-full" onclick="orderProductCard(this)">${waIcon} Pesan via WA</button>
        </div>
      </div>
    </div>`;
}

function filterProducts(category = 'all', search = '', sort = 'popular') {
  let list = [...getProducts()];
  if (category !== 'all') list = list.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  switch (sort) {
    case 'price-low':  list.sort((a, b) => a.price - b.price); break;
    case 'price-high': list.sort((a, b) => b.price - a.price); break;
    case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    default:           list.sort((a, b) => b.sold - a.sold);
  }
  return list;
}

function renderProducts(container, products) {
  const el = typeof container === 'string' ? $(container) : container;
  if (!el) return;
  if (!products.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Produk tidak ditemukan</h3><p>Coba kata kunci lain.</p></div>`;
    return;
  }
  el.innerHTML = products.map(renderProductCard).join('');
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

function renderCategories(containerId) {
  const el = $(containerId);
  if (!el) return;
  el.innerHTML = getCategories().map(cat => {
    // Kalau icon dimulai 'fa-' → render Font Awesome <i>, kalau tidak → emoji biasa
    const iconHtml = cat.icon && cat.icon.startsWith('fa-')
      ? `<i class="${cat.icon}"></i>`
      : cat.icon;
    return `
      <div class="category-card reveal" onclick="window.location.href='Product.html?cat=${cat.id}'">
        <div class="category-icon">${iconHtml}</div>
        <h4>${cat.name}</h4>
        <p>${cat.description || ''}</p>
      </div>`;
  }).join('');
}
