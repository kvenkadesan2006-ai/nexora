const products = [
  {
    id: 1,
    name: "Classic Creator Camera",
    category: "Cameras",
    price: 74990,
    desc: "Capture every moment beautifully.",
    image: "image/Compact_mirrorless_camera_front_…_2K_20261015112343.jpg",
    badge: "Featured"
  },
  {
    id: 2,
    name: "Digital Art Tablet",
    category: "Tablets",
    price: 52990,
    desc: "A new canvas for your ideas.",
    image: "image/Foldable_tablet_showing_art_appl…_2K_20261015112442.jpg",
    badge: "Creator pick"
  },
  {
    id: 3,
    name: "Future Touch Smartphone",
    category: "Phones",
    price: 68990,
    desc: "Experience the next generation of mobile technology.",
    image: "image/Futuristic_smartphone_with_trans…_2K_20261015112431.jpg",
    badge: "New"
  },
  {
    id: 4,
    name: "AirLite Notebook",
    category: "Computers",
    price: 84990,
    desc: "A sleek design made for life on the go.",
    image: "image/tablet.jpg",
    badge: ""
  },
  {
    id: 5,
    name: "Pocket Bluetooth Speaker",
    category: "Audio",
    price: 4990,
    desc: "Take your playlist wherever you go.",
    image: "image/Portable_bluetooth_speaker_produ…_2K_20261015112421.jpg",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Adventure Party Speaker",
    category: "Audio",
    price: 12990,
    desc: "Bold sound for outdoor adventures and celebrations.",
    image: "image/Portable_Bluetooth_speaker_with_…_2K_20261015112445.jpg",
    badge: ""
  },
  {
    id: 7,
    name: "Studio Zoom Camera",
    category: "Cameras",
    price: 92990,
    desc: "Ready for your next creative shoot.",
    image: "image/Compact_mirrorless_camera_with_lens_2K_20261015112435.jpg",
    badge: ""
  },
  {
    id: 8,
    name: "ProView Laptop",
    category: "Computers",
    price: 99990,
    desc: "Focus, productivity, and creativity in one device.",
    image: "image/Metallic_ultrabook_laptop_floating_2K_20261015112427.jpg",
    badge: "Pro"
  },
  {
    id: 9,
    name: "Pulse Steel Smartwatch",
    category: "Wearables",
    price: 18990,
    desc: "A stylish companion that keeps up with your day.",
    image: "image/Smartwatch_product_shot_2K_20261015112402.jpg",
    badge: ""
  },
  {
    id: 10,
    name: "Everyday Smartwatch",
    category: "Wearables",
    price: 12990,
    desc: "Check the time and wellness insights at a glance.",
    image: "image/Smartwatch_displaying_health_met…_2K_20261015112452.jpg",
    badge: ""
  },
  {
    id: 11,
    name: "Neon VR Experience",
    category: "Gaming",
    price: 44990,
    desc: "Explore new worlds with an immersive experience.",
    image: "image/Virtual_reality_headset_2K_20261015112457.jpg",
    badge: "Explore"
  },
  {
    id: 12,
    name: "Vision VR Headset",
    category: "Gaming",
    price: 39990,
    desc: "A new perspective on entertainment.",
    image: "image/VR_headset_product_photography_2K_20261015112408.jpg",
    badge: ""
  },
  {
    id: 13,
    name: "QuietSpace Headphones",
    category: "Audio",
    price: 14990,
    desc: "Immerse yourself in the music you love.",
    image: "image/Wireless_noise-canceling_headphones_2K_20261015112338.jpg",
    badge: "Popular"
  },
  {
    id: 14,
    name: "UltraWide Gaming Monitor",
    category: "Gaming",
    price: 56990,
    desc: "A major upgrade for your gaming setup.",
    image: "image/Curved_ultra-wide_gaming_monitor_2K_20261015112313.jpg",
    badge: ""
  },
  {
    id: 15,
    name: "FlexCanvas Foldable",
    category: "Tablets",
    price: 119990,
    desc: "Portable design with a larger creative workspace.",
    image: "image/Foldable_tablet_displaying_user_…_2K_20261015112307.jpg",
    badge: "New"
  },
  {
    id: 16,
    name: "NEXORA Edge Smartphone",
    category: "Phones",
    price: 79990,
    desc: "A modern look for your everyday essentials.",
    image: "image/Smartphone_on_white_background_2K_20261015112244.jpg",
    badge: ""
  }
];

