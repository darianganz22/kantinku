/* =========================================================
   KANTINKU - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [

    {
        id: "ayam-geprek",
        name: "Ayam Geprek",
        category: "makanan",
        price: 15000,
        rating: 4.9,
        reviews: 128,
        sold: 320,
        badge: "Best Seller",
        description: "Ayam crispy dengan sambal geprek pedas gurih.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
        comment: "Ayamnya crispy dan sambalnya mantap!"
    },

    {
        id: "seblak",
        name: "seblak",
        category: "makanan",
        price: 12000,
        rating: 4.8,
        reviews: 96,
        sold: 285,
        badge: "Best Seller",
        description: " seblak telur dan topping ayam.",
        image: "assets/products/seblak.webp",
        comment: "Porsinya pas dan rasanya enak."
    },

    {
        id: "mie-goreng",
        name: "Mie Goreng Telur",
        category: "makanan",
        price: 10000,
        rating: 4.7,
        reviews: 84,
        sold: 260,
        badge: "Favorit",
        description: "Mie goreng dengan telur, sayur dan bumbu spesial.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
        comment: "Enak banget buat makan siang."
    },

    {
        id: "nasi-ayam",
        name: "Nasi Ayam Crispy",
        category: "makanan",
        price: 14000,
        rating: 4.8,
        reviews: 73,
        sold: 230,
        badge: "",
        description: "Nasi hangat dengan ayam crispy dan saus gurih.",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
        comment: "Ayamnya renyah, cocok sama nasi."
    },

    {
        id: "bakso",
        name: "Bakso Kuah",
        category: "makanan",
        price: 12000,
        rating: 4.7,
        reviews: 67,
        sold: 210,
        badge: "",
        description: "Bakso sapi dengan kuah hangat dan gurih.",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=85",
        comment: "Kuahnya gurih dan baksonya enak."
    },

    {
        id: "sosis-bakar",
        name: "Sosis Bakar",
        category: "snack",
        price: 8000,
        rating: 4.6,
        reviews: 59,
        sold: 195,
        badge: "",
        description: "Sosis bakar dengan saus barbeque manis gurih.",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85",
        comment: "Snack favorit pas jam istirahat."
    },

    {
        id: "kentang-goreng",
        name: "Kentang Goreng",
        category: "snack",
        price: 8000,
        rating: 4.6,
        reviews: 52,
        sold: 180,
        badge: "",
        description: "Kentang goreng renyah dengan saus pilihan.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
        comment: "Gurih dan porsinya cukup."
    },

    {
        id: "gorengan",
        name: "Gorengan Campur",
        category: "snack",
        price: 2000,
        rating: 4.5,
        reviews: 44,
        sold: 410,
        badge: "Murah",
        description: "Bakwan, tahu isi, tempe dan gorengan pilihan.",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
        comment: "Murah dan cocok buat ngemil."
    },

    {
        id: "es-teh",
        name: "Es Teh Manis",
        category: "minuman",
        price: 4000,
        rating: 4.9,
        reviews: 156,
        sold: 520,
        badge: "Best Seller",
        description: "Teh manis dingin yang segar dan pas diminum siang.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85",
        comment: "Seger banget setelah makan."
    },

    {
        id: "es-jeruk",
        name: "Es Jeruk",
        category: "minuman",
        price: 5000,
        rating: 4.7,
        reviews: 91,
        sold: 290,
        badge: "",
        description: "Jeruk segar dengan rasa manis dan sedikit asam.",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=85",
        comment: "Jeruknya terasa segar."
    },

    {
        id: "susu-coklat",
        name: "Susu Coklat",
        category: "minuman",
        price: 6000,
        rating: 4.8,
        reviews: 63,
        sold: 175,
        badge: "",
        description: "Minuman susu coklat creamy dan manis.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
        comment: "Coklatnya enak dan tidak terlalu manis."
    },

    {
        id: "air-mineral",
        name: "Air Mineral",
        category: "minuman",
        price: 3000,
        rating: 4.8,
        reviews: 102,
        sold: 390,
        badge: "",
        description: "Air mineral dingin untuk menemani aktivitas sekolah.",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85",
        comment: "Praktis dan wajib ada."
    }

];


/* =========================================================
   STATE
   ========================================================= */

