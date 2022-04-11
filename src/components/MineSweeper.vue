<template>
  <div class="flex flex-col h-[100vh] bg-blue-300 text-[5vmin]">
    <div class="flex h-[8vh] w-[calc(90vh/1.5)] self-center justify-between">
      <MineScores :scores="scores" class="place-self-center" />
      <MineButton class="self-center ml-auto" :toggle="tripped" @press="newGame"/>
      <MineTimer @cleared="onCleared" class="self-center ml-auto" />
    </div>
    <div id="grid" :class="gridColumns" class="place-self-center relative h-[90vh] w-[calc(90vh/1.5)] gap-[0px] bg-white shadow-xl shadow-blue-300">
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
    }
  },
  mounted() {
    if(localStorage.scores !== undefined){
      this.scores = JSON.parse(localStorage.scores);
    }
  },
  computed: {
    gridColumns() {
      let colLength = this.minefield.field[0]?.length;
      return `grid grid-cols-${colLength}`;
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