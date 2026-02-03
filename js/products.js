const storeData = localStorage.getItem("db");
const display = document.getElementById("productList");

let data = storeData ? JSON.parse(storeData) : [];

data.forEach((item) => {
  const div = document.createElement("div");
  div.className = "productsCard";
  div.innerHTML = `
    <img src="${item.url}" alt="" class="imageOfproduct">
    <h3 class="nameOfproduct">${item.name}</h3>
    <p class="priceOfproduct">₹${item.price}</p>
    <button class="AddtoCart">Add to cart</button>
  `;
  display.append(div);
});

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

display.addEventListener("click", function (e) {
  if (!e.target.classList.contains("AddtoCart")) return;

  const card = e.target.closest(".productsCard");

  const name = card.querySelector(".nameOfproduct").innerText;
  const price = card.querySelector(".priceOfproduct").innerText;
  const url = card.querySelector(".imageOfproduct").src;

  const itemToAdd = { name, price, url };

  cartItems.push(itemToAdd);

  localStorage.setItem("cart", JSON.stringify(cartItems));

  console.log(itemToAdd)
});
