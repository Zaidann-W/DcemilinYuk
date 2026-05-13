/* ===== DcemilinYuk - Cart Management ===== */

function getCart() {
  return getStorage(STORAGE.CART) || [];
}

function saveCart(cart) {
  setStorage(STORAGE.CART, cart);
  updateCartBadge();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.name} ditambahkan ke keranjang!`, 'success');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
  showToast('Produk dihapus dari keranjang.', 'info');
}

function updateCartQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function clearCart() {
  setStorage(STORAGE.CART, []);
  updateCartBadge();
}

// Render cart page
function renderCartPage() {
  const container = $('#cart-items-container');
  const summaryContainer = $('#cart-summary-container');
  const emptyState = $('#empty-cart');
  const cartSection = $('#cart-section');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartSection) cartSection.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (cartSection) cartSection.style.display = 'block';
  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
      </div>
      <div class="cart-quantity">
        <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Hapus">🗑️</button>
    </div>
  `).join('');

  if (summaryContainer) {
    const subtotal = getCartTotal();
    const shipping = subtotal > 50000 ? 0 : 5000;
    const total = subtotal + shipping;
    summaryContainer.innerHTML = `
      <h3>Ringkasan Belanja</h3>
      <div class="summary-row"><span>Subtotal (${cart.reduce((s, i) => s + i.qty, 0)} item)</span><span>${formatCurrency(subtotal)}</span></div>
      <div class="summary-row"><span>Ongkos Kirim</span><span>${shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</span></div>
      ${shipping === 0 ? '<div class="summary-row" style="color:var(--secondary);font-size:0.85rem;"><span>🎉 Gratis ongkir untuk belanja di atas Rp50.000!</span></div>' : ''}
      <div class="summary-row total"><span>Total</span><span>${formatCurrency(total)}</span></div>
      <a href="Checkout.html" class="btn btn-primary btn-block" style="margin-top:1rem;">Checkout</a>
    `;
  }
}

// Render checkout summary
function renderCheckoutSummary() {
  const container = $('#checkout-summary');
  if (!container) return;
  const cart = getCart();
  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  container.innerHTML = `
    <h3>Pesanan Kamu</h3>
    ${cart.map(item => `
      <div class="summary-row" style="margin-bottom:0.5rem;">
        <span>${item.name} × ${item.qty}</span>
        <span>${formatCurrency(item.price * item.qty)}</span>
      </div>
    `).join('')}
    <div class="summary-row" style="border-top:1px solid var(--border);padding-top:0.75rem;margin-top:0.75rem;">
      <span>Subtotal</span><span>${formatCurrency(subtotal)}</span>
    </div>
    <div class="summary-row"><span>Ongkir</span><span>${shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</span></div>
    <div class="summary-row total"><span>Total Bayar</span><span>${formatCurrency(total)}</span></div>
  `;
}
