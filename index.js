const canvas = document.getElementById('canvas').getContext('2d');
let cells = [];
canvas.strokeStyle = '#101010';
canvas.fillStyle = '#202835';

document.getElementById('start').addEventListener('click', () => {
  startGame();
});

const startGame = () => {
  for (let i = 0; i < 64; i++) {
    cells[i] = [];
    for (let j = 0; j < 64; j++) {
      cells[i][j] = 0;
    }
  };

  [
    [1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],[11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],[14, 9],[15, 6],[16, 4],[16, 8],[17, 5],[17, 6],[17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],[22, 4],[22, 5],[23, 2],[23, 6],[25, 1],[25, 2],[25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4],
    // these cells will be random
    [60, 47],[61,47],[62,47],
    [60, 48],[61,48],[62,48],
    [60, 49],[61,49],[62,49],
    [60, 51],[61,51],[62,51],
  ]
  .forEach(cell => {
      cells[cell[0]][cell[1]] = 1;
  });

  updateCells();
}

const updateCells = () => {
  let result = [];
  
  // amount of alive neighbors for a cell
  const _enumNeighbours = (x, y) => {
      let amount = 0;
      
      const _isCellFilled = (x, y) => cells[x] && cells[x][y];
      
      if (_isCellFilled(x-1, y-1)) amount++;
      if (_isCellFilled(x, y-1)) amount++;
      if (_isCellFilled(x+1, y-1)) amount++;
      if (_isCellFilled(x-1, y)) amount++;
      if (_isCellFilled(x+1, y)) amount++;
      if (_isCellFilled(x-1, y+1)) amount++;
      if (_isCellFilled(x, y+1)) amount++;
      if (_isCellFilled(x+1, y+1)) amount++;
      return amount;
  }
  
  cells.forEach((row, x) => {
      result[x] = [];
      row.forEach((cell, y) => {
          let alive = 0;
          let count = _enumNeighbours(x, y);
           cell > 0 ?
              alive = count === 2 || count === 3 ? 1 : 0 :
              alive = count === 3 ? 1 : 0
          result[x][y] = alive;
      });
  });
  
  cells = result;
}
