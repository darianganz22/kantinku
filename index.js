/* =========================================================
   KantinKu — index.js
   Fitur: drawer keranjang + tambah/kurangi/hapus + promo
   ========================================================= */

let selectedCategory = "Semua";
let selectedSort = "popular";
let detailProductId = null;
let detailQty = 1;
let appliedPromo = false;

const productGrid = document.querySelector("#productGrid");
const emptyState = document.querySelector("#emptyState");
const cartDrawer = document.querySelector("#cartDrawer");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cartItems");
const cartTotalEl = document.querySelector("#cartTotal");
const cartCountEl = document.querySelector("#cartCount");
const promoInput = document.querySelector(".promo-input input");
const promoButton = document.querySelector(".promo-input button");

function formatMoney(value) {
  return "Rp " + Number(value || 0).toLocaleString("id-ID");
}

function openCart() {
  renderCart();
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

function getProduct(id) {
  return PRODUCTS.find(product => Number(product.id) === Number(id));
}

function normalizeCart() {
  const cart = getCart()
    .filter(item => getProduct(item.id))
    .map(item => ({
      id: Number(item.id),
      qty: Math.max(1, Number(item.qty) || 1)
    }));

  saveCart(cart);
  return cart;
}

function getSubtotal() {
  return normalizeCart().reduce((total, item) => {
    const product = getProduct(item.id);
    return total + product.price * item.qty;
  }, 0);
}

function getDiscount() {
  return appliedPromo && getSubtotal() >= 20000 ? 3000 : 0;
}

function updateCartUI() {
  const cart = normalizeCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const finalTotal = Math.max(0, subtotal - discount);

  if (cartCountEl) cartCountEl.textContent = count;
  if (cartTotalEl) cartTotalEl.textContent = formatMoney(finalTotal);

  const summaryLabel = document.querySelector(".summary span");
  if (summaryLabel) {
    summaryLabel.textContent = discount
      ? `Subtotal · Hemat ${formatMoney(discount)}`
      : "Subtotal";
  }

  if (promoInput) {
    promoInput.value = appliedPromo ? "HEMAT3" : "";
  }

  return { cart, subtotal, discount, finalTotal };
}

function renderCart() {
  const { cart, subtotal, discount, finalTotal } = updateCartUI();

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Keranjang masih kosong</h3>
        <p>Pilih makanan atau minuman favoritmu dari menu.</p>
        <button type="button" onclick="closeCart(); document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
          Lihat Menu
        </button>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    const itemTotal = product.price * item.qty;

    return `
      <article class="cart-item" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <b>${product.name}</b>
          <small>${formatMoney(product.price)} / item</small>
          <div class="item-actions">
            <button type="button" data-action="decrease" aria-label="Kurangi ${product.name}">−</button>
            <strong>${item.qty}</strong>
            <button type="button" data-action="increase" aria-label="Tambah ${product.name}">+</button>
            <button type="button" class="remove-item" data-action="remove" aria-label="Hapus ${product.name}" title="Hapus item">🗑</button>
          </div>
        </div>
        <div class="price">${formatMoney(itemTotal)}</div>
      </article>
    `;
  }).join("");

  if (discount) {
    cartItems.insertAdjacentHTML("beforeend", `
      <div class="cart-discount">
        <span>🎟️ Promo HEMAT3</span>
        <b>− ${formatMoney(discount)}</b>
      </div>
    `);
  }
}

function changeCartQuantity(id, amount) {
  const cart = normalizeCart();
  const item = cart.find(item => Number(item.id) === Number(id));

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    saveCart(cart.filter(entry => Number(entry.id) !== Number(id)));
    showToast("Item dihapus dari keranjang");
  } else {
    saveCart(cart);
    showToast(amount > 0 ? "Jumlah item ditambah" : "Jumlah item dikurangi");
  }

  renderCart();
}

function removeCartItem(id) {
  const product = getProduct(id);
  saveCart(normalizeCart().filter(item => Number(item.id) !== Number(id)));
  renderCart();
  showToast(`${product?.name || "Item"} dihapus dari keranjang`);
}

function addToCart(id, qty = 1, openDrawer = false) {
  const product = getProduct(id);
  if (!product) return;

  const cart = normalizeCart();
  const item = cart.find(item => Number(item.id) === Number(id));

  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id: Number(id), qty: Math.max(1, qty) });
  }

  saveCart(cart);
  renderCart();
  showToast(`${product.name} masuk ke keranjang`);

  if (openDrawer) openCart();
}

