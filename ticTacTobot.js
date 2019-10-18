let gridSize = 3
// let flagPlayerTurn = true; //Not AI Turn;

let allGames = [];
let arrPossibleGamesObj = [];
let arrWinningGamesObj = [];
let arrDrawingGamesObj = [];
let arrLosingGamesObj = [];

let arrSelector = 1;

let isSetupDone = false;

let lastMove = [];

class possibleGame {
    arrOfMoves = [];
    constructor(arrOfMoves, outcome) {
        this.arrOfMoves = arrOfMoves;
        this.outcome = outcome;
    }
}

// let temp = generateBotGrid(3);

function botPlay(playerMovedXCoord = -1, playerMovedYCoord = -1) {

    lastMove = [];
    lastMove.push(Number(playerMovedXCoord), Number(playerMovedYCoord));
    if (!isSetupDone) {
        runIt();
        if (turnsPlayed === 0) {
            arrSelector = 1;
        }
        isSetupDone = true;
        getBestNextMove();
    } else {
        //what is this for
        // console.log(arrLosingGamesObj[0].arrOfMoves);
    }
    cleanUpArrays();
    // console.log(lastMove);
    let nextMove = getBestNextMove();
    // console.log(nextMove);

    botpick(nextMove);

    lastMove = [];
    lastMove = nextMove.slice();

    cleanUpArrays();
    lastMove = [];

}


//This needs to select only elements in the array starting with the last move and then remove that last move.
function cleanUpArrays() {
    cleanSpecificArray(arrWinningGamesObj);
    cleanSpecificArray(arrLosingGamesObj);
    cleanSpecificArray(arrDrawingGamesObj);

}

function cleanSpecificArray(arrToBeCleaned) {
    tempArr = [];
    // console.log(arrToBeCleaned[0].arrOfMoves[0]);
    for (let pos = 0; pos < arrToBeCleaned.length; pos++) {

        if (arrToBeCleaned[pos].arrOfMoves[0][0] === lastMove[0] && arrToBeCleaned[pos].arrOfMoves[0][1] === lastMove[1]) {
            //tempArr.push(arrToBeCleaned[pos]);
            let tolog = arrToBeCleaned[pos].arrOfMoves.shift();
            tempArr.push(new possibleGame(arrToBeCleaned[pos].arrMovesMade, arrToBeCleaned[pos].outcome));
        }
    }
    // debugger
    arrToBeCleaned = JSON.parse(JSON.stringify(tempArr));
}


function botpick(buttonToClick) {
    // console.log(buttonToClick);

    let docSpot = document.querySelectorAll('.cols');
    // console.log(docSpot);

    for (let pos = 0; pos < docSpot.length; pos++) {
        if (docSpot[pos].dataset.row == buttonToClick[0] && docSpot[pos].dataset.column == buttonToClick[1]) {
            docSpot[pos].style.backgroundColor = "Yellow";
            docSpot[pos].value = 'o';
        }
    }
}


function getBestNextMove() {
    let moveBeingReturned;
    if (arrSelector == 1 && arrWinningGamesObj.length != 0) {
        moveBeingReturned = arrWinningGamesObj[0].arrOfMoves[0];
    } else if (arrSelector === -1 && arrLosingGamesObj.length != 0) {
        moveBeingReturned = arrLosingGamesObj[0].arrOfMoves[0];
    } else if (arrDrawingGamesObj.length != 0) {
        moveBeingReturned = arrDrawingGamesObj[0].arrOfMoves[0];
    } else {
        //return random remaining square?
    }

    return moveBeingReturned;
}

//For now only do three by three //FOREVER ONLY DO 3by3
function generateBotGrid(num = gridSize) {
    let tempArr = [];

    for (let y = 0; y < num; y++) {
        for (let x = 0; x < num; x++) {
            tempArr.push([y, x]);
        }
    }
    return tempArr;
}

function startHere(previousMove = [-1, -1], arrPossibleMoves = [], arrMovesMade = []) {

    let CopyOfArrPossibleMoves = arrPossibleMoves.slice();
    let funcCopyOfArrMovesMade = arrMovesMade.slice();

    let lastMoveIndex = CopyOfArrPossibleMoves.findIndex(ele => {
        if (ele[0] === previousMove[0] && ele[1] === previousMove[1]) {
            return ele;
        }
    });

    //If No moves have been made 
    if (lastMoveIndex === -1) {
        let testCoord = Math.floor(Math.sqrt(CopyOfArrPossibleMoves.length) / 2);
        previousMove = [testCoord, testCoord];
        lastMoveIndex = CopyOfArrPossibleMoves.findIndex(ele => {
            if (ele[0] === previousMove[0] && ele[1] === previousMove[1]) {
                return ele;
            }
        });
    }

    funcCopyOfArrMovesMade.push(CopyOfArrPossibleMoves[lastMoveIndex]);
    CopyOfArrPossibleMoves = CopyOfArrPossibleMoves.slice(0, lastMoveIndex).concat(CopyOfArrPossibleMoves.slice(lastMoveIndex + 1));

    if (CopyOfArrPossibleMoves.length !== 0) {
        for (let pos = 0; pos < CopyOfArrPossibleMoves.length; pos++) {
            startHere(CopyOfArrPossibleMoves[pos], CopyOfArrPossibleMoves, funcCopyOfArrMovesMade);
        }
    } else {
        allGames.push(funcCopyOfArrMovesMade.slice());
    }
}


