let mazeCanvas = document.querySelector("#maze-canvas");
let context = mazeCanvas.getContext("2d");

let cellWidthOption = document.querySelector("#cell-width-option");
let wallThicknessOption = document.querySelector("#wall-thickness-option");
let borderOption = document.querySelector("#border-option");

let maze;


cellWidthOption.addEventListener("change", draw);
wallThicknessOption.addEventListener("change", draw);
borderOption.addEventListener("change", draw);


function generate() {
  let rows = parseInt(document.querySelector("#maze-rows").value);
  let cols = parseInt(document.querySelector("#maze-cols").value);
  maze = new Maze();
  maze.generate(rows, cols);
  maze.draw();
}

function draw() {
  if (typeof maze === "undefined") {
    console.warn("Maze is not defined")
    return;
  } else maze.draw();
}

class Maze {
  constructor(matrix) {
    this.maze = matrix;
  }
  generate(rows, cols, algorithm = backtracker) {
    this.maze = algorithm(rows * 2 + 1, cols * 2 + 1);
  }
  draw(
    cell = parseInt(cellWidthOption.value),
    wall = document.querySelector("input[name='wall-thickness']:checked").value == "thin" ? 2 : cell,
    border = borderOption.checked ? cell : 0
    ) {
    let m = this.maze.length;
    let n = this.maze[0].length;
    let rows = (m - 1) / 2;
    let cols = (n - 1) / 2;

    mazeCanvas.width = cols * cell + (cols + 1) * wall + border * 2;
    mazeCanvas.height = rows * cell + (rows + 1) * wall + border * 2;

    context.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, mazeCanvas.width, mazeCanvas.height);

    context.fillStyle = "#000000";
    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        if (i == 0 && j == 1 || i == m - 1 && j == n - 2) continue;
        if (this.maze[i][j] != 0) {
          let wallWidth = j % 2 == 0 ? wall : cell;
          let wallLength = i % 2 == 0 ? wall : cell;
          let x = Math.floor(j / 2) * cell + Math.floor((j + 1) / 2) * wall + border;
          let y = Math.floor(i / 2) * cell + Math.floor((i + 1) / 2) * wall + border;
          context.fillRect(x, y, wallWidth, wallLength);
        }
      }
    }
  }
}
