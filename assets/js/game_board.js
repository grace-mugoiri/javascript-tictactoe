const gameBoard = (() => {
  const grid = null;

  const resetGrid = () => {
    this.grid = Array.from(Array(9).keys());
  };

  const getGrid = () => this.grid;
  const validPosition = position => typeof this.grid[position] === 'number';

  const updateGrid = (position, piece) => {
    this.grid[position] = piece;
  };

  const emptySquares = () => this.grid.filter(cell => validPosition(cell));

  return {
    updateGrid, emptySquares, validPosition, resetGrid, getGrid,
  };
})();
