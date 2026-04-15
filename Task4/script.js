function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

function register() {
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    if (email === "" || pass === "") {
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        alert("User already exists!");
        return;
    }

    users[email] = pass;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully!");
    showLogin();
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
        alert("User not registered!");
        return;
    }

    if (users[email] !== pass) {
        alert("Wrong password!");
        return;
    }

    localStorage.setItem("currentUser", email);
    showDashboard(email);
}

function showDashboard(email) {
    document.querySelector(".container").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    document.getElementById("welcome").innerText = "Welcome " + email;

    let quotes = [
        "🔥 Stay consistent, success will follow!",
        "🚀 Keep building, keep growing!",
        "💡 Great things take time!",
        "🌟 Believe in yourself!"
    ];

    let random = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").innerText = random;
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

let user = localStorage.getItem("currentUser");
if (user) {
    showDashboard(user);
}