function sortGames() {
    arrPossibleGamesObj.forEach(ele => {
        if (ele.outcome === 1) {
            arrWinningGamesObj.push(ele);
        } else if (ele.outcome === 0) {
            arrDrawingGamesObj.push(ele);
        } else {
            arrLosingGamesObj.push(ele);
        }
    });
    arrWinningGamesObj.sort((a, b) => a.arrOfMoves.length - b.arrOfMoves.length);
    arrLosingGamesObj.sort((a, b) => a.arrOfMoves.length - b.arrOfMoves.length);
    arrPossibleGamesObj = []; //WHY WONT SOMEBODY THINK OF THE RAM
    isSetupDone = true;
}

//TEST CASES FOR assignMoveSetValue

//Testing quick Stop.
// let testCase = [[[1, 1], [1, 0], [0, 1], [2, 0], [2, 1], [0, 0], [1, 2]], []]

//Test Draw
// let testCase = [[[0, 0], [0, 1], [0, 2], [1, 2], [1, 0], [2, 0], [1, 1], [2, 2], [2, 1]], []]

// let testCase = [[[1, 1], [1, 0], [0, 1], [2, 0], [2, 1], [0, 0], [1, 2]], []]


function assignMoveSetValue() {
    for (let moveSetPos = 0; moveSetPos < allGames.length; moveSetPos++) {
        let currentMoveSet = allGames[moveSetPos];

        for (let moveCount = gridSize * 2 - 1; moveCount <= currentMoveSet.length; moveCount++) {
            let currentMoveSetPortion = currentMoveSet.slice(0, moveCount);

            if (botHasWinOccured(currentMoveSetPortion) === true) {
                let outcome = (moveCount % 2 == 0) ? 1 : -1;
                arrPossibleGamesObj.push(new possibleGame(currentMoveSetPortion, outcome))
                break;
            }

            if (moveCount === currentMoveSet.length) {
                arrPossibleGamesObj.push(new possibleGame(currentMoveSetPortion, 0))
            }
        }
    }
    allGames = []; //TASTY TASTY RAM IS NOW AVAILABLE;
    sortGames();
}

//TEST CASES FOR botHasWinOccured 

//COLUMN TRUE
// let testCase = [[1, 1], [1, 0], [0, 1], [2, 0], [2, 1]]

//ROW TRUE
// let testCase = [[1, 1], [0, 1], [1, 0], [2, 0], [1, 2]]

//DIAG FORWARD TRUE
// let testCase = [[1, 1], [1, 0], [2, 2], [2, 0], [0, 0]]

//DIAG REVERSE TRUE
// let testCase = [[0, 2], [1, 0], [1, 1], [2, 1], [2, 0]]

//NO TRUE
// let testCase = [[0, 0], [1, 1], [0, 1], [2, 1], [1, 2]]
//////////////////////


function botHasWinOccured(currentMoveSet) {

    //Stores the x and y coords of the last move made
    let rowCoord = currentMoveSet[currentMoveSet.length - 1][0];
    let colCoord = currentMoveSet[currentMoveSet.length - 1][1];

    let currentPlayersMoves = [];

    //Select Alternating moves
    for (let pos = currentMoveSet.length - 1; pos > -1; pos -= 2) {
        currentPlayersMoves.push(currentMoveSet[pos].slice());
    }

    let flagDiagWin = false;

    //Only check if the point pressed is on the forward diag
    if (rowCoord === colCoord) {
        flagDiagWin = botCheckForwardDiag(currentPlayersMoves);
    }

    //Only check if the point is on the reverse diag
    if (rowCoord + colCoord === gridSize - 1 && !flagDiagWin) {
        flagDiagWin = botCheckReverseDiag(currentPlayersMoves);
    }

    //Standard Check run every time
    if (botCheckRow(rowCoord, currentPlayersMoves) || botCheckColumn(colCoord, currentPlayersMoves) || flagDiagWin) {
        return true;
    }
    return false;
}

function botCheckColumn(colToCheck, moveSet) {
    let count = 0;
    for (let pos = 0; pos < moveSet.length; pos++) {
        if (moveSet[pos][1] == colToCheck) {
            count++;
        }
    }
    return (count === gridSize);
}

function botCheckRow(rowToCheck, moveSet) {
    let count = 0;
    for (let pos = 0; pos < moveSet.length; pos++) {
        if (moveSet[pos][0] === rowToCheck) {
            count++;
        }
    }
    return (count === gridSize);
}

function botCheckForwardDiag(moveSet) {
    let count = 0;
    for (let pos = 0; pos < moveSet.length; pos++) {
        if (moveSet[pos][0] === moveSet[pos][1]) {
            count++;
        }
    }
    return (count === gridSize);
}

function botCheckReverseDiag(moveSet) {
    let count = 0;
    for (let pos = 0; pos < moveSet.length; pos++) {
        if (moveSet[pos][0] + moveSet[pos][1] === gridSize - 1) {
            count++;
        }
    }
    return (count === gridSize);
}


function runIt() {
    startHere(lastMove, generateBotGrid())
    assignMoveSetValue();
}

function botGameOver() {
    arrWinningGamesObj = [];
    arrDrawingGamesObj = [];
    arrLosingGamesObj = [];
}