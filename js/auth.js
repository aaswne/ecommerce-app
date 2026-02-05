const button = document.getElementById("buttonLogin");
const userEmail = document.getElementById("emailId");
const userPass = document.getElementById("password");
const loginIndex = document.getElementById("loginButton")

const adminLogin = document.getElementById("buttonLogi")
const adminEmail = document.getElementById("adminEmail")
const adminPass = document.getElementById("adminPassword")
const forgotAdmin = document.getElementById("forgotAdmin")

let isLogin = false

button.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Button clicked");

    const email = userEmail.value.trim().toLowerCase();
    const pass = userPass.value.trim();

    if (
        email == "ashhwin041@gmail.com" &&
        pass == "ashhwin041"
    ) {
         isLogin = true
        window.location.href = "index.html";
    } else {
         isLogin=false
        alert("EMAIL OR PASSWORD IS WRONG");
    }

});

if(isLogin){
    isLogin===true;
    button.innerText = "Login";
}





adminLogin.addEventListener("click", function () {

    const aEmail = adminEmail.value.trim().toLowerCase()
    const aPass = adminPass.value.trim()

    if (aEmail.innertext === "") {
        alert("enter valied email")
    }

    if (
        aEmail == "aswinkrishna@gmail.com" && aPass == "aswinkrishna"
    ) {
        window.location.href = "admin.html"
    } else {
        alert("wrong password and email")
    }

})


forgotAdmin.addEventListener("click", function () {
    alert("email:aswinkrishna@gmail.com,pass:aswinkrishna")
})