let currentCategory = "all";

let currentFilter = "popular";

let searchKeyword = "";

let cart = [];


/* =========================================================
   ELEMENTS
   ========================================================= */

const productGrid =
    document.getElementById("productGrid");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const menuTotal =
    document.getElementById("menuTotal");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartDrawer =
    document.getElementById("cartDrawer");

const overlay =
    document.getElementById("overlay");

const supportModal =
    document.getElementById("supportModal");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================================
   FORMAT RUPIAH
   ========================================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =========================================================
   CATEGORY NAME
   ========================================================= */

function getCategoryName(category) {

    const categories = {

        makanan: "Makanan",

        snack: "Snack",

        minuman: "Minuman"

    };

    return categories[category] || "Menu";

}


/* =========================================================
   STAR RATING
   ========================================================= */

function generateStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (rating >= i) {

            stars += "★";

        } else {

            stars += "☆";

        }

    }

    return stars;

}


/* =========================================================
   RENDER PRODUCT
   ========================================================= */

function renderProducts() {

    let filteredProducts = [...products];


    /* CATEGORY */

    if (currentCategory !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category === currentCategory
            );

    }


    /* SEARCH */

    if (searchKeyword.trim() !== "") {

        const keyword =
            searchKeyword.toLowerCase();

        filteredProducts =
            filteredProducts.filter(product => {

                return (

                    product.name
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    product.description
                        .toLowerCase()
                        .includes(keyword)

                );

            });

    }


    /* SORT */

    if (currentFilter === "popular") {

        filteredProducts.sort(
            (a, b) => b.sold - a.sold
        );

    }


    if (currentFilter === "cheap") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (currentFilter === "rating") {

        filteredProducts.sort(
            (a, b) => b.rating - a.rating
        );

    }


    /* TOTAL */

    menuTotal.textContent =
        `${filteredProducts.length} menu tersedia`;


    /* EMPTY */

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = "";

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    /* PRODUCT CARD */

    productGrid.innerHTML =
        filteredProducts
            .map(product => {

                return `

                <article
                    class="product-card"
                    data-id="${product.id}"
                >

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                        >

                        ${
                            product.badge
                                ?
                                `<span class="product-badge">
                                    ${product.badge}
                                </span>`
                                :
                                ""
                        }

                        <button
                            class="favorite-button"
                            onclick="toggleFavorite(this)"
                            aria-label="Favorit"
                        >
                            ♡
                        </button>

                    </div>


                    <div class="product-content">

                        <div class="product-category">
                            ${getCategoryName(product.category)}
                        </div>


                        <h3 class="product-name">
                            ${product.name}
                        </h3>


                        <p class="product-description">
                            ${product.description}
                        </p>


                        <div class="product-rating">

                            <span class="stars">
                                ${generateStars(product.rating)}
                            </span>

                            <span class="rating-number">
                                ${product.rating}
                            </span>

                            <span class="review-count">
                                (${product.reviews} ulasan)
                            </span>

                        </div>


                        <div class="product-footer">

                            <div class="product-price">
                                ${formatRupiah(product.price)}
                            </div>


                            <button
                                class="add-button"
                                onclick="addToCart('${product.id}')"
                            >

                                <span>+</span>

                                Tambah

                            </button>

                        </div>

                    </div>

                </article>

                `;

            })
            .join("");

}


/* =========================================================
   ADD CART
   ========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${product.name} ditambahkan ke keranjang`
    );

}


/* =========================================================
   UPDATE CART
   ========================================================= */

