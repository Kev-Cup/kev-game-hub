let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");

if (!currentUser || !users[currentUser]) {
    window.location.href = "index.html";
}

let user = users[currentUser];

document.getElementById("welcomeText").innerText = "Welcome, " + currentUser + "👋";
document.getElementById("level").innerText = user.level;
document.getElementById("xp").innerText = user.xp;


function pong() {
    gainXP(10);
    window.location.href = "pong.html";
}

function gainXP(amount) {
    user.xp += amount;

    if (user.xp >= 100) {
        user.level += 1;
        user.xp = 0;
        alert("Level Up!");
    }

    users[currentUser] = user;
    localStorage.setItem("users", JSON.stringify(users));

    location.reload();
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function kool() {
    window.location.href = "https://kev-cup.github.io/3CG/index.html";
}

function snake() {
    if (user.level < 5) {
        document.getElementById("lockedGame").disabled = true;
        document.getElementById("lockedGame").innerText = "Snake (Level 5 Required)";
    }

    if (user.level >= 5) {
        document.getElementById("lockedGame").disabled = false;
        document.getElementById("lockedGame").innerText = "Snake";
        gainXP(20);
        window.location.href = "snake.html";
    }
}

function flappyBird() {
    if (user.level < 10) {
        document.getElementById("2lockedGame").disabled = true;
        document.getElementById("2lockedGame").innerText = "Flappy Bird (Level 10 Required)";
    }

    if (user.level >= 10) {
        document.getElementById("2lockedGame").disabled = false;
        document.getElementById("2lockedGame").innerText = "Flappy Bird";
        gainXP(30);
        window.location.href = "flappy.html";
    }
}

function space() {
    if (user.level < 15) {
    document.getElementById("3lockedGame").disabled = true;
    document.getElementById("3lockedGame").innerText = "Space Invaders (Level 15 Required)";
}

    if (user.level >= 15) {
        document.getElementById("3lockedGame").disabled = false;
        document.getElementById("3lockedGame").innerText = "Space Invaders";
        gainXP(40);
        window.location.href = "space.html";
    }
}