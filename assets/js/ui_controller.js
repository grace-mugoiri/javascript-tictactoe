const uiController = (() => {
  let displayBoard = null;
  let humanPlayer = null;
  let aiPlayer = null;

  const resetObject = () => {
    displayBoard = gameBoard();
    humanPlayer = player('user', 'O');
    aiPlayer = player('Computer', 'X');
	};
	const colors = Object.freeze({
		win : 'green',
		tie : 'aqua',
		lose : 'red',
	});

	const winStatus = Object.freeze({
		win : 'You Win!',
		tie : 'Tie Game!',
		lose : 'You Lose!',
	});

	const cells = document.querySelectorAll('.cell');

  const resetDisplay = () => {

    // .endgame display none
    // each cell text empty
    // each cell background color remove
	};

	const bestSpot = () => {
		return displayBoard.emptySquares()[0];
	};

  const turnClick = (square) => {
		// if (typeof displayBoard[square.target.id] === 'number') {
			// valid check?
			gameRule.turn(displayBoard, square.target.id, humanPlayer);
			console.log(square.target.id)
		// };
    // valid?
		// turn user

		// turn ai
		// turn(bestSpot(), aiPlayer);

	};

	const displayPosition = (squareId, {piece}) => {
		document.getElementById(squareId).innerText = piece;

	};

  const addClickForEachCell = () => {
		// for each cell click add
		for (let i=0; i < 9; i++){
		cells[i].addEventListener('click', turnClick);
		};
  };

  const gameOverState = (player) => {
    let message;
    if (game.player === humanPlayer) {
      message = 'win';
    } else if (game.player === aiPlayer) {
      message = 'lose';
    } else {
      message = 'tie';
    }
    return message;
	};


  const declareWinner = (who) => {
		document.querySelector('.endgame .text').innerText = who;
		document.querySelector('.endgame').style.display = "block";
  };

  const gameOver = ({ player, indexes }) => {
		const message = gameOverState(player);
		for (const index of game.indexes) {
			document.getElementById(index).style.backgroundColor = colors[message];
		}
		for (let i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', turnClick);
		}
		declareWinner(winStatus);
    // backgroundColor setting
    // remove click
    // declareWinner
  };

  const startGame = () => {
    resetObject();
    // ask name
    resetDisplay();
    addClickForEachCell();
	};
	return {startGame, displayPosition};

})();

uiController.startGame();
