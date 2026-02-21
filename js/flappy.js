let canvas = document.getElementById("flappyCanvas");
let ctx = canvas.getContext("2d");

let birdY;
let velocity;
let gravity = 0.5;
let jump = -8;

let pipes;
let score;
let game;

function initGame() {
    birdY = canvas.height / 2;
    velocity = 0;
    score = 0;

    pipes = [{
        x: canvas.width,
        top: Math.random() * 200 + 50
    }];

    clearInterval(game);
    game = setInterval (draw, 20);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        velocity = jump;
    }
});

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(50, birdY, 30, 30);
}

function drawPipes() {
    ctx.fillStyle = "green";

    pipes.forEach(pipe => {
        //Top Pipe
        ctx.fillRect(pipe.x, 0, 50, pipe.top);

        //Bottom Pipe
        ctx.fillRect(pipe.x, pipe.top + 120, 50, canvas.height);

        pipe.x -= 2;

        //Collision detection
        if (
            50 + 30 > pipe.x &&
            50 < pipe.x + 50 &&
            (birdY < pipe.top || birdY + 30 > pipe.top + 120)
        ) {
            gameOver();
        }

        //score
        if (pipe.x === 50) {
            score++;
        }
    });

    //Add New Pipes
    if (pipes[pipes.length -1].x < 200) {
        pipes.push({
            x: canvas.width,
            top: Math.random() * 200 + 50
        });
    }

    // Remove Off-Screen Pipes
    if (pipes[0].x < -50) {
        pipes.shift();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    velocity += gravity;
    birdY += velocity;

    drawBird();
    drawPipes();

    //Ground Collision
    if (birdY + 30 > canvas.height || birdY < 0) {
        gameOver();
    }

    // Draw Score
    ctx.fillStyle = "white";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Score: " + score, 10, 25);
}

function gameOver() {
    clearInterval(game);
    setTimeout(() => {
        initGame();
    }, 100);
}

function goBack() {
    window.location.href = "dashboard.html";
}

initGame();