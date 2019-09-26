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

  const checkWin = (grid, player) => {
    const plays = grid.reduce((a, e, i) => ((e === player.piece) ? a.concat(i) : a), []);
    let gameWon = null;
    for (const [, win] of winCombos.entries()) {
      if (win.every(element => plays.indexOf(element) > -1)) {
        gameWon = { indexes: win, player };
        break;
      }
    }
    return gameWon;
  };

  const checkTie = (board) => {
    let gameTie = null;
    if (board.emptySquares().length === 0) {
      gameTie = { indexes: Array.from(Array(9).keys()) };
    }
    return gameTie;
  };

  const checkWinOrTie = (board, player) => {
    const gameWon = checkWin(board.grid, player);
    const gameTie = checkTie(board);
    if (gameWon || gameTie) {
      uiController.gameOver(gameWon || gameTie);
      return true;
    }
    return false;
  };

  const turn = (board, positionId, player) => {
    board.updateBoard(positionId, player.piece);
    uiController.displayPosition(positionId, player);
    if (checkWinOrTie(board, player)) {
      return 'gameend';
    }
    return 'continue';
  };

  return { turn, checkWin };
})();
