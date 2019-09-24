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
	win: 'blue',
	lose: 'red',
});

function gameOver(gameWon) {
	
}

function checkWin(board, player) {
	let gameWon = null;
	for(const [index, win] of winCombos.entries()) {
		if (win.every(element => element === player)) {
			gameWon = { index, player };
			break;
		}
	}
	return gameWon;
}

function declareWinner(who) {
	document.querySelector('.endgame .text').innerText = who;
	document.querySelector('.endgame').style.display = 'block';
}

function emptySquares() {
	return originalBoard.filter(cell => typeof cell === 'number');
}

function checkTie() {
	if(emptySquares().length === 0) {
		for (let i = 0; i < 9; i++) {
			cells[i].style.backgroundColor = colors['tie'];
			cells[i].removeEventListener('click', turnClick);
		}
		declareWinner(winStatus[tie]);
		return true;
	}
	return false;
}

function turn(squareId, player) {
	originalBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	gameWon = checkWin(originalBoard, player);
	if (gameWon) gameOver(gameWon);
};

function turnClick(square) {
	if (typeof originalBoard[square.target.id] === 'number') {
		turn(square.target.id, humanPlayer);
		if(!checkTie()) {
			turn(bestSpot(), aiPlayer);
		}
	}
};

function startGame() {
	document.querySelector('.endgame').style.display = 'none';
	originalBoard = Array.from(Array(9).keys());
	for (let i = 0; i < 9; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		document.addEventListener('click', turnClick);
	}
};
startGame();
