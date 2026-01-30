
const productName = document.getElementById("productName")
const productPrice = document.getElementById("productPrice")
const productUrl = document.getElementById("productUrl")
const productDescription = document.getElementById("productDescription")
const button = document.getElementById("addProductForm")
const display = document.getElementById("displayitems")


let storeData = []

const db = localStorage.getItem("db")
if (db) {
    storeData = JSON.parse(db)
}

storeData.forEach(element => {
    const div = document.createElement("div")
    div.className = 'items'
    div.innerHTML = `<h1 id="itemNames">${element.name}</h1>
                    <span class="buttonspan">
                    <button class="editButton">Edit</button>
                    <button class="deleteButton">Delete</button>
                    </span>`

    display.append(div)

});


button.addEventListener("submit", function (i) {
    i.preventDefault()
    const name = productName.value
    const price = Number(productPrice.value)
    const url = productUrl.value
    const description = productDescription.value

    const data = { name, price, url, description }
    storeData.push(data)
    localStorage.setItem("db", JSON.stringify(storeData))



    const div = document.createElement("div")
    div.className = "items"
    div.innerHTML = `
                    <h1 id="itemNames">${name}</h1>
                    <span class="buttonspan">
                    <button class="editButton">Edit</button>
                    <button class="deleteButton">Delete</button>
                    </span>`

    display.append(div)

    const dltBtn = div.querySelector(".deleteButton")

})

display.addEventListener("click",function(e){
    if(e.target.classList.contains("deleteButton")){
        const div = e.target.closest(".items");
        div.remove()
    }

})





