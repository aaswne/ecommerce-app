const display = document.getElementById("cartList")
const subTottal = document.getElementById("subtotal")
const savedCart = localStorage.getItem("cart");
const delivery = document.getElementById("delivery")
const discount = document.getElementById("discount")
const grandTottal = document.getElementById("total")
const clearCart = document.getElementById("clearCart")

if (savedCart) {
    cart = JSON.parse(savedCart)
}

const priceOnly = [];

cart.forEach(element => {
    const name = element.name
    const price = element.price
    const url = element.url

    const priceNum = Number(String(price).replace(/[^\d.]/g, ""));
    priceOnly.push(priceNum)
    const totalPrice = priceOnly.reduce((sum, price) => sum + price, 0);
    subTottal.innerText = totalPrice


    let discountCharge = 0

    if (totalPrice > 10000) {
        discountCharge = 1000
    } else if (totalPrice > 5000) {
        discountCharge = 500
    } else {
        discountCharge = 0
    }

    discount.innerText = discountCharge



    let deliveryCharge = 0


    if (totalPrice > 10000) {
        deliveryCharge = 0;
    } else {
        deliveryCharge = 100;
    }

    delivery.innerText = deliveryCharge;


    let Tottal = totalPrice - discount + delivery
    console.log(Tottal)
    grandTottal.innerText = Tottal





    const div = document.createElement("div")
    div.className = "itemsList"
    div.innerHTML = `<article class="cartItem">
              <div class="itemMedia">
                <img
                  class="itemImage"
                  src="${url}"
                  alt="Product"
                />
              </div>

              <div class="itemInfo">
                <div class="itemTop">
                  <h3 class="itemName">${name}</h3>
                  <p class="itemPrice">${price}</p>
                </div>


                <div class="itemBottom">
                  <div class="qtyControl" aria-label="Quantity">
                    <button class="qtyBtn" type="button">−</button>
                    <span class="qtyValue">1</span>
                    <button class="qtyBtn" type="button">+</button>
                  </div>

                  <div class="itemBtns">
                    <button class="btnGhost" type="button">Save for later</button>
                    <button class="btnDanger" type="button">Remove</button>
                  </div>
                </div>
              </div>
            </article>`

    display.append(div)
});

clearCart.addEventListener("click", function () {
    localStorage.removeItem("cart");  
    display.innerHTML = "";
    delivery.innerText=0
    subTottal.innerText=0




})




