<template>
  <div class="flex flex-col items-center h-[100vh] overflow-hidden">
    <div class="self-center h-[10vh] p-4 pb-0">
    </div>
    <div :class="gridColumns" class="w-[calc(90vh/1.5)] gap-0 p-4">
      <MineCell 
        v-for="(number, index) in minefield.flatField"
        :key="index"
        :index="index"
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
  mounted() {
    // this.minefield.newField();
  }
}
</script>
<style scoped>

</style>