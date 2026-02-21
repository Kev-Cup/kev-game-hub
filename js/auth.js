function togglePassword(fieldId) {
    let field = document.getElementById(fieldId);

    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

function signup() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;

    if (!username || !password) {
        document.getElementById("message").value = "Fill in all associated fields";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        document.getElementById("message").innerText = "Username already exists!";
        return;
    }

    users[username] = {
        password: password,
        level: 1,
        xp: 0
    };

    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("message").innerText = "Account Successfully Created! You may now use this account to Log In.";
}

function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";

    } else {
        document.getElementById("message").innerText = "Invalid username or password";
    }
}