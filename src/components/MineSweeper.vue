<template>
  <div class="flex flex-col items-center h-[100vh] bg-blue-300">
    <div class="self-center h-[8vh] pb-0">
    </div>
    <div :class="gridColumns" class="h-[90vh] w-[calc(90vh/1.5)] gap-[0px] bg-white shadow-xl shadow-blue-300">
      <MineCell 
        v-for="(cell, index) in minefield.flatField"
        :key="index"
        :index="index"
        @gameOver="onGameOver"
      />
    </div>
  </div>
</template>
<script>
import useMinefield from '@/stores/minefield';
import MineCell from '@/components/MineCell.vue'
export default {
  name: "MineSweeper",
  components: { MineCell },
  setup() {
    const minefield = useMinefield();
    minefield.newField();
    return { minefield }
  },
  computed: {
    gridColumns() {
      let colLength = this.minefield.field[0]?.length;
      return `grid grid-cols-${colLength}`;
    }
  },
  methods: {
    onGameOver () {
      
    }
  },

}
</script>
<style scoped>

</style>