function renderProducts() {
  const searchTerm = (document.querySelector("#searchInput")?.value || "").trim().toLowerCase();

  let list = PRODUCTS.filter(product => {
    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;

    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (selectedSort === "cheap") {
    list.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "rating") {
    list.sort((a, b) => b.rating - a.rating || b.sold - a.sold);
  } else {
    list.sort((a, b) => b.sold - a.sold);
  }

  emptyState.hidden = list.length !== 0;

  productGrid.innerHTML = list.map(product => `
    <article class="product" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.sold >= 45 ? '<span class="tag">BEST SELLER</span>' : product.rating >= 4.9 ? '<span class="tag">FAVORIT</span>' : ''}
        <button type="button" class="quick-add" data-add="${product.id}" aria-label="Tambah ${product.name}">+</button>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.category} · ${product.sold} terjual</p>
        <div class="product-foot">
          <span class="price">${formatMoney(product.price)}</span>
          <span class="rating">★ ${product.rating} <small>(${Math.max(12, product.sold * 2)})</small></span>
        </div>
      </div>
    </article>
  `).join("");
}

function openDetail(id) {
  const product = getProduct(id);
  if (!product) return;

  detailProductId = Number(id);
  detailQty = 1;

  document.querySelector("#detailImage").src = product.image;
  document.querySelector("#detailImage").alt = product.name;
  document.querySelector("#detailCategory").textContent = product.category.toUpperCase();
  document.querySelector("#detailName").textContent = product.name;
  document.querySelector("#detailRating").textContent = `★ ${product.rating}`;
  document.querySelector("#detailSold").textContent = `${product.sold} terjual`;
  document.querySelector("#detailDescription").textContent =
    "Menu favorit siswa dengan porsi pas, rasa familiar, dan harga bersahabat untuk kantong pelajar.";
  document.querySelector("#detailPrice").textContent = formatMoney(product.price);
  document.querySelector("#detailQty").textContent = detailQty;
  document.querySelector("#detailAdd span").textContent = formatMoney(product.price);

  document.querySelector("#detailModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  document.querySelector("#detailModal").classList.remove("show");
  document.body.style.overflow = "";
}

function renderDetailTotal() {
  const product = getProduct(detailProductId);
  if (!product) return;

  document.querySelector("#detailQty").textContent = detailQty;
  document.querySelector("#detailAdd span").textContent =
    formatMoney(product.price * detailQty);
}

function applyPromo() {
  const code = (promoInput?.value || "").trim().toUpperCase();

  if (!code) {
    appliedPromo = false;
    renderCart();
    showToast("Kode promo dikosongkan");
    return;
  }

  if (code !== "HEMAT3") {
    appliedPromo = false;
    renderCart();
    showToast("Kode promo tidak valid");
    return;
  }

  if (getSubtotal() < 20000) {
    appliedPromo = false;
    renderCart();
    showToast("Minimal belanja Rp 20.000 untuk HEMAT3");
    return;
  }

  appliedPromo = true;
  renderCart();
  showToast("Promo HEMAT3 berhasil diterapkan 🎉");
}

function goToCheckout() {
  const { cart } = updateCartUI();

  if (!cart.length) {
    showToast("Keranjang masih kosong");
    return;
  }

  const order = {
    cart,
    total: getSubtotal() - getDiscount(),
    subtotal: getSubtotal(),
    discount: getDiscount(),
    promo: appliedPromo ? "HEMAT3" : null
  };

  localStorage.setItem("kantinku_order_draft", JSON.stringify(order));
  closeCart();
  window.location.href = "checkout.html";
}

/* Drawer events */
document.querySelector("#cartBtn")?.addEventListener("click", openCart);
document.querySelector("#closeCart")?.addEventListener("click", closeCart);
overlay?.addEventListener("click", closeCart);

cartItems?.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const item = button.closest(".cart-item");
  const id = Number(item?.dataset.id);
  if (!id) return;

  if (button.dataset.action === "increase") changeCartQuantity(id, 1);
  if (button.dataset.action === "decrease") changeCartQuantity(id, -1);
  if (button.dataset.action === "remove") removeCartItem(id);
});

promoButton?.addEventListener("click", applyPromo);

document.querySelector("#checkoutBtn")?.addEventListener("click", goToCheckout);

/* Product grid */
productGrid?.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    event.stopPropagation();
    addToCart(Number(addButton.dataset.add), 1, false);
    return;
  }

  const product = event.target.closest(".product");
  if (product) openDetail(Number(product.dataset.id));
});

/* Search */
document.querySelector("#searchInput")?.addEventListener("input", renderProducts);

/* Categories */
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    renderProducts();
  });
});

/* Sorting */
document.querySelectorAll(".sort-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".sort-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    selectedSort = button.dataset.sort;
    renderProducts();
  });
});

/* Detail modal */
document.querySelector("#minus")?.addEventListener("click", () => {
  if (detailQty > 1) detailQty--;
  renderDetailTotal();
});

document.querySelector("#plus")?.addEventListener("click", () => {
  detailQty++;
  renderDetailTotal();
});

document.querySelector("#detailAdd")?.addEventListener("click", () => {
  if (!detailProductId) return;
  addToCart(detailProductId, detailQty, true);
  closeDetail();
});

document.querySelector("#closeHelp")?.addEventListener("click", () => {
  document.querySelector("#helpModal").classList.remove("show");
});

document.querySelector("#helpBtn")?.addEventListener("click", () => {
  document.querySelector("#helpModal").classList.add("show");
});

document.querySelector("#footerHelp")?.addEventListener("click", () => {
  document.querySelector("#helpModal").classList.add("show");
});

document.querySelector("#helpModal")?.addEventListener("click", event => {
  if (event.target.id === "helpModal") {
    document.querySelector("#helpModal").classList.remove("show");
  }
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#searchInput")?.focus();
  }

  if (event.key === "Escape") {
    closeCart();
    closeDetail();
    document.querySelector("#helpModal")?.classList.remove("show");
  }
});

/* Keep UI in sync if localStorage changes in another tab/page. */
window.addEventListener("storage", () => {
  updateCartBadge();
  renderCart();
});

/* Initial render */
renderProducts();
renderCart();
renderDetailTotal();