const categories = [
  "All",
  "Cameras",
  "Tablets",
  "Phones",
  "Computers",
  "Audio",
  "Wearables",
  "Gaming"
];

const money = amount => "₹" + amount.toLocaleString("en-IN");

const pages = document.querySelectorAll(".page");
const shopGrid = document.getElementById("shopGrid");
const featuredGrid = document.getElementById("featuredGrid");
const categoryFilters = document.getElementById("categoryFilters");
const headerSearch = document.getElementById("headerSearch");
const sortSelect = document.getElementById("sortSelect");
const cartDrawer = document.getElementById("cartDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const toast = document.getElementById("toast");
const editorialVideo = document.getElementById("editorialVideo");

let selectedCategory = "All";
let searchQuery = "";
let toastTimer;
let focusBeforeDrawer = null;
let cart = {};
let wishlist = new Set();

const CART_KEY = "NEXORA-cart";
const WISHLIST_KEY = "NEXORA-wishlist";

function isValidProductId(id) {
  return products.some(product => product.id === Number(id));
}

/* Load saved cart ({ productId: quantity }) */

function loadCart() {
  const loaded = {};

  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));

    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      Object.entries(saved).forEach(([id, qty]) => {
        const quantity = Number(qty);

        if (
          isValidProductId(id) &&
          Number.isSafeInteger(quantity) &&
          quantity > 0
        ) {
          loaded[Number(id)] = quantity;
        }
      });
    }
  } catch {
    // Corrupted or blocked storage: start with an empty cart.
  }

  return loaded;
}

/* Load saved wishlist (array of product ids) */

function loadWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY));

    if (Array.isArray(saved)) {
      return new Set(saved.map(Number).filter(isValidProductId));
    }
  } catch {
    // Corrupted or blocked storage: start with an empty wishlist.
  }

  return new Set();
}

cart = loadCart();
wishlist = loadWishlist();

/*
  Editorial video:
  Play the video only when the cursor enters it.
  Pause the video when the cursor leaves.
  Do not add the autoplay attribute in HTML.
*/

if (editorialVideo) {
  editorialVideo.addEventListener("mouseenter", () => {
    editorialVideo.currentTime = 0;

    editorialVideo.play().catch(() => {
      // Silently handle cases where the browser blocks video playback.
    });
  });

  editorialVideo.addEventListener("mouseleave", () => {
    editorialVideo.pause();
    editorialVideo.currentTime = 0;
  });
}

/* Product cards */

