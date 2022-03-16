import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Game Of Life';
  field: boolean[][] = [];
  rowCount = 5;
  colCount = 10;
  round = 1;
  maxRounds = 10;
  speed = 1000;
  live = false;

  ngOnInit() {
    this.setupField();
  }

  setupField(indices?: number[][]) {
    this.round = 1;
    this.field = [];
    for (let i = 0; i < this.rowCount; i++) {
      let row: boolean[] = [];
      for (let i = 0; i < this.colCount; i++) {
        row.push(false);
      }
      this.field.push(row)
    }
    if (indices) {
      for (let i = 0; i < indices.length; i++) {
        for (let j = 0; j < indices[i].length; j++) {
          this.switchState(i, indices[i][j]);
        }
      }
    }
  }

  switchState(row: number, col: number) {
    if (this.live == false)
      this.field[row][col] = !this.field[row][col];
  }

  start() {
    this.live = true;
    this.play();
  }

  stop() {
    this.live = false;
  }

  play() {
    if (this.live)
      setTimeout(() => {
        this.nextGeneration();
        this.round++;
        if (this.round < this.maxRounds) {
          this.play();
        }
      }, this.speed);
  }

  setupGosperGliderGun() {
    this.rowCount = 26;
    this.colCount = 38;
    this.maxRounds = 40;
    this.speed = 100;
    let indices = [
      [],
      [25],
      [23, 25],
      [13, 14, 21, 22, 35, 36],
      [12, 16, 21, 22, 35, 36],
      [1, 2, 11, 17, 21, 22],
      [1, 2, 11, 15, 17, 18, 23, 25],
      [11, 17, 25],
      [12, 16],
      [13, 14],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];
    this.setupField(indices);
  }

  setupSailors() {
    this.rowCount = 13;
    this.colCount = 60;
    this.maxRounds = 40;
    this.speed = 100;
    let indices = [
      [],
      [],
      [],
      [],
      [4, 5, 6, 7, 13, 14, 15, 16, 17, 23, 24, 25, 26, 27, 28],
      [3, 7, 12, 17, 22, 28],
      [7, 17, 28],
      [3, 6, 12, 16, 22, 27],
      [14, 24, 25],
      [],
      [],
      [],
      []
    ];
    this.setupField(indices);
  }

  nextGeneration() {
    let nextGeneration: boolean[][] = [];
    for (let i = 0; i < this.field.length; i++) {
      let nextRow: boolean[] = [];
      for (let j = 0; j < this.field[i].length; j++) {
        let amountAliveNeighbours = this.countAliveNeighbours(i, j);
        nextRow[j] = (amountAliveNeighbours == 2 && this.field[i][j]) || amountAliveNeighbours == 3;
      }
      nextGeneration[i] = nextRow;
    }
    this.field = nextGeneration;
  }

  private countAliveNeighbours(y: number, x: number): number {
    let amountAliveNeighbours = 0;
    let rowLowerLimit = y == 0 ? 0 : y - 1;
    let rowUpperLimit = y == this.field.length - 1 ? this.field.length - 1 : y + 1;
    let colLowerLimit = x == 0 ? 0 : x - 1
    let colUpperLimit = x == this.field[0].length - 1 ? this.field[0].length - 1 : x + 1;
    for (let i = rowLowerLimit; i <= rowUpperLimit; i++) {
      for (let j = colLowerLimit; j <= colUpperLimit; j++) {
        if (this.field[i][j] && !(i == y && j == x)) amountAliveNeighbours++;
      }
    }
    return amountAliveNeighbours;
  }

}
