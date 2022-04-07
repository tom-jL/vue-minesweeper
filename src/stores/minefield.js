import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'

export const minefield = defineStore('minefield', {
  state: () => ({
    /* @type {number[][]} */
    field: [],
    /* @type {number[]} */
    levels: [8,16,32],
  }),
  getters: {
    /**
     * Returns a flattened (1D) field.
     * 
     * @returns {number[]}
     */
    flatField(state) {
      return state.field.flat()
    },
  },
  actions: {
    /**
     * Creates a new field and randomly plants mines in that field.
     * @param {number} level 
     */
    newField(level = 0) {
      let field = new Array(this.levels[level]*1.5).fill(new Array(this.levels[level]));
      let mines = (field.length * field[0].length)/8;
      while(mines) {
        let row = Math.floor((Math.random()*field.length));
        let col = Math.floor((Math.random()*field[0].length));
        if(field[row][col] == null){
          field[row][col] = "*";
          --mines;
        }
      }
      for(let row =0; row<field.length; row++){
        for(let col = 0; col<field[0].length; col++) {
          if (field[row][col] !== "*") {
            field[row][col] = this.getBlock(row, col, field).filter(x => x === "*").length;
          }
        }
      }
      this.field = cloneDeep(field);
    },
    /**
     * Returns the surrounding cells of a cell in a field.
     * @param {number} row
     * @param {number} col 
     * @param {number[][]} field
     * @returns {number[]}
     */
    getBlock(row, col, field) {
      let block = [];
      for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
          try{
            if(!(x==0 && y==0)){
              block.push(field[row+x][col+y]);
            }
          // eslint-disable-next-line no-empty
          } catch(err){}
        }
      }
      return block;
    }
  }
});