function productCard(product) {
  const inWishlist = wishlist.has(product.id);

  return `
    <article class="product-card">
      <a
        class="product-image-link"
        href="#product/${product.id}"
        aria-label="View ${product.name}"
      >
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
      </a>

      <div class="product-info">
        <span class="product-type">${product.category}</span>

        <h3>
          <a href="#product/${product.id}">
            ${product.name}
          </a>
        </h3>

        <p>${product.desc}</p>

        <div class="product-bottom">
          <span class="price">${money(product.price)}</span>

          <button
            class="wishlist-button"
            type="button"
            data-wishlist="${product.id}"
            aria-pressed="${inWishlist}"
            aria-label="${inWishlist ? "Remove from" : "Add to"} wishlist"
          >
            ${inWishlist ? "♥" : "♡"}
          </button>

          <button
            class="add-button"
            type="button"
            data-add="${product.id}"
            aria-label="Add ${product.name} to cart"
            title="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const featuredIds = [1, 15, 13, 11];

  featuredGrid.innerHTML = featuredIds
    .map(id => products.find(product => product.id === id))
    .filter(Boolean)
    .map(productCard)
    .join("");
}

function renderFilters() {
  categoryFilters.innerHTML = categories
    .map(category => `
      <button
        class="filter-button ${category === selectedCategory ? "active" : ""}"
        type="button"
        data-filter="${category}"
        aria-pressed="${category === selectedCategory}"
      >
        ${category}
      </button>
    `)
    .join("");
}

function renderShop() {
  let result = products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const text =
      `${product.name} ${product.category} ${product.desc}`.toLowerCase();

    return matchesCategory && text.includes(searchQuery.toLowerCase());
  });

  switch (sortSelect.value) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;

    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      // Original product order = Featured.
      break;
  }

  document.getElementById("productCount").textContent = `(${result.length})`;

  shopGrid.innerHTML = result.length
    ? result.map(productCard).join("")
    : `
      <div class="no-results">
        <h3>No products found</h3>
        <p>Try a different search term or category.</p>
      </div>
    `;

  renderFilters();
}

function wishlistCard(product) {
  return `
    <article class="product-card wishlist-card">
      <a
        class="product-image-link"
        href="#product/${product.id}"
        aria-label="View ${product.name}"
      >
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
      </a>

      <div class="product-info">
        <span class="product-type">${product.category}</span>

        <h3>
          <a href="#product/${product.id}">${product.name}</a>
        </h3>

        <p>${product.desc}</p>

        <div class="product-bottom wishlist-bottom">
          <span class="price">${money(product.price)}</span>

          <div class="wishlist-actions">
            <button
              class="wishlist-remove"
              type="button"
              data-wishlist-remove="${product.id}"
              aria-label="Remove ${product.name} from wishlist"
            >
              Remove
            </button>

            <button
              class="wishlist-add"
              type="button"
              data-add="${product.id}"
              aria-label="Add ${product.name} to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderWishlist() {
  const wishlistGrid = document.getElementById("wishlistGrid");
  const saved = products.filter(product => wishlist.has(product.id));

  document.getElementById("wishlistCount").textContent = saved.length;

  if (!wishlistGrid) return;

  wishlistGrid.innerHTML = saved.length
    ? saved.map(wishlistCard).join("")
    : `
      <div class="no-results">
        <h3>Your wishlist is empty</h3>
        <p>Tap the ♡ on any product to save it here.</p>
        <a href="#shop" class="btn btn-dark">Browse products ↗</a>
      </div>
    `;
}

function renderProductPage(id) {
  const product = products.find(item => item.id === id);

  if (!product) return false;

  const inWishlist = wishlist.has(product.id);

  document.getElementById("productDetail").innerHTML = `
    <div class="product-detail-layout">
      <div class="detail-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="detail-copy">
        <span class="eyebrow dark">
          <span></span> ${product.category.toUpperCase()}
        </span>

        <h1>${product.name}</h1>
        <p>${product.desc}</p>

        <strong class="detail-price">
          ${money(product.price)}
        </strong>

        <button
          class="btn btn-dark"
          type="button"
          data-add="${product.id}"
        >
          Add to cart <span aria-hidden="true">↗</span>
        </button>

        <button
          class="btn wishlist-detail-button"
          type="button"
          data-wishlist="${product.id}"
          aria-pressed="${inWishlist}"
          aria-label="${inWishlist ? "Remove from" : "Add to"} wishlist"
        >
          ${inWishlist ? "♥" : "♡"}
        </button>

        <div class="detail-box">
          Product image, name and price are part of this demo showcase.
          Add accurate specifications and availability
          and warranty details before making the product available for purchase.
        </div>
      </div>
    </div>
  `;

  const related = products
    .filter(item =>
      item.category === product.category && item.id !== product.id
    )
    .concat(products.filter(item => item.category !== product.category))
    .slice(0, 4);

  document.getElementById("relatedGrid").innerHTML =
    related.map(productCard).join("");

  return true;
}

/* Navigation */

