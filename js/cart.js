const cartEl = document.getElementById("cart");
const loginButton = document.getElementById("loginButton");

const cartList = document.getElementById("cartList");
const emptyState = document.getElementById("emptyState");

const subtotalEl = document.getElementById("subtotal");
const deliveryEl = document.getElementById("delivery");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");

const clearCartBtn = document.getElementById("clearCart");
const continueShoppingBtn = document.getElementById("continueShopping");
const emptyShopBtn = document.getElementById("emptyShopBtn");

const promoCodeInput = document.getElementById("promoCode");
const applyPromoBtn = document.getElementById("applyPromo");
const promoMsg = document.getElementById("promoMsg");

const checkoutBtn = document.getElementById("checkoutBtn");

// ---------- helpers ----------
function isLoggedIn() {
  return localStorage.getItem("isLogin") === "true";
}

function updateLoginButton() {
  if (!loginButton) return;
  loginButton.innerText = isLoggedIn() ? "Logout" : "Login";
}

function parsePriceToNumber(price) {
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

function getCart() {
  const raw = localStorage.getItem("cart");
  const cart = raw ? JSON.parse(raw) : [];

  // Normalize older format: {name, price:"₹123", url}
  return cart.map((item) => ({
    id: item.id ?? item.name,
    name: item.name,
    url: item.url,
    price: typeof item.price === "number" ? item.price : parsePriceToNumber(item.price),
    qty: item.qty ?? 1,
  }));
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

let cart = getCart();

// promo state (simple)
let promoDiscount = 0; // extra discount from coupon (number)

// ---------- UI ----------
function cartCount() {
  return cart.reduce((sum, i) => sum + (i.qty || 1), 0);
}

function updateCartCountUI() {
  if (!cartEl) return;
  cartEl.innerText = `cart(${cartCount()})`;
}

function computeAutoDiscount(subtotal) {
  if (subtotal > 10000) return 1000;
  if (subtotal > 5000) return 500;
  return 0;
}

function computeDelivery(subtotal) {
  // free delivery above 10k
  return subtotal > 10000 ? 0 : (subtotal === 0 ? 0 : 100);
}

function render() {
  // empty state toggle
  if (cart.length === 0) {
    emptyState.style.display = "block";
    cartList.innerHTML = "";
  } else {
    emptyState.style.display = "none";
    cartList.innerHTML = "";

    cart.forEach((item) => {
      const lineTotal = item.price * item.qty;

      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
        <article class="cartItem" data-id="${item.id}">
          <div class="itemMedia">
            <img class="itemImage" src="${item.url}" alt="${item.name}" />
          </div>

          <div class="itemInfo">
            <div class="itemTop">
              <h3 class="itemName">${item.name}</h3>
              <p class="itemPrice">₹${item.price}</p>
            </div>

            <div class="itemBottom">
              <div class="qtyControl" aria-label="Quantity">
                <button class="qtyBtn" type="button" data-action="dec">−</button>
                <span class="qtyValue">${item.qty}</span>
                <button class="qtyBtn" type="button" data-action="inc">+</button>
              </div>

              <div class="itemBtns">
                <button class="btnDanger" type="button" data-action="remove">Remove</button>
              </div>
            </div>

            <p class="tinyNote">Item total: ₹${lineTotal}</p>
          </div>
        </article>
      `;

      cartList.appendChild(wrapper.firstElementChild);
    });
  }

  // totals
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const autoDiscount = computeAutoDiscount(subtotal);
  const delivery = computeDelivery(subtotal);

  // coupon discount should NOT exceed subtotal
  const couponDiscount = Math.min(promoDiscount, subtotal);

  const totalDiscount = autoDiscount + couponDiscount;
  const total = Math.max(subtotal - totalDiscount + delivery, 0);

  subtotalEl.innerText = `₹${subtotal}`;
  deliveryEl.innerText = `₹${delivery}`;
  discountEl.innerText = `−₹${totalDiscount}`;
  totalEl.innerText = `₹${total}`;

  updateCartCountUI();
  updateLoginButton();
}

function saveAndRender() {
  setCart(cart);
  render();
}

// ---------- events ----------
if (cartEl) {
  cartEl.addEventListener("click", () => {
    // already on cart page, do nothing
  });
}

if (loginButton) {
  loginButton.addEventListener("click", () => {
    if (isLoggedIn()) {
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("role");
      updateLoginButton();
      alert("Logged out");
      return;
    }
    window.location.href = "userlogin.html";
  });
}

cartList.addEventListener("click", (e) => {
  const article = e.target.closest(".cartItem");
  if (!article) return;

  const id = article.dataset.id;
  const action = e.target.dataset.action;
  if (!action) return;

  const item = cart.find((x) => String(x.id) === String(id));
  if (!item) return;

  if (action === "inc") {
    item.qty += 1;
  } else if (action === "dec") {
    item.qty -= 1;
    if (item.qty <= 0) cart = cart.filter((x) => String(x.id) !== String(id));
  } else if (action === "remove") {
    cart = cart.filter((x) => String(x.id) !== String(id));
  }

  saveAndRender();
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  promoDiscount = 0;
  promoCodeInput.value = "";
  promoMsg.innerText = "";
  saveAndRender();
});

continueShoppingBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

emptyShopBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

applyPromoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const code = promoCodeInput.value.trim().toUpperCase();

  // Simple demo coupons
  if (code === "SAVE10") {
    promoDiscount = 10 * 100; // ₹1000
    promoMsg.innerText = "SAVE10 applied (₹1000 off)";
  } else if (code === "SHIPFREE") {
    // simulate delivery discount by adding promoDiscount equal to delivery later? Keep simple:
    promoDiscount = 200; // small discount
    promoMsg.innerText = "SHIPFREE applied (₹200 off)";
  } else if (code === "") {
    promoDiscount = 0;
    promoMsg.innerText = "Enter a coupon code.";
  } else {
    promoDiscount = 0;
    promoMsg.innerText = "Invalid coupon.";
  }

  render();
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Checkout successful! (Demo)");
  cart = [];
  promoDiscount = 0;
  saveAndRender();
});

// initial
render();
