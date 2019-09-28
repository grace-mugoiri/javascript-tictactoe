/* eslint-env browser */

const uiController = (() => {
  let humanPlayer = null;
  let aiPlayer = null;
  let playerName = null;

  const colors = Object.freeze({
    win: 'aqua',
    tie: '#aed581',
    lose: '#ef5350',
  });

  const createPlayer = () => {
    humanPlayer = player(playerName, 'O');
    aiPlayer = player('Computer', 'X');
  };

  const cells = document.querySelectorAll('.cell');

  const resetResultDisplay = () => {
    document.querySelector('.endgame').style.display = 'none';
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = '';
      cells[i].style.removeProperty('background-color');
    }
  };

  const aiBestSpot = () => bestSpot(gameBoard.getGrid(), humanPlayer, aiPlayer).getSpot();

  const turnClick = (square) => {
    if (gameBoard.validPosition(square.target.id)) {
      if (gameRule.turn(square.target.id, humanPlayer) === 'continue') {
        gameRule.turn(aiBestSpot(), aiPlayer);
      }
    }
  };

  const displayPosition = (squareId, { piece }) => {
    document.getElementById(squareId).innerText = piece;
  };

  const addClickForEachCell = () => {
    for (let i = 0; i < 9; i++) {
      cells[i].addEventListener('click', turnClick);
    }
  };

  const declareWinner = (player) => {
    const innerText = player ? `${player.name} Win` : 'Game Tie!';
    document.querySelector('.endgame .text').innerText = innerText;
    document.querySelector('.endgame').style.display = 'block';
  };

  const getColors = (player) => {
    let color;
    if (player === humanPlayer) {
      color = colors.win;
    } else if (player === aiPlayer) {
      color = colors.lose;
    } else {
      color = colors.tie;
    }
    return color;
  };

  const gameOver = ({ indexes, player }) => {
    for (const index of indexes) {
      document.getElementById(index).style.backgroundColor = getColors(player);
    }
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick);
    }
    declareWinner(player);
  };

  const getName = () => {
    playerName = document.querySelector('.name-input').value;
    return playerName !== '';
  };

  const askNameReveal = () => {
    document.querySelector('.name-input-box').style.display = 'block';
  };

  const askNameHide = () => {
    document.querySelector('.name-input-box').style.display = 'none';
    document.querySelector('.name-input').value = '';
  };

  const refreshPlayer = () => {
    playerName = '';
    askNameReveal();
    resetResultDisplay();
  };

  const startGame = () => {
    gameBoard.resetGrid();
    resetResultDisplay();
    if (!playerName) {
      if (!getName()) return;
      askNameHide();
      createPlayer();
    }
    addClickForEachCell();
  };

  return {
    startGame, displayPosition, gameOver, askNameReveal, refreshPlayer,
  };
})();

uiController.askNameReveal();