function updateNavigation(page) {
  document.querySelectorAll("[data-nav]").forEach(link => {
    const isActive = link.dataset.nav === page;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function closeMobileMenu() {
  const nav = document.getElementById("mobileNav");
  const toggle = document.getElementById("menuToggle");

  nav.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
}

function route() {
  let hash;

  try {
    hash = decodeURIComponent(location.hash.slice(1));
  } catch {
    hash = "home";
  }

  const [requestedPage, id] = hash.split("/");
  let page = requestedPage || "home";

  if (page === "product") {
    if (renderProductPage(Number(id))) {
      pages.forEach(section => {
        section.hidden = section.id !== "page-product";
      });

      // Pause the video when the home page is hidden.
      editorialVideo?.pause();

      updateNavigation("shop");
      document.title = "Product Details — NEXORA";

      closeMobileMenu();
      closeCart();

      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    page = "shop";
  }

  if (!["home", "shop", "wishlist", "about", "contact"].includes(page)) {
    page = "home";
  }

  // Home, Shop, About, and Contact sections remain on the same page.
  // Product details are displayed separately.
  pages.forEach(section => {
    section.hidden = section.id === "page-product";
  });

  updateNavigation(page);
  renderShop();
  renderWishlist();

  document.title = "NEXORA — Tech for What’s Next";

  closeMobileMenu();
  closeCart();

  const target = document.getElementById(`page-${page}`);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* Toast */

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* Wishlist */

function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([...wishlist]));
  } catch {
    showToast("Unable to save the wishlist in your browser.");
  }
}

// Updates every heart button on the page (cards, detail page).
function syncWishlistButtons() {
  document.querySelectorAll("[data-wishlist]").forEach(button => {
    const liked = wishlist.has(Number(button.dataset.wishlist));

    button.setAttribute("aria-pressed", String(liked));
    button.setAttribute(
      "aria-label",
      `${liked ? "Remove from" : "Add to"} wishlist`
    );
    button.textContent = liked ? "♥" : "♡";
  });
}

// Hearts + wishlist section + header count.
function syncWishlistUI() {
  syncWishlistButtons();
  renderWishlist();
}

function setWishlist(id, shouldHave) {
  if (!isValidProductId(id) || wishlist.has(id) === shouldHave) return;

  if (shouldHave) {
    wishlist.add(id);
  } else {
    wishlist.delete(id);
  }

  saveWishlist();
  syncWishlistUI();

  showToast(shouldHave ? "Added to wishlist ♥" : "Removed from wishlist");
}

function toggleWishlist(id) {
  setWishlist(id, !wishlist.has(id));
}

/* Cart */

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    showToast("Unable to save the cart in your browser.");
  }

  renderCart();
}

function addToCart(id) {
  if (!products.some(product => product.id === id)) {
    return;
  }

  cart[id] = (Number(cart[id]) || 0) + 1;

  saveCart();
  showToast("Product added to your cart ✓");
}

function removeFromCart(id) {
  if (!(id in cart)) return;

  delete cart[id];

  saveCart();
  showToast("Removed from your cart");
}

function changeQuantity(id, change) {
  const next = (Number(cart[id]) || 0) + change;

  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }

  saveCart();
}

function renderCart() {
  const items = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find(product => product.id === Number(id)),
      quantity: Number(quantity)
    }))
    .filter(
      item =>
        item.product &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0
    );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = money(total);

  document.getElementById("cartItems").innerHTML = items.length
    ? items
        .map(({ product, quantity }) => `
          <div class="cart-row">
            <img
              src="${product.image}"
              alt="${product.name}"
            />

            <div class="cart-row-info">
              <div class="cart-row-top">
                <strong>${product.name}</strong>

                <button
                  class="cart-delete"
                  type="button"
                  data-remove="${product.id}"
                  aria-label="Remove ${product.name} from cart"
                  title="Remove"
                >
                  🗑️
                </button>
              </div>

              <small>${money(product.price)} each</small>

              <div class="cart-row-bottom">
                <div class="quantity-controls">
                  <button
                    type="button"
                    data-quantity="${product.id}"
                    data-change="-1"
                    aria-label="Decrease ${product.name} quantity"
                  >
                    −
                  </button>

                  <span>${quantity}</span>

                  <button
                    type="button"
                    data-quantity="${product.id}"
                    data-change="1"
                    aria-label="Increase ${product.name} quantity"
                  >
                    +
                  </button>
                </div>

                <span class="cart-line-total">
                  ${money(product.price * quantity)}
                </span>
              </div>
            </div>
          </div>
        `)
        .join("")
    : `
      <div class="cart-empty">
        <div style="font-size:36px;margin-bottom:12px">
          🛒
        </div>
        Your Cart is Empty
      </div>
    `;
}

