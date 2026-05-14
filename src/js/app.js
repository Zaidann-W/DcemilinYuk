/* ===== DcemilinYuk - Main Application ===== */

// Config
const WA_NUMBER = '6282184445857';

// Storage Keys
const STORAGE = {
  THEME: 'dcemilin_theme',
  PRODUCTS: 'dcemilin_products',
  CATEGORIES: 'dcemilin_categories'
};

// Utility Functions
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function getStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';
  return page.toLowerCase();
}

// ===== WHATSAPP ORDER =====
function openWhatsApp(productName, price) {
  const formattedPrice = formatCurrency(price);
  const message = encodeURIComponent(
    `Halo DcemilinYuk! Saya ingin memesan:\n\n` +
    `*${productName}*\n` +
    `Harga: ${formattedPrice}\n\n` +
    `Mohon info ketersediaan dan pengirimannya. Terima kasih!`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

function openWhatsAppGeneral() {
  const message = encodeURIComponent(
    `Halo DcemilinYuk! Saya ingin mengetahui lebih lanjut tentang produk-produk kalian.`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem(STORAGE.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE.THEME, next);
  const sw = $('#theme-switch');
  if (sw) sw.classList.toggle('dark', next === 'dark');
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  let container = $('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'i'}</span>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== NAVBAR =====
function renderNavbar() {
  const container = $('#navbar-container');
  if (!container) return;
  const page = getCurrentPage();

  const navLink = (href, label, id) => {
    const isActive = page === id ? 'active' : '';
    return `<a href="${href}" class="${isActive}">${label}</a>`;
  };

  container.innerHTML = `
    <nav class="navbar" id="main-navbar">
      <div class="container">
        <a href="index.html" class="navbar-brand">
          <span>DcemilinYuk</span>
        </a>
        <div class="nav-links">
          ${navLink('index.html', 'Beranda', 'index')}
          ${navLink('Product.html', 'Produk', 'product')}
          ${navLink('About.html', 'Tentang', 'about')}
          ${navLink('Contact.html', 'Kontak', 'contact')}
        </div>
        <div class="nav-actions">
          <div class="theme-switch ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : ''}" id="theme-switch" onclick="toggleTheme()" title="Ganti Tema">
            <div class="theme-switch-thumb">
              <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            </div>
          </div>
          <button class="btn btn-wa btn-sm" onclick="openWhatsAppGeneral()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            <span class="btn-wa-text">Pesan WA</span>
          </button>
          <div class="mobile-toggle" onclick="toggleMobileMenu()">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="index.html">Beranda</a>
      <a href="Product.html">Produk</a>
      <a href="About.html">Tentang</a>
      <a href="Contact.html">Kontak</a>
      <a href="#" onclick="openWhatsAppGeneral();return false;" style="color:#25D366;font-weight:600;">Hubungi via WhatsApp</a>
    </div>
  `;
}

function toggleMobileMenu() {
  const menu = $('#mobile-menu');
  if (menu) menu.classList.toggle('active');
}

// ===== FOOTER =====
function renderFooter() {
  const container = $('#footer-container');
  if (!container) return;
  container.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">DcemilinYuk</div>
            <p class="footer-desc">Katalog cemilan dan minuman terbaik dari pedagang kecil lokal. Pesan langsung via WhatsApp, mudah dan cepat!</p>
            <button class="btn btn-wa" onclick="openWhatsAppGeneral()" style="margin-top:1rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Chat WhatsApp
            </button>
          </div>
          <div>
            <h4>Menu</h4>
            <div class="footer-links">
              <a href="index.html">Beranda</a>
              <a href="Product.html">Produk</a>
              <a href="About.html">Tentang</a>
              <a href="Contact.html">Kontak</a>
            </div>
          </div>
          <div>
            <h4>Kategori</h4>
            <div class="footer-links" id="footer-categories">
              <a href="Product.html?cat=esteh">Es Teh</a>
              <a href="Product.html?cat=popice">Pop Ice</a>
              <a href="Product.html?cat=icecream">Ice Cream</a>
              <a href="Product.html?cat=bolen">Bolen</a>
            </div>
          </div>
          <div>
            <h4>Kontak</h4>
            <div class="footer-links">
              <a href="https://wa.me/${WA_NUMBER}" target="_blank">WhatsApp Kami</a>
              <a href="Contact.html">Hubungi Kami</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 DcemilinYuk. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  `;
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderNavbar();
  renderFooter();
  initScrollReveal();
});
