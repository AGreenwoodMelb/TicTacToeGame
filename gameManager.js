let arrPlayableBoard = [];
let turnsPlayed = 0;
let arrSize = 0;
let flagGameWon = false;
let lastPlayerTag = "";


let playableBoard = document.querySelector(".playableBoard");

let player1NameSpace = document.querySelector(".leftPlayerColumn h2");
let player2NameSpace = document.querySelector(".rightPlayerColumn h2");

class gridPosition {
    currentTag = "";
    constructor(htmlRef) {
        this.htmlRef = htmlRef;
    }
}

let isPlayerOneTurn = true;

let isBotPlaying = false;

let arrPlayers = [];

class player {
    constructor(name = "defaultPlayer", color = 'blue') {
        this.name = name;
        this.color = color;
    }
}


////////////////////////////////////

function botFirst() {
    botPlay();
    turnsPlayed++;
}

function handleBoardClick(event) {

    let rowCoord = event.target.dataset.row;
    let colCoord = event.target.dataset.column;
    let lastSquareClicked = arrPlayableBoard[rowCoord][colCoord]

    if (lastSquareClicked.currentTag === "" && !flagGameWon) {
        if (isPlayerOneTurn) {
            lastSquareClicked.htmlRef.style.backgroundColor = arrPlayers[0].color;
            lastSquareClicked.currentTag = 'x';
            player1NameSpace.style.opacity = 0.25;
            player2NameSpace.style.opacity = 0.75;

        } else if (!isBotPlaying) {

            lastSquareClicked.htmlRef.style.backgroundColor = arrPlayers[1].color;
            lastSquareClicked.currentTag = 'o';
            player1NameSpace.style.opacity = 0.75;
            player2NameSpace.style.opacity = 0.25;
        }
    }
    if (isBotPlaying) {
        botPlay(rowCoord, colCoord);
        turnsPlayed++;
    }


    turnsPlayed++;

    if (turnsPlayed >= arrSize * 2 - 1) {
        if (hasWinOccured(rowCoord, colCoord)) {
            if (isPlayerOneTurn) {
                onGameEnd(`${arrPlayers[0].name} has won!`);
            } else if (!isBotPlaying) {
                onGameEnd(`${arrPlayers[1].name} has won!`);
            } else {
                onGameEnd("The Bot Has WON");
            }
        } else if (turnsPlayed === arrSize ** 2) {
            onGameEnd("DRAW!");
        }
    }

    if (!isBotPlaying) {
        isPlayerOneTurn = !isPlayerOneTurn;
    }
}


function hasWinOccured(rowCoord, colCoord) {
    lastPlayerTag = (isPlayerOneTurn) ? "x" : "o";
    rowCoord = Number(rowCoord);
    colCoord = Number(colCoord);

    let flagDiagWin = false;

    //Not super efficient but whatevers


    //Only check if the point pressed is on the forward diag
    if (rowCoord === colCoord) {
        flagDiagWin = checkForwardDiag();
    }

    //Only check if the point is on the reverse diag
    if (rowCoord + colCoord === arrSize - 1 && !flagDiagWin) {
        flagDiagWin = checkReverseDiag();
    }

    //Standard Check run every time
    if (checkRow(rowCoord) || checkColumn(colCoord) || flagDiagWin) {

        flagGameWon = true;
        return true;
    }

    // if (turnsPlayed === arrSize ** 2 && !flagGameWon) {
    //     console.log("Draw");
    // }




}


function checkRow(rowToCheck) {
    for (let col = 0; col < arrSize; col++) {
        if ((arrPlayableBoard[rowToCheck][col].currentTag !== lastPlayerTag)) {
            return false;
        }
    }
    return true;
}

function checkColumn(colToCheck) {
    for (let row = 0; row < arrSize; row++) {
        if ((arrPlayableBoard[row][colToCheck].currentTag !== lastPlayerTag)) {
            return false;
        }
    }
    return true;
}

function checkForwardDiag() {
    for (let pos = 0; pos < arrSize; pos++) {

        if ((arrPlayableBoard[pos][pos].currentTag !== lastPlayerTag)) {
            return false;
        }
    }
    return true;
}

