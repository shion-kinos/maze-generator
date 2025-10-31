let mazeCanvas = document.querySelector("#maze-canvas");
let context = mazeCanvas.getContext("2d");

let generateButton = document.querySelector("#generate");
let scaleOption = document.querySelector("#scale-option");
let pathTypeOption = document.querySelector("#path-type-option");
let lineThicknessOption = document.querySelector("#line-thickness-option");
let imageBackgroundOption = document.querySelector("#image-background-option");
let solutionButton = document.querySelector("#solution");

let maze = new Maze();


generateButton.addEventListener("click", generate);
scaleOption.addEventListener("change", draw);
pathTypeOption.addEventListener("change", draw);
lineThicknessOption.addEventListener("change", draw);
imageBackgroundOption.addEventListener("change", draw);
solutionButton.addEventListener("click", solve);


function generate() {
  let rows = parseInt(document.querySelector("#maze-rows").value);
  let cols = parseInt(document.querySelector("#maze-cols").value);
  if (isNaN(rows) || isNaN(cols)) {
    console.warn("Invalid dimensions");
    return;
  }
  maze.generate(rows, cols);
  solutionButton.innerText = lang.showSolution;
  draw();
}
function draw() {
  if (typeof maze.maze === "undefined") return;
  let scale = parseInt(scaleOption.value);
  let cell;
  let wall;
  if (document.querySelector("input[name='path-type']:checked").value === "roads") {
    wall = scale * document.querySelector("input[name='line-thickness']:checked").value;
    cell = scale * 6 - wall;
  } else if (document.querySelector("input[name='path-type']:checked").value === "railways") {
    cell = scale * document.querySelector("input[name='line-thickness']:checked").value;
    wall = scale * 6 - cell;
  }
  let inverted = document.querySelector("input[name='path-type']:checked").value === "railways";
  let imageBackground = document.querySelector("input[name='image-background']:checked").value === "white";
  let showSolution = solutionButton.innerText === lang.showSolution ? false : true;
  maze.draw(cell, wall, inverted, imageBackground, showSolution);
}
function solve() {
  if (maze.solved === false) {
    maze.solve();
  }
  solutionButton.innerText = solutionButton.innerText === lang.showSolution ? lang.hideSolution : lang.showSolution;
  draw();
}


function favicon() {
  maze = new Maze(
    [
      [2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2],
      [2, 0, 1, 1, 1, 1, 1, 0, 1, 0, 2],
      [2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2],
      [2, 0, 1, 0, 1, 1, 1, 1, 1, 0, 2],
      [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2]
    ]
  );
  maze.draw(16, 8, false, 8, false);
}
