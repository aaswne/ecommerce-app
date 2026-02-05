const storeData = localStorage.getItem("db");
const display = document.getElementById("productList");
const loginButton = document.getElementById("loginButton");
const cartEl = document.getElementById("cart");
const bannerButton = document.getElementById("bannerButton");

let data = storeData ? JSON.parse(storeData) : [];
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// -------- helpers ----------
function getCartCount() {
  return cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function updateCartUI() {
  cartEl.innerText = `cart(${getCartCount()})`;
}

function parsePriceToNumber(price) {
  // handles "₹999" or "999"
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

function renderProducts(products) {
  display.innerHTML = "";

  if (!products.length) {
    const msg = document.createElement("p");
    msg.style.padding = "16px";
    msg.innerText = "No products found. Add products from Admin.";
    display.appendChild(msg);
    return;
  }

  products.forEach((item) => {
    const div = document.createElement("div");
    div.className = "productsCard";
    div.dataset.id = item.id ?? item.name; // fallback if no id

    div.innerHTML = `
      <img src="${item.url}" alt="${item.name}" class="imageOfproduct">
      <h3 class="nameOfproduct">${item.name}</h3>
      <p class="priceOfproduct">₹${item.price}</p>
      <button class="AddtoCart">Add to cart</button>
    `;

    display.append(div);
  });
}

// -------- initial render ----------
renderProducts(data);
updateCartUI();

// -------- events ----------
display.addEventListener("click", function (e) {
  if (!e.target.classList.contains("AddtoCart")) return;

  const card = e.target.closest(".productsCard");
  if (!card) return;

  const id = card.dataset.id;
  const name = card.querySelector(".nameOfproduct").innerText;
  const priceText = card.querySelector(".priceOfproduct").innerText;
  const url = card.querySelector(".imageOfproduct").src;

  const price = parsePriceToNumber(priceText);

  // ✅ If item already in cart, increase qty
  const found = cartItems.find((x) => x.id === id);
  if (found) {
    found.qty = (found.qty || 1) + 1;
  } else {
    cartItems.push({ id, name, price, url, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartUI();
});

// cart click -> cart page
cartEl.addEventListener("click", function () {
  window.location.href = "cart.html";
});

// banner button -> scroll to products
bannerButton.addEventListener("click", function () {
  document.querySelector(".productDisplay")?.scrollIntoView({ behavior: "smooth" });
});

// login button logic (login/logout)
function isLoggedIn() {
  return localStorage.getItem("isLogin") === "true";
}

function updateLoginButton() {
  loginButton.innerText = isLoggedIn() ? "Logout" : "Login";
}

updateLoginButton();

loginButton.addEventListener("click", function () {
  if (isLoggedIn()) {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("role");
    updateLoginButton();
    alert("Logged out");
    return;
  }
  window.location.href = "userlogin.html";
});
