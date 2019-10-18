//Please Upload git
let blockerDiv = document.querySelector(".blocker");
let blockerTitle = document.querySelector(".endGameScreenMessage");
let startPage = document.querySelector(".startPage");
let mainPage = document.querySelector(".mainScreen")

let restartButton = document.querySelector(".restartGameButton");
restartButton.addEventListener("click", onGameLoad);

let startGameButton = document.querySelector(".startGameButton");
startGameButton.addEventListener("click", startGame);


function startGame() {
    startPage.style.display = "none";
    mainPage.style.display = "flex";
    newGameSetup();
}

function onGameLoad() {
    blockerDiv.style.display = "none";
    startPage.style.display = "flex";
}


function onGameEnd(gameOutcome) {
    blockerTitle.innerText = gameOutcome;
    blockerDiv.style.display = "flex";
}