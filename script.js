// Variable declarations and assignment
const squares = document.querySelectorAll('.square');
const computer = document.querySelector('.computer');
const reset = document.querySelector('.reset');

const humanMark = 'X';
const compMark = 'O';

const winMatrix = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let state = [0,0,0,0,0,0,0,0,0];
var game = true;

// Event listeners
squares.forEach(e => {
	e.addEventListener('click', handleClick);
})

reset.addEventListener('click', resetBoard);

// Functions
function resetBoard() {
  reset.style.gridColumn = '';
  computer.style.display = '';
  
  squares.forEach(e => {
    e.innerText = '';
  })
}

function handleClick(square) {
  turn(square.target.id, humanMark)
}

function turn(squareId, player) {
  document.getElementById(squareId).innerText = player;
}

// function humanTurn(square) {
//   computer.style.display = 'none';
//   reset.style.gridColumn = 'span 3';

//   square.target.innerText = humanMark;
//   console.log(square.target.id);
// }