const bestSpot = (board, humanPlayer, aiPlayer) => {
  const minimax = (newBoard, player) => {
    const availSpots = board.emptySquares();

    if (gameRule.checkWin(newBoard, player)) {
      return { score: -10 };
    }
    if (gameRule.checkWin(newBoard, aiPlayer)) {
      return { score: 20 };
    }
    if (availSpots.length === 0) {
      return { score: 0 };
    }
    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player.piece;

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
  };
  const getSpot = () => minimax(board.grid, aiPlayer).index;
  return { getSpot };
};
