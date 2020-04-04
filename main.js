let mazeCanvas = document.querySelector("#maze-canvas");
let context = mazeCanvas.getContext("2d");

let generateButton = document.querySelector("#generate");
let sizeOption = document.querySelector("#size-option");
let wallThicknessOption = document.querySelector("#wall-thickness-option");
let backgroundOption = document.querySelector("#background-option");
let solutionButton = document.querySelector("#solution");

let maze = new Maze();


generateButton.addEventListener("click", generate);
sizeOption.addEventListener("change", draw);
wallThicknessOption.addEventListener("change", draw);
backgroundOption.addEventListener("change", draw);
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
  let size = parseInt(sizeOption.value);
  let wall = size * document.querySelector("input[name='wall-thickness']:checked").value;
  let cell = size * 6 - wall;
  let background = document.querySelector("input[name='background']:checked").value === "opaque";
  let showSolution = solutionButton.innerText === lang.showSolution ? false : true;
  maze.draw(cell, wall, background, showSolution);
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
