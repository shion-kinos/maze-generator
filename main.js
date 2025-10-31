let mazeCanvas = document.querySelector("#maze-canvas");
let context = mazeCanvas.getContext("2d");

let generateButton = document.querySelector("#generate");
let scaleOption = document.querySelector("#scale-option");
let pathTypeOption = document.querySelector("#path-type-option");
let style = document.querySelector("#style");
let wallThicknessOption = document.querySelector("#wall-thickness-option");
let pathWidthOption = document.querySelector("#path-width-option");
let imageBackgroundOption = document.querySelector("#image-background-option");
let solutionButton = document.querySelector("#solution");

let maze = new Maze();


generateButton.addEventListener("click", generate);
scaleOption.addEventListener("change", draw);
pathTypeOption.addEventListener("change", switchStyle);
wallThicknessOption.addEventListener("change", draw);
pathWidthOption.addEventListener("change", draw);
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
  if (style.innerText === lang.walls) {
    wall = scale * document.querySelector("input[name='wall-thickness']:checked").value;
    cell = scale * 6 - wall;
  } else if (style.innerText === lang.paths) {
    cell = scale * document.querySelector("input[name='path-width']:checked").value;
    wall = scale * 6 - cell;
  }
  let inverted = style.innerText === lang.paths;
  let imageBackground = document.querySelector("input[name='image-background']:checked").value === "opaque";
  let showSolution = solutionButton.innerText === lang.showSolution ? false : true;
  maze.draw(cell, wall, inverted, imageBackground, showSolution);
}
function switchStyle() {
  if (style.innerText === lang.walls) {
    let checkedValue = document.querySelector("input[name='wall-thickness']:checked").value;
    document.querySelector(`input[name='path-width'][value="${checkedValue}"]`).checked = true;
    style.innerText = lang.paths;
    wallThicknessOption.hidden = true;
    pathWidthOption.hidden = false;
  } else if (style.innerText = lang.paths) {
    let checkedValue = document.querySelector("input[name='path-width']:checked").value;
    document.querySelector(`input[name='wall-thickness'][value="${checkedValue}"]`).checked = true;
    style.innerText = lang.walls;
    pathWidthOption.hidden = true;
    wallThicknessOption.hidden = false;
  }
  draw();
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
