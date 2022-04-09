import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'

class Cell {

  constructor(mine = '*') {
    this.mine = mine;
    this.revealed = false;
    this.flagged = false;
  }

  reveal() {
    this.revealed = true;
    this.flagged = false;
  }

  flag() {
    this.flagged = !this.flagged;
  }

}

export default defineStore('minefield', {
  state: () => ({
    /* @type {Object[][]} */
    field: [],
    /* @type {number[]} */
    levels: [8,16,32],
    /* @type Boolean */
    tripped: false,
  }),
  getters: {
    /**
     * Returns a flattened (1D) field.
     * 
     * @returns {Object[]}
     */
    flatField(state) {
      return state.field.flat()
    },
    cleared(state) {
      return state.field.flat().filter((x)=>!x.revealed).length == state.field.flat().filter((x)=>x.mine=='*').length;
    },
  },
  actions: {
    /**
     * Creates a new field and randomly plants mines in that field.
     * @param {number} level 
     */
    newField(level = 0) {
      let field = Array.from({length:this.levels[level]*1.5}, () => (new Array(this.levels[level])).fill(null));
      let mines = Math.floor((field.length * field[0].length)/8);
      while(mines) {
        let row = Math.floor((Math.random()*field.length));
        let col = Math.floor((Math.random()*field[0].length));
        if(field[row][col] == null){
          field[row][col] = new Cell();
          mines--;
        }
      }
      for(let row =0; row<field.length; row++){
        for(let col = 0; col<field[0].length; col++) {
          if (field[row][col] == null) {
            field[row][col] = new Cell(this.getBlock(row, col, field).filter(x => x).filter(x=>x.mine == '*').length);
          }
        }
      }
      this.tripped = false;
      this.field = cloneDeep(field);
    },
    /**
     * Returns the surrounding cells of a cell in a field.
     * @param {number} row
     * @param {number} col 
     * @param {number[][]} field
     * @returns {Object[]}
     */
    getBlock(row, col, field) {
      let block = [];
      for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
          if(!(x==0 && y==0) && field[row+x]?.[col+y] !== undefined){
            block.push(field[row+x][col+y]);
          }
        }
      }
      return block;
    },
    /**
     * Reveals all cells;
     */
    revealAll() {
      this.tripped = true;
      this.flatField.forEach((cell) => {
        cell.reveal();
      });
    },
    /**
     * Reveals all cells surrounding a 0 cell recursively.
     */
    revealBlock(row, col) {
      if(col === undefined){
        col = row % this.field[0].length;
        row = parseInt(row / this.field[0].length);
      }
      for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
          if(this.field[row+x]?.[col+y] !== undefined ){
            if(this.field[row+x][col+y].mine === 0 && !(x == 0 && y == 0) && !this.field[row+x][col+y].revealed) {
                this.revealBlock(row + x, col + y);
            }
            this.field[row+x][col+y].reveal();
          }
        }
      }
    }
  }
});