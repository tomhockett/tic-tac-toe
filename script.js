// Variable declarations and assignment
const squares = document.querySelectorAll('.square')
const computer = document.querySelector('.computer')
const reset = document.querySelector('.reset')

const humPlayer = 'X'
const compPlayer = 'O'

const winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Set up the game board in memory
var oBoard = Array.from(Array(9).keys())

// Event listeners
for (let e of squares) {
  e.addEventListener('click', handleClick)
}

computer.addEventListener('click', computerTurn)
reset.addEventListener('click', resetBoard)

// Functions
function resetBoard() {
  reset.style.gridColumn = ''
  computer.style.display = ''
  oBoard = Array.from(Array(9).keys())

  for (let e of squares) {
    e.innerText = ''
    e.style.backgroundColor = 'white'
  }

  squares.forEach(x => x.addEventListener('click', handleClick))
}

function computerTurn() {
  if (typeof oBoard[4] == 'number') {
    turn(oBoard[4], compPlayer)
  } else {
    turn(bestPlay(), compPlayer)
  }
}

function handleClick(square) {
  if (typeof oBoard[square.target.id] == 'number') {
    turn(square.target.id, humPlayer)
    if (!checkWin(oBoard, humPlayer) && !checkTie(oBoard)) {
      turn(bestPlay(), compPlayer)
    }
  }
}

function turn(squareId, player) {
<<<<<<< HEAD
  computer.style.display = 'none'
  reset.style.gridColumn = 'span 3'
  oBoard[squareId] = player

  document.getElementById(squareId).innerText = player
  let gameWon = checkWin(oBoard, player)
  if (gameWon) gameOver(gameWon)
=======
  computer.style.display = 'none';
  reset.style.gridColumn = 'span 3';
  oBoard[squareId] = player;
  
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(oBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie(oBoard);
>>>>>>> 80c415639d45cc6d2ffef90f87e6c79e1a7e69d2
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), [])
  let gameWon = null
  for (let [index, win] of winMatrix.entries()) {
    if (win.every(elm => plays.indexOf(elm) > -1)) {
      gameWon = { index: index, player: player }
      break
    }
  }
  return gameWon
}

function gameOver(gameWon) {
  for (let index of winMatrix[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player ==
      humPlayer
      ? 'red'
      : 'blue'
  }
  declareWinner(gameWon.player == humPlayer ? 'You Win!' : 'You lose!')

  squares.forEach(x => x.removeEventListener('click', handleClick))
}

function checkTie(board) {
  if (emptySquares().length == 0) {
    for (let i of squares) {
      i.style.backgroundColor = 'yellow'
      i.removeEventListener('click', handleClick)
    }
    declareWinner('It\'s a tie!')
    return true
  }
  return false
}

function emptySquares() {
  return oBoard.filter(s => typeof s == 'number')
}

function bestPlay() {
  return minMax(oBoard, compPlayer).index
}

function declareWinner(whoWon) {
  console.log(whoWon)
}

function minMax(nBoard, player) {
  let availSpots = emptySquares()

  if (checkWin(nBoard, humPlayer)) {
    return { score: -10 }
  } else if (checkWin(nBoard, compPlayer)) {
    return { score: 10 }
  } else if (availSpots.length === 0) {
    return { score: 0 }
  }

  let moves = []
  for (var i = 0; i < availSpots.length; i++) {
    let move = {}
    move.index = nBoard[availSpots[i]]
    nBoard[availSpots[i]] = player

    if (player == compPlayer) {
      let result = minMax(nBoard, humPlayer)
      move.score = result.score
    } else {
      let result = minMax(nBoard, compPlayer)
      move.score = result.score
    }

    nBoard[availSpots[i]] = move.index

    moves.push(move)
  }

  let bestMove
  if (player === compPlayer) {
    let bestScore = -10000
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }

  return moves[bestMove]
}
