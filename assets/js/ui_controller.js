const uiController = (() => {
  let displayBoard = null;
  let humanPlayer = null;
  let aiPlayer = null;

  const resetObject = () => {
    displayBoard = gameBoard();
    humanPlayer = player('user', 'O');
    aiPlayer = player('Computer', 'X');
  };

  const resetDisplay = () => {
    // .endgame display none
    // each cell text empty
    // each cell background color remove
  };

  const turnClick = () => {
    // valid?
    // turn user
    // // turn ai
  };

  const addClickForEachCell = () => {
    // for each cell click add
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

  const declareWinner = () => {

  };

  const gameOver = ({ player, indexes }) => {
    const state = gameOverState(player);
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
})();

uiController.startGame();
