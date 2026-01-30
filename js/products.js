const storeData = localStorage.getItem("db")

const display = document.getElementById("productList")

let data = []

if(storeData){

     data = JSON.parse(storeData)
 }

 data.forEach(item=>{
    const div = document.createElement("div")
    div.className="productsCard"
    div.innerHTML=`<img src="${item.url}" alt="" id="imageOfproduct">
            <h3 id="nameOfproduct">${item.name}</h3>
            <p id="priceOfproduct">₹${item.price}</p>
            <button id="AddtoCart">Add to cart</button>`
console.log(item.name,item.price)
            display.append(div)
 })

 