function updateCart() {

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const totalPrice =
        cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        formatRupiah(totalPrice);


    renderCart();

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <div>
                    🛒
                </div>

                <h4>
                    Keranjang masih kosong
                </h4>

                <p>
                    Yuk pilih makanan favoritmu!
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML =

        cart.map(item => {

            return `

                <div class="cart-item">

                    <img
                        class="cart-item-image"
                        src="${item.image}"
                        alt="${item.name}"
                    >


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <div class="cart-item-price">
                            ${formatRupiah(item.price)}
                        </div>


                        <div class="quantity-control">

                            <button
                                onclick="changeQuantity('${item.id}', -1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity('${item.id}', 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart('${item.id}')"
                    >
                        ×
                    </button>

                </div>

            `;

        }).join("");

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            item => item.id === productId
        );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    updateCart();

}


/* =========================================================
   REMOVE CART
   ========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    updateCart();

    showToast("Item dihapus dari keranjang");

}


/* =========================================================
   CART OPEN
   ========================================================= */

function openCart() {

    cartDrawer.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CART CLOSE
   ========================================================= */

function closeCart() {

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   SUPPORT MODAL
   ========================================================= */

function openSupport() {

    supportModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeSupport() {

    supportModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================================
   FAVORITE
   ========================================================= */

function toggleFavorite(button) {

    if (button.textContent.trim() === "♡") {

        button.textContent = "♥";

        button.style.color = "#ef4444";

        showToast("Ditambahkan ke favorit");

    } else {

        button.textContent = "♡";

        button.style.color = "";

        showToast("Dihapus dari favorit");

    }

}


/* =========================================================
   CATEGORY CLICK
   ========================================================= */

document
    .querySelectorAll(".category-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category-item")
                    .forEach(item => {

                        item.classList.remove("active");

                    });


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                renderProducts();

            }
        );

    });


/* =========================================================
   FILTER CLICK
   ========================================================= */

document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-button")
                    .forEach(item => {

                        item.classList.remove("active");

                    });


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                renderProducts();

            }
        );

    });


/* =========================================================
   SEARCH
   ========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        searchKeyword =
            searchInput.value;


        clearSearch.style.display =
            searchInput.value
                ? "block"
                : "none";


        renderProducts();

    }
);


/* =========================================================
   CLEAR SEARCH
   ========================================================= */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchKeyword = "";

        clearSearch.style.display =
            "none";

        renderProducts();

        searchInput.focus();

    }
);


/* =========================================================
   RESET SEARCH
   ========================================================= */

document
    .getElementById("resetSearch")
    .addEventListener(
        "click",
        () => {

            searchInput.value = "";

            searchKeyword = "";

            currentCategory = "all";

            document
                .querySelectorAll(".category-item")
                .forEach(item => {

                    item.classList.remove("active");

                });


            document
                .querySelector(
                    '.category-item[data-category="all"]'
                )
                .classList.add("active");


            renderProducts();

        }
    );


/* =========================================================
   CART EVENTS
   ========================================================= */

document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


/* =========================================================
   SUPPORT EVENTS
   ========================================================= */

document
    .getElementById("openSupport")
    .addEventListener(
        "click",
        openSupport
    );


document
    .getElementById("floatingSupport")
    .addEventListener(
        "click",
        openSupport
    );


document
    .getElementById("closeSupport")
    .addEventListener(
        "click",
        closeSupport
    );


supportModal.addEventListener(
    "click",
    event => {

        if (event.target === supportModal) {

            closeSupport();

        }

    }
);


/* =========================================================
   CHECKOUT
   ========================================================= */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Keranjang masih kosong"
                );

                return;

            }


            /*
                Halaman checkout akan kita buat
                pada tahap berikutnya.
            */

            window.location.href =
                "checkout.html";

        }
    );


/* =========================================================
   KEYBOARD ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCart();

            closeSupport();

        }

    }
);


/* =========================================================
   INITIAL
   ========================================================= */

renderProducts();

updateCart();