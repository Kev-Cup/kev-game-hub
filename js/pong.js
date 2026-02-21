let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let paddleHeight = 80;
let paddleWidth = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 8;

let ballSpeedX = 4;
let ballSpeedY = 4;

document.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
    let rect = canvas.getBoundingClientRect();
    playerY = event.clientY - rect.top - paddleHeight / 2;
}

function drawRect(x, y, w, h) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Player Paddle
    drawRect(0, playerY, paddleWidth, paddleHeight);

    //AI Paddle
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    //Ball
    drawCircle(ballX, ballY, ballRadius);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (aiY < 0) aiY = 0;
    if (aiY + paddleHeight > canvas.height) aiY = canvas.height - paddleHeight;

    if (playerY < 0) playerY = 0;
    if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight;

    //Bounce top/bottom
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY *=-1;
    }

    //Player collision
    if (ballX - ballRadius < paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight) {
        ballSpeedX *= -1;
    }

    //AI follow
    aiY += ((ballY - (aiY + paddleHeight / 2)) * 0.05);

    //AI Collision
    if (ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > aiY &&
        ballY < aiY + paddleHeight) {
        ballSpeedX *= -1
    }

    //Reset Ball
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function goBack() {
    window.location.href = "dashboard.html";
}

gameLoop();