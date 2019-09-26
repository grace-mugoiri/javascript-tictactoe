const gameRule = (() => {
	const winCombos = Object.freeze([
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]);

  const checkWin = (board, player) => {
		const plays = board.reduce((a, e, i) => ((e === player.piece) ? a.concat(i) : a), []);
		console.log(plays, player);
		let gameWon = null;
		for (const [, win] of winCombos.entries()) {
			if (win.every(element => plays.indexOf(element) > -1)) {
				gameWon = { indexes: win, player };
				console.log(gameWon);
				break;
			}
		}
		return gameWon;
  };
  const turn = (board, positionId, player) => {
		// put board with player.piece
		console.log(board);
		board.updateBoard(positionId, player.piece)
		uiController.displayPosition(positionId, player);
    const gameWon = checkWin(board.board, player);
    if (gameWon) {
      uiController.gameOver(gameWon);
		}

	};

	const checkTie = () => {
		let gameTie = null;
		if (board.emptySquares().length === 0) {
			gameTie = { indexes: Array.from(Array(9).keys()) };
		}
		return gameTie;
	};

	return {turn}
})();




