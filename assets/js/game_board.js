const gameBoard = () => {
  const grid = Array.from(Array(9).keys());

  const validPosition = position => typeof grid[position] === 'number';

  const updateBoard = (position, piece) => {
    grid[position] = piece;
  };

  const emptySquares = () => grid.filter(cell => validPosition(cell));

  return {
    grid, updateBoard, emptySquares, validPosition,
  };
};
