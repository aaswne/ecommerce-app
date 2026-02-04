const button = document.getElementById("buttonLogin");
const userEmail = document.getElementById("emailId");
const userPass = document.getElementById("password");
const loginIndex = document.getElementById("loginButton")

const adminLogin = document.getElementById("buttonLogin")
const adminEmail = document.getElementById("adminEmail")
const adminPass = document.getElementById("adminPassword")
const forgotAdmin = document.getElementById("forgotAdmin")

button.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Button clicked");

    const email = userEmail.value.trim().toLowerCase();
    const pass = userPass.value.trim();

    if (
        email == "ashhwin041@gmail.com" &&
        pass == "ashhwin041"
    ) {
        window.location.href = "index.html";
    } else {
        alert("EMAIL OR PASSWORD IS WRONG");
    }

});


adminLogin.addEventListener("click", function () {

    const aEmail = adminEmail.value.trim().toLowerCase()
    const aPass = adminPass.value.trim()

    if (aEmail.innertext === "") {
        alert("enter balied email")
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

