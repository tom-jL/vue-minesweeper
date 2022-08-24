<template>
  <div class="flex flex-col text-[5vmin]">
    <div id="grid" :class="gridColumn" class="max-h-[90vmin] mx-auto mt-[10vmin] relative gap-[0px] bg-white shadow-xl shadow-blue-300">
      <div class="absolute flex w-full z-[100] my-2 justify-between place-items-stretch bottom-[100%]">
        <MineScores :scores="scores" class="" />
        <MineButton class="" :toggle="tripped" @press="newGame"/>
        <MineTimer @cleared="onCleared" class="" />
      </div>
      <MineCell 
        v-for="(cell, index) in minefield.flatField"
        :key="index"
        :index="index"
      />
    </div>
  </div>
  <Teleport to="#grid">
    <MineToast 
      :show="showClear"
      message="You swept all the mines!"
      icon="trophy"
      class="text-yellow-300"
      />
  </Teleport>
  <Teleport to="#grid">
    <MineToast 
      :show="showTrip"
      message="You tripped on a mine!"
      icon="explosion"
      class="text-red-500"
      />
  </Teleport>
</template>
<script>
import useMinefield from '@/stores/minefield'
import MineCell from '@/components/MineCell.vue'
import MineButton from '@/components/MineButton.vue'
import MineToast from '@/components/MineToast.vue'
import MineTimer from '@/components/MineTimer.vue'
import MineScores from '@/components/MineScores.vue'
export default {
  name: "MineSweeper",
  components: { MineCell, MineButton, MineToast, MineTimer, MineScores },
  setup() {
    const minefield = useMinefield();
    minefield.newField();
    return { minefield }
  },
  data() {
    return {
      showTrip: false,
      showClear: false,
      scores: [],
      gridColumns: {
        8: 'grid-cols-8',
        16: 'grid-cols-16',
        32: 'grid-cols-32',
      },
    }
  },
  mounted() {
    if(localStorage.scores !== undefined){
      this.scores = JSON.parse(localStorage.scores);
    }
  },
  computed: {
    gridColumn() {
      let rowLength = this.minefield.field[0]?.length;
      // let colLength = this.minefield.field.length;
      return `grid ${this.gridColumns[rowLength]}`;
    },
    cleared() {
      return this.minefield.cleared;
    },
    tripped() {
      return this.minefield.tripped;
    },
  },
  watch: {
    cleared(clear){
      if(clear) {
        this.showClear = true;
        setTimeout(()=>{
          this.showClear = false;
        }, 2000);
      }
    },
    tripped(tripped) {
      if(tripped) {
        this.showTrip = true;
        setTimeout(()=>{
        this.showTrip = false;
      }, 2000);
      }

    }
  },
  methods: {
    newGame () {
      this.showTrip = false;
      this.showClear = false;
      this.minefield.newField();
    },
    onCleared (time) {
      this.scores.push(time)
      localStorage.scores = JSON.stringify(this.scores);
    }
  },

}
</script>
<style scoped>
</style>