function checkReverseDiag() {
    for (let row = 0; row < arrSize; row++) {
        if ((arrPlayableBoard[row][(arrSize - 1) - row].currentTag !== lastPlayerTag)) {
            return false;
        }
    }
    return true;
}


function reset() {
    turnsPlayed = 0;
    playableBoard.innerHTML = "";
    arrPlayableBoard = [];
    flagGameWon = false;
}

function generateGrid(num = 3) {
    reset();
    arrSize = num;
    let newGridHTML = "";

    for (let row = 0; row < num; row++) {
        newGridHTML += `<div class="rows row${row}">`;

        for (let col = 0; col < num; col++) {
            newGridHTML += `<div class="cols column${col}" data-row="${row}" data-column="${col}"></div>`;
        }

        newGridHTML += '</div>';
    }

    playableBoard.innerHTML = newGridHTML;
    getNewGridRefs();

    roundTheCorners();

    if (!isPlayerOneTurn && isBotPlaying) {
        botPlay(-1, -1);
    }
}


function getNewGridRefs() {
    let tempRow;
    for (let row = 0; row < arrSize; row++) {
        tempRow = [];
        for (let col = 0; col < arrSize; col++) {
            tempRow.push(new gridPosition(document.querySelector(`.row${row} .column${col}`)));
        }
        arrPlayableBoard.push(tempRow);
    }
    addListenersToNewGridRefs();
}

function addListenersToNewGridRefs() {
    let arrPlayableSquares = document.querySelectorAll(".cols");
    arrPlayableSquares.forEach(element => {
        element.addEventListener("click", handleBoardClick);
    });
}

function roundTheCorners() {
    arrPlayableBoard[0][0].htmlRef.style.borderTopLeftRadius = "50px";
    arrPlayableBoard[0][arrSize - 1].htmlRef.style.borderTopRightRadius = "50px";
    arrPlayableBoard[arrSize - 1][0].htmlRef.style.borderBottomLeftRadius = "50px";
    arrPlayableBoard[arrSize - 1][arrSize - 1].htmlRef.style.borderBottomRightRadius = "50px";
}

/////////////////////////////////


function newGameSetup() {
    arrPlayers = [];
    let tempPlayer1Name = document.querySelector(".playerOneName").value;
    if (tempPlayer1Name.length == 0) {
        tempPlayer1Name = "defaultPlayer1";
    }
    let tempPlayer2Name = document.querySelector(".playerTwoName").value;
    if (tempPlayer2Name.length == 0) {
        tempPlayer2Name = "defaultPlayer2";
    }

    let tempPlayer1Color = document.querySelector(".playerOneColor").value;
    if (!(isColor(tempPlayer1Color)) || tempPlayer1Color.length == 0) {
        tempPlayer1Color = "red";
    }

    let tempPlayer2Color = document.querySelector(".playerTwoColor").value;
    if (!(isColor(tempPlayer2Color)) || tempPlayer2Color.length == 0) {
        if (tempPlayer1Color === "blue") {
            tempPlayer2Color = "red";
        } else {
            tempPlayer2Color = "blue";
        }
    }


    let player1NameSpace = document.querySelector(".leftPlayerColumn h2");
    let player2NameSpace = document.querySelector(".rightPlayerColumn h2");

    player1NameSpace.innerText = tempPlayer1Name;
    player2NameSpace.innerText = tempPlayer2Name;

    player1NameSpace.style.backgroundColor = tempPlayer1Color;
    player2NameSpace.style.backgroundColor = tempPlayer2Color;

    if (isPlayerOneTurn) {
        player1NameSpace.style.opacity = 0.75;
        player2NameSpace.style.opacity = 0.25;
    } else {
        player1NameSpace.style.opacity = 0.25;
        player2NameSpace.style.opacity = 0.75;
    }


    arrPlayers[0] = new player(tempPlayer1Name, tempPlayer1Color);
    arrPlayers[1] = new player(tempPlayer2Name, tempPlayer2Color);


    generateGrid(3);
}




//Shamelessly stolen from https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
function isColor(strColor) {
    var s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
}