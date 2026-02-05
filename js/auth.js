// /js/auth.js

// ---------- credentials (demo) ----------
const USER_EMAIL = "ashhwin041@gmail.com";
const USER_PASS = "ashhwin041";

const ADMIN_EMAIL = "aswinkrishna@gmail.com";
const ADMIN_PASS = "aswinkrishna";

// ---------- session helpers ----------
function setSession(role) {
  localStorage.setItem("isLogin", "true");
  localStorage.setItem("role", role); // "user" | "admin"
}

function clearSession() {
  localStorage.setItem("isLogin", "false");
  localStorage.removeItem("role");
}

function isLoggedIn() {
  return localStorage.getItem("isLogin") === "true";
}

function getRole() {
  return localStorage.getItem("role"); // "user" | "admin" | null
}

// ---------- navbar login/logout button (index/cart/etc) ----------
const loginIndexBtn = document.getElementById("loginButton");

function updateNavbarLoginBtn() {
  if (!loginIndexBtn) return;
  loginIndexBtn.innerText = isLoggedIn() ? "Logout" : "Login";
}

updateNavbarLoginBtn();

if (loginIndexBtn) {
  loginIndexBtn.addEventListener("click", () => {
    if (isLoggedIn()) {
      clearSession();
      updateNavbarLoginBtn();
      alert("Logged out");
      // optional: redirect to login page after logout
      window.location.href = "userlogin.html";
      return;
    }
    window.location.href = "userlogin.html";
  });
}

// ---------- USER LOGIN page ----------
const userLoginBtn = document.getElementById("buttonLogin");
const userEmail = document.getElementById("emailId");
const userPass = document.getElementById("password");

// Only attach if elements exist on this page
if (userLoginBtn && userEmail && userPass) {
  userLoginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = userEmail.value.trim().toLowerCase();
    const pass = userPass.value.trim();

    if (email === USER_EMAIL && pass === USER_PASS) {
      setSession("user");
      window.location.href = "index.html";
    } else {
      clearSession();
      alert("EMAIL OR PASSWORD IS WRONG");
    }
  });
}

// ---------- ADMIN LOGIN page ----------
const adminLoginBtn = document.getElementById("buttonLogi"); // your id: buttonLogi
const adminEmail = document.getElementById("adminEmail");
const adminPass = document.getElementById("adminPassword");
const forgotAdmin = document.getElementById("forgotAdmin");

if (adminLoginBtn && adminEmail && adminPass) {
  adminLoginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const aEmail = adminEmail.value.trim().toLowerCase();
    const aPass = adminPass.value.trim();

    if (aEmail === "") {
      alert("Enter valid email");
      return;
    }

    if (aEmail === ADMIN_EMAIL && aPass === ADMIN_PASS) {
      setSession("admin");
      window.location.href = "admin.html";
    } else {
      clearSession();
      alert("Wrong password and email");
    }
  });
}

if (forgotAdmin) {
  forgotAdmin.addEventListener("click", function () {
    alert("email: aswinkrishna@gmail.com, pass: aswinkrishna");
  });
}
