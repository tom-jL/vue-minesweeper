<template >
  <div @mousedown.left="flag" @mouseup.left="reveal" 
  :class="[textColor, revealed ? 'z-0' : 'z-10', shadow]"
  class="select-none aspect-square overflow-hidden flex justify-center items-center shadow-blue-500 bg-blue-50">
    <div v-if="revealed && mine != '*'" 
    class="leading-none">{{ mine }}</div>
    <FontAwesomeIcon v-if="revealed && mine == '*'" icon="bomb"></FontAwesomeIcon>
    <FontAwesomeIcon v-if="!revealed && flagged" icon="flag"></FontAwesomeIcon>
    
  </div>
</template>
<script>
import useMinefield from '@/stores/minefield'
export default {
  name: "MineCell",
  setup() {
    const minefield = useMinefield();
    return { minefield }
  },
  data() {
    return {
      colors: [
        'text-gray-500',
        'text-blue-500',
        'text-green-500',
        'text-red-500',
        'text-blue-900',
        'text-purple-500'
      ],
      flagging: setTimeout(0),
      wasFlagged: false,
      clicked: false,
    }
  },
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  computed: {
    cell() {
      return this.minefield.flatField[this.index];
    }, 
    mine() {
      return this.cell.mine;
    },
    flagged() {
      return this.cell.flagged;
    },
    revealed() {
      return this.cell.revealed;
    },
    textColor() {
      if(this.flagged) return this.colors[3];
      if(this.mine =='*') return 'text-black';
      return this.colors[this.mine];
    },
    shadow() {
      if(!this.revealed) {
        return this.clicked ? 'z-0' : 'cell-shadow';
      }
      return '';
    }
  },
  methods :{
    reveal () {
      if(this.minefield.tripped || this.minefield.cleared) {
        return;
      }
      this.clicked = false;
      clearTimeout(this.flagging);
      if(this.revealed || this.flagged){ 
        return;
      }
      if(this.wasFlagged) {
        this.wasFlagged = false;
        return;
      }
      if(this.mine == 0) {
        this.minefield.revealBlock(this.index);
        return;
      }
      if(this.mine == '*') {
        this.minefield.revealAll(); 
        return;
      }
      this.cell.reveal();
    },
    flag () {
      if(this.minefield.tripped || this.minefield.cleared) {
        return;
      }
      this.clicked = true;
      if(this.revealed) return;
      this.flagging = setTimeout(()=>{
        this.wasFlagged = true;
        this.clicked = false;
        this.cell.flag()
        }, 600);
    }
  }

  
}
</script>

<style scoped>
  .cell-shadow {
    box-shadow: 3px 3px 9px 0px #3f83f8;
  }
</style>