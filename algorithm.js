function mazeMatrix(rows, cols) {
  matrix = [];
  for (i = 0; i < rows; i++) {
    matrix.push([]);
    for (j = 0; j < cols; j++) {
      if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
        matrix[i].push(2);
      } else {
        matrix[i].push(1);
      }
    }
  }
  return matrix;
}


class MazeGrid {
  constructor(rows, cols) {
    this.grid = mazeMatrix(rows, cols);
    this.pos_i = 1;
    this.pos_j = 1;
  }
  curr_pos_i() {
    return this.pos_i;
  }
  curr_pos_j() {
    return this.pos_j;
  }
  jumpTo(i, j) {
    this.pos_i = i;
    this.pos_j = j;
  }
  move(theta) {
    this.pos_i = i + (theta == 2 ? 2 : theta == 4 ? -2 : 0);
    this.pos_j = j + (theta == 1 ? 2 : theta == 3 ? -2 : 0);
  }

  /* Directions
    0: current position
    1: right
    2: up
    3: left
    4: down
  */

  check(theta) {
    switch (theta) {
      case 0:
        return this.grid[this.pos_i][this.pos_j];
        break;
      case 1:
        return (
          this.grid[this.pos_i][this.pos_j + 1] == 0 ? -1 :
          this.grid[this.pos_i][this.pos_j + 1] == 1 && this.grid[this.pos_i][this.pos_j + 2] == 0 ? 0 :
          this.grid[this.pos_i][this.pos_j + 1] == 1 && this.grid[this.pos_i][this.pos_j + 2] == 1 ? 1 :
          this.grid[this.pos_i][this.pos_j + 1] == 2 ? 2 : null
        );
        break;
      case 2:
        return (
          this.grid[this.pos_i + 1][this.pos_j] == 0 ? -1 :
          this.grid[this.pos_i + 1][this.pos_j] == 1 && this.grid[this.pos_i + 2][this.pos_j] == 0 ? 0 :
          this.grid[this.pos_i + 1][this.pos_j] == 1 && this.grid[this.pos_i + 2][this.pos_j] == 1 ? 1 :
          this.grid[this.pos_i + 1][this.pos_j] == 2 ? 2 : null
        );
        break;
      case 3:
        return (
          this.grid[this.pos_i][this.pos_j - 1] == 0 ? -1 :
          this.grid[this.pos_i][this.pos_j - 1] == 1 && this.grid[this.pos_i][this.pos_j - 2] == 0 ? 0 :
          this.grid[this.pos_i][this.pos_j - 1] == 1 && this.grid[this.pos_i][this.pos_j - 2] == 1 ? 1 :
          this.grid[this.pos_i][this.pos_j - 1] == 2 ? 2 : null
        );
        break;
      case 4:
        return (
          this.grid[this.pos_i - 1][this.pos_j] == 0 ? -1 :
          this.grid[this.pos_i - 1][this.pos_j] == 1 && this.grid[this.pos_i - 2][this.pos_j] == 0 ? 0 :
          this.grid[this.pos_i - 1][this.pos_j] == 1 && this.grid[this.pos_i - 2][this.pos_j] == 1 ? 1 :
          this.grid[this.pos_i - 1][this.pos_j] == 2 ? 2 : null
        );
        break;
    }
  }
  dig(theta) {
    switch (theta) {
      case 0:
        this.grid[this.pos_i][this.pos_j] = 0;
        break;
      case 1:
        this.grid[this.pos_i][this.pos_j + 2] = this.grid[this.pos_i][this.pos_j + 1] = 0;
        this.pos_j += 2;
        break;
      case 2:
        this.grid[this.pos_i + 2][this.pos_j] = this.grid[this.pos_i + 1][this.pos_j] = 0;
        this.pos_i += 2;
        break;
      case 3:
        this.grid[this.pos_i][this.pos_j - 2] = this.grid[this.pos_i][this.pos_j - 1] = 0;
        this.pos_j -= 2;
        break;
      case 4:
        this.grid[this.pos_i - 2][this.pos_j] = this.grid[this.pos_i - 1][this.pos_j] = 0;
        this.pos_i -= 2;
        break;
    }
  }
}


function backtracker(dims) {
  binMaze = new MazeGrid(dims, dims);

  var random_i = Math.floor(Math.random() * ((dims - 2) / 2)) * 2 + 1;
  var random_j = Math.floor(Math.random() * ((dims - 2) / 2)) * 2 + 1;
  binMaze.jumpTo(random_i, random_j);
  binMaze.dig(0);

  var visited = [];
  do {
    var digSuccess = false;

    var directions = [1, 2, 3, 4];
    while (directions.length != 0) {
      dir = directions[Math.floor(Math.random() * directions.length)];
      if (binMaze.check(dir) == 1) {
        visited.push([binMaze.curr_pos_i(), binMaze.curr_pos_j()]);
        binMaze.dig(dir);
        digSuccess = true;
        break;
      }
      directions.splice(directions.indexOf(dir), 1);
    }

    if (digSuccess == false) {
      var lastVisited = visited.pop();
      binMaze.jumpTo(lastVisited[0], lastVisited[1]);
    }
  } while (visited.length != 0);
  return binMaze.grid;
}
