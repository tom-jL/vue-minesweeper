<template >
  <div @click="reveal" 
  :class="[textColor, revealed ? 'shadow-inner' : 'border-[1px] shadow-md']"
  class="select-none aspect-square flex justify-center items-center  shadow-blue-600 border-blue-300 bg-blue-50 text-[5vmin]">
    <span v-if="revealed && mine != '*'" 
    class="leading-none">{{ mine }}</span>
    <FontAwesomeIcon v-if="revealed && mine == '*'" icon="bomb"></FontAwesomeIcon>
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
      ]
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
      console.log(this.minefield.flatField[this.index])
      return this.minefield.flatField[this.index];
    },
    mine() {
      return this.cell.mine;
    },
    revealed() {
      return this.cell.revealed;
    },
    textColor() {
      if(this.mine =='*') return 'text-black';
      return this.colors[this.mine];
    }
  },
  methods :{
    reveal () {
      if(this.mine == 0) {
        return;
      }
      if(this.mine == '*') { 
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