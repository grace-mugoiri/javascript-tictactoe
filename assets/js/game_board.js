const gameBoard = () => {
  const board = Array.from(Array(9).keys());
  const updateBoard = (piece, position) => {
    board[position] = piece;
  };

  // function emptySquares() {
  //   return originalBoard.filter(cell => typeof cell === 'number');
  // }
  return { board, updateBoard };
};
