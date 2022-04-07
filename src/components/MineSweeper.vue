<template>
  <div class="flex flex-col justify-center">
    <div class="self-center w-full max-w-[90vh]  p-4 pb-0">
    </div>
    <div :class="gridColumns" class="self-center w-full max-w-[90vh] grid gap-0 p-4 ">

    </div>
  </div>
</template>
<script>
import useMinefield from '@/stores/minefield'
export default {
  name: "MineSweeper",
  setup() {
    const minefield = useMinefield();
    minefield.newField();
    return { minefield }
  },
  computed: {
    gridColumns() {
      return `grid-cols-${this.minefield.field[0]?.length}`;
    }
  },
  mounted() {
    // this.minefield.newField();
  }
}
</script>
<style scoped>
  
</style>