function openCart() {
  focusBeforeDrawer = document.activeElement;

  drawerOverlay.hidden = false;
  cartDrawer.hidden = false;

  document.body.classList.add("drawer-open");

  document.getElementById("cartClose").focus();
}

function closeCart() {
  if (cartDrawer.hidden) return;

  drawerOverlay.hidden = true;
  cartDrawer.hidden = true;

  document.body.classList.remove("drawer-open");

  if (focusBeforeDrawer?.isConnected) {
    focusBeforeDrawer.focus();
  }
}

/* Click events */

document.addEventListener("click", event => {
  const removeWishlistButton = event.target.closest("[data-wishlist-remove]");

  if (removeWishlistButton) {
    setWishlist(Number(removeWishlistButton.dataset.wishlistRemove), false);
    return;
  }

  const wishlistButton = event.target.closest("[data-wishlist]");

  if (wishlistButton) {
    toggleWishlist(Number(wishlistButton.dataset.wishlist));
    return;
  }

  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
    return;
  }

  const categoryLink = event.target.closest("[data-category-link]");

  if (categoryLink) {
    selectedCategory = categoryLink.dataset.categoryLink;

    searchQuery = "";
    headerSearch.value = "";

    // Refresh the category filter even if the shop page is already open.
    if (location.hash === "#shop") {
      renderShop();

      document
        .getElementById("page-shop")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  selectedCategory = button.dataset.filter;
  renderShop();
});

sortSelect.addEventListener("change", renderShop);

/* Search */

document
  .getElementById("headerSearchForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    searchQuery = headerSearch.value.trim();
    selectedCategory = "All";

    renderShop();

    if (location.hash !== "#shop") {
      location.hash = "#shop";
    } else {
      document
        .getElementById("page-shop")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

headerSearch.addEventListener("input", () => {
  if (location.hash === "#shop") {
    searchQuery = headerSearch.value.trim();
    selectedCategory = "All";
    renderShop();
  }
});

/* Cart events */

document.getElementById("cartOpen").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
drawerOverlay.addEventListener("click", closeCart);

document.getElementById("cartItems").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-remove]");

  if (deleteButton) {
    removeFromCart(Number(deleteButton.dataset.remove));
    return;
  }

  const button = event.target.closest("[data-quantity]");

  if (!button) return;

  changeQuantity(
    Number(button.dataset.quantity),
    Number(button.dataset.change)
  );
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  showToast(
    "This is a demo site. Payment checkout has not been integrated yet."
  );
});

/* Mobile menu */

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mobileNav");
  const toggle = document.getElementById("menuToggle");

  nav.hidden = !nav.hidden;

  toggle.setAttribute("aria-expanded", String(!nav.hidden));
  toggle.setAttribute("aria-label", nav.hidden ? "Open menu" : "Close menu");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeMobileMenu();
  }
});

/* Contact form */

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const data = new FormData(form);

  const name = String(data.get("name")).trim();
  const email = String(data.get("email")).trim();
  const subject = String(data.get("subject")).trim();
  const message = String(data.get("message")).trim();

  // Verify your email address before publishing the website.
  const storeEmail = "kvengadesan2006@gmail.com";

  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    message;

  const mailto =
    `mailto:${storeEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  showToast("Your email app will open. The message has not been sent yet.");
});

/* Keep cart + wishlist in sync when another tab changes them */

window.addEventListener("storage", event => {
  if (event.key === CART_KEY) {
    cart = loadCart();
    renderCart();
  }

  if (event.key === WISHLIST_KEY) {
    wishlist = loadWishlist();
    syncWishlistUI();
  }
});

/* Start */

window.addEventListener("hashchange", route);

if (!location.hash) {
  history.replaceState(null, "", "#home");
}

document.getElementById("year").textContent = new Date().getFullYear();

renderFeatured();
renderShop();
renderWishlist();
renderCart();
route();
