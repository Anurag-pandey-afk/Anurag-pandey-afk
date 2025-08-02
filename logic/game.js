let lastBox = null;
let currentBox = null;
let speed = 4000;
let gameInterval = null;
let wasClicked = false;

function getBox(id) {
    return document.getElementById(id);
}

function toggleBox(id, color) {
    const box = getBox(id.toString());
    if (box) {
        box.style.backgroundColor = color;
    }
}

function handleClick(id) {
    const score = document.getElementById("score");
    const box = getBox(currentBox);
    const tap_audio = document.getElementById("tap-audio");

    if (parseInt(id) === currentBox) {
        wasClicked = true;

        tap_audio.play();

        score.innerHTML = parseInt(score.innerHTML) + 1;
        box.innerHTML = "X";

        if (speed > 500) {
            speed -= 150;
            restartGameLoop();
        }

        setTimeout(() => {
            toggleBox(id, "red");
            box.innerHTML = "";
            currentBox = null;
        }, 150);
    }
}

function randomToggleBox() {

    let loserScreen = "<div style='display:flex; flex-direction: column; align-items: center; justify-content:center; height:100%; text-align: center; margin: 20px;'><span>BURH YOU ARE A LOSER!</span><button onclick=' window.location.reload()' style='font-size: 20px; padding: 8px 15px;'>Play again</button></div>"
    if (currentBox !== null && wasClicked === false) {
        clearInterval(gameInterval);
        const go_audio = document.getElementById("game-over-audio");
          const bg_audio = document.getElementById("bg-audio");
        bg_audio.pause()
        go_audio.play();

        document.getElementById("playarea").style.display = "flex";
        document.getElementById("playarea").innerHTML = loserScreen;
        return;
    }

    if (lastBox !== null) {
        toggleBox(lastBox, "red");
        currentBox = null;
    }

    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * 32);
    } while (randomNum === lastBox);

    toggleBox(randomNum, "green");
    currentBox = randomNum;
    lastBox = randomNum;
    wasClicked = false;
}

function restartGameLoop() {
    clearInterval(gameInterval);
    gameInterval = setInterval(randomToggleBox, speed);
}

function startGame() {
    // Hide start button
    document.getElementById("startBtn").style.display = "none";

    // Play background audio
    const bg_audio = document.getElementById("bg-audio");
    bg_audio.play().catch((err) => {
        console.log("Autoplay blocked:", err);
    });

    // Start the game
    randomToggleBox();
    gameInterval = setInterval(randomToggleBox, speed);
}
