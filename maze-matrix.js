function newMazeMatrix(m, n) {
  let matrix = [];
  for (i = 0; i < m; i++) {
    matrix.push([]);
    for (j = 0; j < n; j++) {
      if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
        matrix[i].push(2);
      } else {
        matrix[i].push(1);
      }
    }
  }
  return matrix;
}


/* Directions
  0: current position
  1: right
  2: up
  3: left
  4: down
*/


class MazeMatrix {
  constructor(m, n) {
    this.matrix = newMazeMatrix(m, n);
    this.pos_i = 1;
    this.pos_j = 1;
  }
  jumpTo(i, j) {
    this.pos_i = i;
    this.pos_j = j;
  }
  move(theta, d = 2) {
    this.pos_i += (theta == 2 ? d : theta == 4 ? -d : 0);
    this.pos_j += (theta == 1 ? d : theta == 3 ? -d : 0);
  }

  check(theta, d) {
    switch(theta) {
      case 0:
        return this.matrix[this.pos_i][this.pos_j];
        break;
      case 1:
        return this.matrix[this.pos_i][this.pos_j + d];
        break;
      case 2:
        return this.matrix[this.pos_i + d][this.pos_j];
        break;
      case 3:
        return this.matrix[this.pos_i][this.pos_j - d];
        break;
      case 4:
        return this.matrix[this.pos_i - d][this.pos_j];
        break;
    }
  }
  canDig(theta) {
    return (
      this.check(theta, 1) == 0 ? -1 :
      this.check(theta, 1) == 1 && this.check(theta, 2) == 0 ? 0 :
      this.check(theta, 1) == 1 && this.check(theta, 2) == 1 ? 1 :
      this.check(theta, 1) == 2 ? 2 : null
    );
  }
  dig(theta) {
    switch (theta) {
      case 0:
        this.matrix[this.pos_i][this.pos_j] = 0;
        break;
      case 1:
        this.matrix[this.pos_i][this.pos_j + 2] = this.matrix[this.pos_i][this.pos_j + 1] = 0;
        this.pos_j += 2;
        break;
      case 2:
        this.matrix[this.pos_i + 2][this.pos_j] = this.matrix[this.pos_i + 1][this.pos_j] = 0;
        this.pos_i += 2;
        break;
      case 3:
        this.matrix[this.pos_i][this.pos_j - 2] = this.matrix[this.pos_i][this.pos_j - 1] = 0;
        this.pos_j -= 2;
        break;
      case 4:
        this.matrix[this.pos_i - 2][this.pos_j] = this.matrix[this.pos_i - 1][this.pos_j] = 0;
        this.pos_i -= 2;
        break;
    }
  }
}
