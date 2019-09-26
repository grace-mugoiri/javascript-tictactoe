/* eslint-env browser */

let originalBoard = [];
const cells = document.querySelectorAll('.cell');
const humanPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winStatus = Object.freeze({
  tie: 'Tie Game!',
  win: 'You won!',
  lose: 'You lose.',
});

const colors = Object.freeze({
  tie: 'aqua',
  win: 'green',
  lose: 'red',
});

function declareWinner(who) {
  document.querySelector('.endgame .text').innerText = who;
  document.querySelector('.endgame').style.display = 'block';
}

function gameOver(game) {
  let message;
  if (game.player === humanPlayer) {
    message = 'win';
  } else if (game.player === aiPlayer) {
    message = 'lose';
  } else {
    message = 'tie';
  }
  for (const index of game.indexes) {
    document.getElementById(index).style.backgroundColor = colors[message];
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick);
  }
  declareWinner(winStatus[message]);
}

function checkWin(board, player) {
  const plays = board.reduce((a, e, i) => ((e === player) ? a.concat(i) : a), []);
  let gameWon = null;
  for (const [, win] of winCombos.entries()) {
    if (win.every(element => plays.indexOf(element) > -1)) {
      gameWon = { indexes: win, player };
      break;
    }
  }
  return gameWon;
}

function emptySquares() {
  return originalBoard.filter(cell => typeof cell === 'number');
}

function checkTie() {
  let gameTie = null;
  if (emptySquares().length === 0) {
    gameTie = { indexes: Array.from(Array(9).keys()) };
  }
  return gameTie;
}

function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  const gameWon = checkWin(originalBoard, player);
  if (gameWon) {
    gameOver(gameWon);
    return 'endgame';
  }
  return '';
}

function minimax(newBoard, player) {
  const availSpots = emptySquares();

  if (checkWin(newBoard, player)) {
    return { score: -10 };
  }
  if (checkWin(newBoard, aiPlayer)) {
    return { score: 20 };
  }
  if (availSpots.length === 0) {
    return { score: 0 };
  }
  const moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    const move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === aiPlayer) {
      const result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      const result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function bestSpot() {
  return minimax(originalBoard, aiPlayer).index;
}

function turnClick(square) {
  if (typeof originalBoard[square.target.id] === 'number') {
    const response = turn(square.target.id, humanPlayer);
    if (response !== 'endgame') {
      const gameTie = checkTie();
      if (gameTie) {
        gameOver(gameTie);
      } else {
        turn(bestSpot(), aiPlayer);
      }
    }
  }
}

function startGame() {
  document.querySelector('.endgame').style.display = 'none';
  originalBoard = Array.from(Array(9).keys());
  for (let i = 0; i < 9; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick);
  }
}

startGame();
