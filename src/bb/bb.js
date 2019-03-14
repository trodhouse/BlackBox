export default class bb {
  constructor() {
    this.aGrid = new Array(8);
    this.tries = new Array(33);

    for (let x = 0; x < 8; x++) {
      this.aGrid[x] = new Array(8).fill(false);
    }
    this.aGrid[-1] = new Array(8).fill(false);
    this.aGrid[8] = new Array(8).fill(false);

    for (let i = 0; i < 4; i++) {
      let a = Math.floor(Math.random() * 8),
        b = Math.floor(Math.random() * 8);
      if (this.aGrid[a][b]) {
        i--;
      } else {
        this.aGrid[a][b] = true;
      }
    }

    this.directions = {
      up: {
        s: [0, 1, "up", 0, 1],
        d1: [-1, 1, "right", 1, 0],
        d2: [1, 1, "left", -1, 0]
      },
      right: {
        s: [1, 0, "right", 1, 0],
        d1: [1, 1, "down", 0, -1],
        d2: [1, -1, "up", 0, 1]
      },
      left: {
        s: [-1, 0, "left", -1, 0],
        d1: [-1, 1, "down", 0, -1],
        d2: [-1, -1, "up", 0, 1]
      },
      down: {
        s: [0, -1, "down", 0, -1],
        d1: [-1, -1, "right", 1, 0],
        d2: [1, -1, "left", -1, 0]
      }
    };

    for (let i = 1; i <= 32; i++) {
      console.log("trying " + i);
      if (!this.tries[i]) {
        let t = this.test(i);
        this.tries[i] = t;
        if (t > 0) {
          this.tries[t] = i;
        }
      }
    }
  }

  go = x => this.tries[x];

  step = (pos, direction, first) => {
    let check = (pos, move) => {
      return this.aGrid[pos[0] + move[0]][pos[1] + move[1]];
    };

    let move = (pos, move) => [pos[0] + move[3], pos[1] + move[4]];

    const { s, d1, d2 } = direction;
    const c = d => check(pos, d);
    if (!first) {
      if (pos[0] < 0) return 32 - pos[1];
      if (pos[0] > 7) return 9 + pos[1];
      if (pos[1] < 0) return pos[0] + 1;
      if (pos[1] > 7) return 24 - pos[1];
    }
    if (c(s)) return -1;
    if ((first && (c(d1) || c(d2))) || (c(d1) && c(d2))) return 0;
    if (c(d1)) return this.step(move(pos, d1), this.directions[d1[2]]);
    if (c(d2)) return this.step(move(pos, d2), this.directions[d2[2]]);
    return this.step(move(pos, s), direction);
  };

  test = start => {
    let pos, direction;
    if (start <= 8) {
      pos = [start - 1, -1];
      direction = this.directions.up;
    } else if (start <= 16) {
      pos = [8, start - 9];
      direction = this.directions.left;
    } else if (start <= 24) {
      pos = [24 - start, 8];
      direction = this.directions.down;
    } else if (start <= 32) {
      pos = [-1, 32 - start];
      direction = this.directions.right;
    }
    return this.step(pos, direction, true);
  };
}
