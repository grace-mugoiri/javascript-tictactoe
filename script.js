originalBoard = Array.from(Array(9).keys());
const cells = document.querySelectorAll('.cell');
const humanPlayer = 'O';
const aiPlayer = 'X';

function turn(squareId, player) {
	originalBoard[squareId] = document.getElementById(squareId).innerText = player;
};

function turnClick(square) {
	// console.log(square.target.id);
	return turn(square.target.Id, player)

};

function startGame() {
	for (let i = 0; i < 9; i++) {
		document.addEventListener('click', turnClick);
	}
};
startGame();


