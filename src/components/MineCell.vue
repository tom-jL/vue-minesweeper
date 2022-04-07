<template >
  <div class="select-none aspect-square flex justify-center items-center border-2 border-gray-500">
    <span class="text-black ">{{ number }}</span>
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
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  computed: {
    number() {
      return this.minefield.flatField[this.index];
    }
  }

  
}
</script>
<style scoped>
  
</style>