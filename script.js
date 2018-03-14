// Variable declarations and assignment
const squares = document.querySelectorAll('.square');
const computer = document.querySelector('.computer');
const reset = document.querySelector('.reset');

const humanMark = 'X';
const compMark = 'O';

const winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Set up the game board in memory
var oBoard = Array.from(Array(9).keys());

// Event listeners
for(let e of squares) {
	e.addEventListener('click', handleClick);
}

reset.addEventListener('click', resetBoard);

// Functions
function resetBoard() {
  reset.style.gridColumn = '';
  computer.style.display = '';
  oBoard = Array.from(Array(9).keys());
  
  for(let e of squares) {
    e.innerText = '';
    e.style.backgroundColor = 'white';
  }

  squares.forEach(x => x.addEventListener('click', handleClick));
}

function handleClick(square) {
  if (typeof oBoard[square.target.id] == 'number') {
    turn(square.target.id, humanMark)
    if (!checkWin(oBoard, humanMark) && !checkTie()) {
      turn(bestPlay(), compMark)
    }
  }
}

function turn(squareId, player) {
  computer.style.display = 'none';
  reset.style.gridColumn = 'span 3';
  oBoard[squareId] = player;
  
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(oBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winMatrix.entries()) {
    if (win.every(elm => plays.indexOf(elm) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winMatrix[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player == humanMark ? "red" : "blue";
  }
  declareWinner(gameWon.player == humanMark ? "You Win!" : "You lose!")
  
  squares.forEach(x => x.removeEventListener('click', handleClick));
}

function checkTie(board) {
  if(emptySquares().length == 0) {
    for(let i of squares) {
      i.style.backgroundColor = 'green';
      i.removeEventListener('click', handleClick)
    }
    declareWinner("It's a tie!")
    return true;
  }
  return false;
}

function emptySquares() {
  return oBoard.filter(s => typeof s == 'number')
}

function bestPlay() {
  return emptySquares()[0]
}

function declareWinner(whoWon) {
  console.log(whoWon)
}