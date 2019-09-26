const gameRule = ((displayBoard) => {
  const checkWin = (displayBoard, player) => {

  };
  const turn = (positionId, player) => {
    // put board with player.piece
    const gameWon = checkWin(displayBoard, player);
    if (gameWon) {
      ui_controller.gameOver(gameWon);
    }
  };
})();
