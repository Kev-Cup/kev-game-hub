let canvas = document.getElementById("spaceCanvas");
let ctx = canvas.getContext("2d");

let player;
let bullets;
let enemies;
let keys = {};
let game;

function initGame() {
    player = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 60,
        width: 50,
        height: 20
    };

    bullets = [];
    enemies = [];

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 8; ++col) {
            enemies.push({
                x: 60 + col * 60,
                y: 50 + row * 40,
                width: 40,
                height: 20
            });
        }
    }

    clearInterval(game);
    game = setInterval(draw, 20);
}

document.addEventListener("keydown", e => {
    keys[e.code] = true;

    if (e.code === "Space") {
        bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y
        });
    }
});

document.addEventListener("keyup", e => {
    keys[e.code] = false;
});

function drawPlayer() {
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "white";

    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        ctx.fillRect(bullet.x, bullet.y, 4, 10);

        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function drawEnemies() {
    ctx.fillStyle = "red";

    enemies.forEach((enemy, eIndex) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        bullets.forEach((bullet, bIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 4 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 10 > enemy.y
            )  {
                enemies.splice(eIndex, 1);
                bullets.splice(bIndex, 1);
            }
        });
    });
}

function movePlayer() {
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= 5;
    }
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
        player.x += 5;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    drawPlayer();
    drawBullets();
    drawEnemies();

    if (enemies.length === 0) {
        clearInterval(game);
        setTimeout(() => {
            initGame();
        }, 100);
    }
}

function goBack() {
    window.location.href = "dashboard.html";
}

initGame();