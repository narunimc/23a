
const arena = document.getElementById("arena");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const colorBtn = document.getElementById("colorBtn");
const playerBtn = document.getElementById("playerBtn");
const durationInput = document.getElementById("duration");
const playerInfo = document.getElementById("playerInfo");
const message = document.getElementById("message");
const result = document.getElementById("result");

const studentID = "NHẬP MÃ SINH VIÊN CỦA BẠN";

let score = 0;
let time = 30;
let gameRunning = false;
let timer;
let targetTimer;

function moveTarget() {
    const maxLeft = arena.clientWidth - target.offsetWidth;
    const maxTop = arena.clientHeight - target.offsetHeight;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    target.style.left = randomLeft + "px";
    target.style.top = randomTop + "px";
}

function startGame() {
    if (gameRunning) return;

    const selectedTime = Number(durationInput.value);

    if (!Number.isInteger(selectedTime) || selectedTime < 1) {
        alert("Vui lòng nhập thời gian hợp lệ!");
        return;
    }

    score = 0;
    time = selectedTime;
    gameRunning = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    result.textContent = "";
    message.style.display = "none";

    target.style.display = "block";
    startBtn.disabled = true;
    durationInput.disabled = true;

    moveTarget();

    targetTimer = setInterval(function() {
        if (gameRunning) {
            moveTarget();
        }
    }, 1000);

    timer = setInterval(function() {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;

    clearInterval(timer);
    clearInterval(targetTimer);

    target.style.display = "none";
    message.style.display = "block";
    message.textContent = "Trò chơi kết thúc!";

    result.textContent = "Bạn đạt được " + score + " điểm!";

    startBtn.disabled = false;
    startBtn.textContent = "Chơi lại";
    durationInput.disabled = false;
}

target.addEventListener("click", function(event) {
    if (!gameRunning) return;

    event.stopPropagation();

    score++;
    scoreDisplay.textContent = score;

    moveTarget();
});

startBtn.addEventListener("click", startGame);

colorBtn.addEventListener("click", function() {
    const colors = [
        "#e3f2fd",
        "#fce4ec",
        "#e8f5e9",
        "#fff3e0",
        "#ede7f6",
        "#fff9c4"
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);

    arena.style.backgroundColor = colors[randomIndex];
});

playerBtn.addEventListener("click", function() {
    playerInfo.textContent = "Mã sinh viên: " + studentID;
});
