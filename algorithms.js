function backtracker(m, n) {
  let maze = new MazeMatrix(m, n);

  let random_i = Math.floor(Math.random() * ((m - 2) / 2)) * 2 + 1;
  let random_j = Math.floor(Math.random() * ((n - 2) / 2)) * 2 + 1;
  maze.jumpTo(random_i, random_j);
  maze.dig(0);

  let visited = [];
  do {
    let digSuccess = false;

    let directions = [1, 2, 3, 4];
    while (directions.length != 0) {
      let dir = directions[Math.floor(Math.random() * directions.length)];
      if (maze.canDig(dir) == 1) {
        visited.push([maze.pos_i, maze.pos_j]);
        maze.dig(dir);
        digSuccess = true;
        break;
      }
      directions.splice(directions.indexOf(dir), 1);
    }

    if (digSuccess == false) {
      let lastVisited = visited.pop();
      maze.jumpTo(lastVisited[0], lastVisited[1]);
    }
  } while (visited.length != 0);
  return maze.matrix;
}
