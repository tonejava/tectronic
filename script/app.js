// ============================================
// TECTRONY TECNOLOGIA — Home Page Scripts
// ============================================

// ===== PRODUTOS EM DESTAQUE (DADOS REAIS DO SITE) =====
const featuredProducts = [
  {
    id: 'v12in',
    name: 'V12in – Voltímetro Entrada Remote',
    price: 43.89,
    parcel: 4,
    parcelValue: 12.16,
    image: 'images/12370985.jpg',
    badge: 'Destaque'
  },
  {
    id: 'letreiro-wifi',
    name: 'Letreiro Digital Colorido WiFi com Controle Remoto',
    price: 394.90,
    parcel: 12,
    parcelValue: 40.02,
    image: 'images/1574168.jpg',
    badge: 'Mais Vendido'
  },
  {
    id: 't7d',
    name: 'T7D – Termostato Digital Estufa Geladeira',
    price: 130.90,
    parcel: 4,
    parcelValue: 36.36,
    image: 'images/12102947.jpg',
    badge: null
  },
  {
    id: 'relogio-sirene',
    name: 'Relógio Digital Sirene Cronômetro',
    price: 189.90,
    parcel: 6,
    parcelValue: 35.18,
    image: 'images/12186680.jpg',
    badge: 'Novo'
  },
  {
    id: 'painel-senha',
    name: 'Painel de Senha Dígitos Grandes 4" com Teclado',
    price: 249.90,
    parcel: 8,
    parcelValue: 34.71,
    image: 'images/12142416.jpg',
    badge: null
  },
  {
    id: 'monitor-energia',
    name: 'Monitor de Energia Elétrica Voltímetro AC',
    price: 86.90,
    parcel: 10,
    parcelValue: 10.31,
    image: 'https://cdn2.solojavirtual.com/loja/arquivos_loja/57857/Fotos/thumb_2__12153308.jpg',
    badge: null
  },
  {
    id: 'temporizador-chuveiro',
    name: 'Temporizador para Chuveiro Economize Energia',
    price: 89.90,
    parcel: 3,
    parcelValue: 33.29,
    image: 'https://cdn2.solojavirtual.com/loja/arquivos_loja/57857/Fotos/thumb_2__12204507.jpg',
    badge: 'Promoção'
  },
  {
    id: 'painel-senha-triplo',
    name: 'Painel de Senha Triplo (3 painéis) Sem Fio + Brinde',
    price: 966.90,
    parcel: 12,
    parcelValue: 98.09,
    image: 'https://cdn2.solojavirtual.com/loja/arquivos_loja/57857/Fotos/thumb_2__12102993.jpg',
    badge: null
  }
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('tectrony_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('tectrony_fav') || '[]');

// ===== UTILITIES =====
const fmtMoney = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');
const saveCart = () => localStorage.setItem('tectrony_cart', JSON.stringify(cart));
const saveFav = () => localStorage.setItem('tectrony_fav', JSON.stringify(favorites));

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = count;

  const itemsContainer = document.getElementById('miniCartItems');
  const totalEl = document.getElementById('miniCartTotal');

  if (!cart.length) {
    itemsContainer.innerHTML = '<p style="text-align:center;color:var(--cor-texto-suave);padding:20px 0;font-size:0.9rem;">Seu carrinho está vazio</p>';
    totalEl.textContent = fmtMoney(0);
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="mini-cart-item">
      <img src="${item.image}" class="mini-cart-img" alt="${item.name}" onerror="this.src='https://placehold.co/100x100/0A2463/FFFFFF?text=TEC&font=roboto'">
      <div class="mini-cart-info">
        <div class="mini-cart-name">${item.name}</div>
        <div class="mini-cart-qty">Qtd: ${item.qty}</div>
        <div class="mini-cart-price">${fmtMoney(item.price * item.qty)}</div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.textContent = fmtMoney(total);
}

function addToCart(p, quantity = 1) {
  const existing = cart.find(i => i.id === p.id);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ ...p, qty: quantity });
  }
  saveCart();
  updateCartUI();
  showToast(`${p.name} adicionado ao carrinho!`);
}

// ===== HERO SLIDER =====
function initSlider() {
  const track = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let current = 0;
  const total = slides.length;
  let autoplayInterval;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 33.333}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(next, 5000);
  }
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetAutoplay();
    }
  });
}

// ===== RENDER FEATURED PRODUCTS =====
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');

  grid.innerHTML = featuredProducts.map(p => {
    const isFav = favorites.includes(p.id);
    const badgeHtml = p.badge ? `<span class="card-badge">${p.badge}</span>` : '';
    return `
      <div class="product-card">
        <div class="card-img-wrap">
          ${badgeHtml}
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/400x400/0A2463/FFFFFF?text=${encodeURIComponent(p.name.split(' ')[0])}&font=roboto'">
          <button class="card-fav" data-id="${p.id}" aria-label="Favoritar"
            style="opacity:${isFav ? 1 : 0}; transform: scale(${isFav ? 1 : 0.8});">
            <svg viewBox="0 0 24 24" fill="${isFav ? '#ef4444' : 'none'}"
              stroke="${isFav ? '#ef4444' : 'currentColor'}"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="card-body">
          <div class="card-name">${p.name}</div>
          <div class="card-price">${fmtMoney(p.price)}</div>
          <div class="card-parcel">até ${p.parcel}x de ${fmtMoney(p.parcelValue)}</div>
          <button class="card-btn" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Adicionar
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Favorite buttons
  grid.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const svg = btn.querySelector('svg');
      if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        btn.style.opacity = '0';
      } else {
        favorites.push(id);
        svg.setAttribute('fill', '#ef4444');
        svg.setAttribute('stroke', '#ef4444');
        btn.style.opacity = '1';
      }
      saveFav();
    });
  });

  // Add to cart buttons
  grid.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = featuredProducts.find(x => x.id === btn.dataset.id);
      if (p) addToCart(p, 1);
    });
  });

  // Hover effects for fav
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const fav = card.querySelector('.card-fav');
      if (!favorites.includes(fav.dataset.id)) fav.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      const fav = card.querySelector('.card-fav');
      if (!favorites.includes(fav.dataset.id)) fav.style.opacity = '0';
    });
  });
}

// ===== MINI CART =====
function initMiniCart() {
  const cartBtn = document.getElementById('cartBtn');
  const miniCart = document.getElementById('miniCart');

  cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    miniCart.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!miniCart.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
      miniCart.classList.remove('open');
    }
  });
}

// ===== SEARCH =====
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const term = searchInput.value.trim();
      if (term) showToast(`Buscando por "${term}"... (simulação)`);
    }
  });
}

// ===== NEWSLETTER =====
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    showToast(`E-mail ${email} cadastrado com sucesso!`);
    form.reset();
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initMiniCart();
  initSearch();
  initNewsletter();
  renderFeatured();
  updateCartUI();
});
