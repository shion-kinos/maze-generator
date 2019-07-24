var context = maze.getContext("2d");


var binMaze;


document.querySelector("#cell-width-selector").addEventListener("change", drawSqrMaze);
document.querySelector("#wall-thickness-selector").addEventListener("change", drawSqrMaze);


function drawSqrMaze() {
  if (typeof binMaze === "undefined") {
    console.warn("Maze is not defined")
    return;
  }

  var maze = document.querySelector("#maze");

  var outerDims = binMaze[0].length;
  var innerDims = (outerDims - 1) / 2;

  var unit = parseInt(document.querySelector("#cell-width-selector").value);
  var wall = document.querySelector("input[name='wall-thickness']:checked").value == "thin" ? 2 : unit;
  var whiteBorder = document.querySelector("input[name='wall-thickness']:checked").value == "thin" ? unit : 0;

  maze.width = innerDims * unit + (innerDims + 1) * wall + whiteBorder * 2;
  maze.height = maze.width;

  context.clearRect(0, 0, maze.width, maze.height);

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, maze.width, maze.height);

  context.fillStyle = "#000000";
  for (i = 0; i < outerDims; i++) {
    for (j = 0; j < outerDims; j++) {
      if (i == 0 && j == 1 || i == outerDims - 1 && j == outerDims - 2) continue; // entrace and exit
      if (binMaze[i][j] != 0) {
        var unitWidth = j % 2 == 0 ? wall : unit;
        var unitHeight = i % 2 == 0 ? wall : unit;
        var start_j = Math.floor(j / 2) * unit + Math.floor((j + 1) / 2) * wall + whiteBorder;
        var start_i = Math.floor(i / 2) * unit + Math.floor((i + 1) / 2) * wall + whiteBorder;
        context.fillRect(start_j, start_i, unitWidth, unitHeight);
      }
    }
  }
}


function generate() {
  var innerDims = parseInt(document.querySelector("#maze-dims").value);
  var outerDims = innerDims * 2 + 1;

  binMaze = backtracker(outerDims);

  drawSqrMaze();
}
