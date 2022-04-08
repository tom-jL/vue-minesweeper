<template >
  <div @click="reveal" 
  :class="[textColor, revealed ? 'z-0' : 'z-10 shadow-md border-b-[1px] border-l-[1px]']"
  class="select-none aspect-square overflow-hidden flex justify-center items-center border-blue-300 shadow-blue-500 bg-blue-50 text-[5vmin]">
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
      if(this.mine =='*') return 'text-black';
      return this.colors[this.mine];
    },
  },
  methods :{
    reveal () {
      if(this.revealed || this.flagged){ return }
      if(this.mine == 0) {
        this.minefield.revealBlock(this.index);
        return;
      }
      if(this.mine == '*') {
        this.minefield.revealAll(); 
        this.$emit('gameOver');
        return;
      }
      this.cell.reveal();
    },
    flag () {
      this.cell.flag();
    }
  }

  
}
</script>

<style scoped>

</style>