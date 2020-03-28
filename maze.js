class Maze {
  constructor(matrix) {
    if (matrix) {
      this.maze = new MazeMatrix();
      this.maze.matrix = matrix;
      this.m = matrix.length;
      this.n = matrix[0].length;
      this.rows = (this.m - 1) / 2;
      this.cols = (this.n - 1) / 2;
      this.solved = false;
    }
  }
  print() {
    console.log(this.maze.matrix);
  }
  generate(rows, cols, algorithm = backtracker) {
    this.rows = rows;
    this.cols = cols;
    this.m = rows * 2 + 1;
    this.n = cols * 2 + 1;
    this.maze = algorithm(this.m, this.n);
    this.solved = false;

    this.maze.jumpTo(0, 1);
    this.maze.replace(0);
    this.maze.jumpTo(this.m - 1, this.n - 2);
    this.maze.replace(0);
  }
  draw(cell, wall, background, border, showSolution) {
    if (typeof this.maze === "undefined") {
      console.warn("Maze is not defined");
      return;
    }
    if (showSolution === true && this.solved === false) {
      console.warn("Maze is not solved");
      return;
    }

    mazeCanvas.width = this.cols * cell + (this.cols + 1) * wall + border * 2;
    mazeCanvas.height = this.rows * cell + (this.rows + 1) * wall + border * 2;

    if (background === true) {
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, mazeCanvas.width, mazeCanvas.height);
    }

    context.fillStyle = "#000000";
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        switch (this.maze.matrix[i][j]) {
          case 0:
            if (showSolution === true) {
              context.fillStyle = "pink";
              break;
            }
            continue;
          case 4:
            continue;
          default:
            context.fillStyle = "#000000";
        }
        let wallWidth = j % 2 === 0 ? wall : cell;
        let wallLength = i % 2 === 0 ? wall : cell;
        let x = Math.floor(j / 2) * cell + Math.floor((j + 1) / 2) * wall + border;
        let y = Math.floor(i / 2) * cell + Math.floor((i + 1) / 2) * wall + border;
        context.fillRect(x, y, wallWidth, wallLength);
      }
    }
  }
  solve() {
    if (typeof this.maze === "undefined") {
      console.warn("Maze is not defined");
      return;
    }
    if (this.solved === true) {
      console.error("Maze is already solved");
      return;
    }; // If the maze is already solved, it will enter an infinite loop searching for a dead end

    this.deadEnds = [];
    for (let i = 1; i < this.m; i += 2) {
      for (let j = 1; j < this.n; j += 2) {
        if (i === 1 && j === 1 || i === this.m - 2 && j === this.n - 2) continue;
        this.maze.jumpTo(i, j);
        let connections = 0;
        for (let dir = 1; dir <= 4; dir++) {
          if (this.maze.check(dir, 1) === 0) {
            connections += 1;
          }
        }
        if (connections === 1) {
          this.deadEnds.push([i, j]);
          this.maze.replace(4);
        }
      }
    }

    for (let i in this.deadEnds) {
      this.maze.jumpTo(this.deadEnds[i][0], this.deadEnds[i][1]);
      let junction = false;
      while (junction === false) {
        let connections = [];
        if (this.maze.pos_i === 1 && this.maze.pos_j === 1
          || this.maze.pos_i === this.m - 2 && this.maze.pos_j === this.n - 2)
        break;
        for (let dir = 1; dir <= 4; dir++) {
          if (this.maze.check(dir, 1) === 0) {
            connections.push(dir);
          }
        }
        if (connections.length === 1) {
          this.maze.replace(4);
          this.maze.move(connections[0], 1);
          this.maze.replace(4);
          this.maze.move(connections[0], 1);
        } else if (connections.length > 1) {
          junction = true;
        }
      }
    }

    this.solved = true;
  }
}
