let mazeCanvas = document.querySelector("#maze-canvas");
let context = mazeCanvas.getContext("2d");

let generateButton = document.querySelector("#generate");
let cellWidthOption = document.querySelector("#cell-width-option");
let wallThicknessOption = document.querySelector("#wall-thickness-option");
let borderOption = document.querySelector("#border-option");
let solutionButton = document.querySelector("#solution");

let maze = new Maze();


generateButton.addEventListener("click", generate);
cellWidthOption.addEventListener("change", draw);
wallThicknessOption.addEventListener("change", draw);
borderOption.addEventListener("change", draw);
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
  let cell = parseInt(cellWidthOption.value);
  let wall = document.querySelector("input[name='wall-thickness']:checked").value === "thin" ? cell / 6 : cell;
  let border = borderOption.checked ? cell : 0;
  let showSolution = solutionButton.innerText === lang.showSolution ? false : true;
  maze.draw(cell, wall, border, showSolution);
}
function solve() {
  if (maze.solved === false) {
    maze.solve();
  }
  solutionButton.innerText = solutionButton.innerText === lang.showSolution ? lang.hideSolution : lang.showSolution;
  draw();
}
