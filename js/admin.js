// /js/admin.js

// ---- guard: only admin can open ----
const isLogin = localStorage.getItem("isLogin") === "true";
const role = localStorage.getItem("role");
if (!isLogin || role !== "admin") {
  window.location.href = "adminlogin.html";
}

// ---- elements ----
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productUrl = document.getElementById("productUrl");
const productDescription = document.getElementById("productDescription");
const form = document.getElementById("addProductForm");
const display = document.getElementById("displayitems");
const adminLogout = document.getElementById("adminLogout");

let storeData = JSON.parse(localStorage.getItem("db") || "[]");

// ---- helpers ----
function saveDB() {
  localStorage.setItem("db", JSON.stringify(storeData));
}

function makeId() {
  return "p_" + Date.now().toString(16) + "_" + Math.random().toString(16).slice(2);
}

function resetForm() {
  form.reset();
  // If you want to auto focus:
  productName.focus();
}

function render() {
  display.innerHTML = "";

  if (!storeData.length) {
    const p = document.createElement("p");
    p.style.padding = "14px";
    p.innerText = "No products yet. Add your first product above.";
    display.appendChild(p);
    return;
  }

  storeData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "items";
    div.dataset.id = item.id;

    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <img src="${item.url || ""}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:8px;" />
        <div>
          <h1 id="itemNames" style="margin:0;">${item.name}</h1>
          <p style="margin:4px 0;">₹${item.price}</p>
          <p style="margin:4px 0; opacity:0.8;">${item.description || ""}</p>
        </div>
      </div>

      <span class="buttonspan">
        <button class="editButton" type="button">Edit</button>
        <button class="deleteButton" type="button">Delete</button>
      </span>
    `;

    display.appendChild(div);
  });
}

// ---- add product ----
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = productName.value.trim();
  const price = Number(productPrice.value);
  const url = productUrl.value.trim();
  const description = productDescription.value.trim();

  if (!name || !price) {
    alert("Please enter product name and price.");
    return;
  }

  const newProduct = {
    id: makeId(),
    name,
    price,
    url,
    description,
  };

  storeData.unshift(newProduct); // newest first
  saveDB();
  render();
  resetForm();
});

// ---- delete + edit ----
display.addEventListener("click", (e) => {
  const card = e.target.closest(".items");
  if (!card) return;

  const id = card.dataset.id;
  const index = storeData.findIndex((x) => x.id === id);
  if (index === -1) return;

  // DELETE
  if (e.target.classList.contains("deleteButton")) {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    storeData.splice(index, 1);
    saveDB();
    render();
    return;
  }

  // EDIT (fills form and changes submit to "Update")
  if (e.target.classList.contains("editButton")) {
    const item = storeData[index];

    productName.value = item.name;
    productPrice.value = item.price;
    productUrl.value = item.url || "";
    productDescription.value = item.description || "";

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.innerText = "Update Product";

    // Temporary update handler (one-time)
    const updateHandler = (ev) => {
      ev.preventDefault();

      item.name = productName.value.trim();
      item.price = Number(productPrice.value);
      item.url = productUrl.value.trim();
      item.description = productDescription.value.trim();

      saveDB();
      render();
      resetForm();

      submitBtn.innerText = "Add Product";
      form.removeEventListener("submit", updateHandler);
      form.addEventListener("submit", addHandler);
    };

    // swap handlers: remove normal add, use update
    form.removeEventListener("submit", addHandler);
    form.addEventListener("submit", updateHandler);

    return;
  }
});

// Need stable reference for add handler swapping
function addHandler(e) {
  e.preventDefault();

  const name = productName.value.trim();
  const price = Number(productPrice.value);
  const url = productUrl.value.trim();
  const description = productDescription.value.trim();

  if (!name || !price) {
    alert("Please enter product name and price.");
    return;
  }

  const newProduct = {
    id: makeId(),
    name,
    price,
    url,
    description,
  };

  storeData.unshift(newProduct);
  saveDB();
  render();
  resetForm();
}

// Rebind to stable addHandler (since we used inline earlier)
form.removeEventListener("submit", () => {});
form.addEventListener("submit", addHandler);

// ---- logout ----
adminLogout.addEventListener("click", () => {
  const ok = confirm("Are you sure you want to logout?");
  if (!ok) return;

  localStorage.setItem("isLogin", "false");
  localStorage.removeItem("role");
  window.location.href = "adminlogin.html";
});

// initial render
render();
