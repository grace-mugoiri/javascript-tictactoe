/* eslint-env browser */

const uiController = (() => {
  let displayBoard = null;
  let humanPlayer = null;
  let aiPlayer = null;
  // let playerName = null;

  const resetObject = () => {
    displayBoard = gameBoard();
    humanPlayer = player('user', 'O');
    aiPlayer = player('Computer', 'X');
  };
  const colors = Object.freeze({
    win: 'green',
    tie: 'aqua',
    lose: 'red',
  });

  const winStatus = name => ({
    // win: 'You Win!',
    // lose: 'You Lose!',
    win: `${name} win!`,
    lose: 'Computer win!',
    tie: 'Tie Game!',
  });

  const cells = document.querySelectorAll('.cell');

  const resetDisplay = () => {
    document.querySelector('.endgame').style.display = 'none';
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = '';
      cells[i].style.removeProperty('background-color');
    }
  };

  const aiBestSpot = () => bestSpot(displayBoard, humanPlayer, aiPlayer).getSpot();

  const turnClick = (square) => {
    if (displayBoard.validPosition(square.target.id)) {
      if (gameRule.turn(displayBoard, square.target.id, humanPlayer) === 'continue') {
        gameRule.turn(displayBoard, aiBestSpot(), aiPlayer);
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

  const gameOverState = (player) => {
    let message;
    if (player === humanPlayer) {
      message = 'win';
    } else if (player === aiPlayer) {
      message = 'lose';
    } else {
      message = 'tie';
    }
    return message;
  };


  const declareWinner = (who) => {
    document.querySelector('.endgame .text').innerText = who;
    document.querySelector('.endgame').style.display = 'block';
  };

  const gameOver = ({ player, indexes }) => {
    const message = gameOverState(player);
    for (const index of indexes) {
      document.getElementById(index).style.backgroundColor = colors[message];
    }
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick);
    }
    declareWinner(winStatus[message]);
  };

  const getName = () => {
    // reveal the box to ask name
    // if it is not reveal with popup, we should move board more below.
    // get name with button click
    // save name to user's name
    const obj = document.querySelector('.name-input');
    // console.log(obj.value);
    // save
    // winStatus(obj.value).win;
    return obj.value;
  };

  const startGame = () => {
    resetObject();
    getName();
    resetDisplay();
    addClickForEachCell();
  };
  return { startGame, displayPosition, gameOver };
})();

uiController.startGame();
