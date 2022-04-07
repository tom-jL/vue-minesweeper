<template >
  <div @click="reveal" 
  :class="[textColor, revealed ? 'shadow-inner' : 'border-[1px]']"
  class="select-none aspect-square flex justify-center items-center  shadow-blue-600 border-blue-300 bg-blue-50 text-[5vmin]">
    <span v-if="revealed && number != '*'" 
    class="leading-none">{{ number }}</span>
    <FontAwesomeIcon v-if="revealed && number == '*'" icon="bomb"></FontAwesomeIcon>
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
      revealed: false,
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
    number() {
      return this.minefield.flatField[this.index];
    },
    textColor() {
      if(this.number=='*') return 'text-black';
      return this.colors[this.number];
    }
  },
  methods :{
    reveal () {
      if(this.number == 0) {
        this.$emit('revealBlock');
        return;
      }
      if(this.number == '*') { 
        this.$emit('gameover');
        return;
      }
      this.revealed = true;
    }
  }

  
}
</script>
<style scoped>
  
</style>