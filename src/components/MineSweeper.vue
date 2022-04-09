<template>
  <div class="flex flex-col items-center h-[100vh] bg-blue-300 text-[5vmin]">
    <div class="flex justify-center items-center h-[8vh]">
      <div @click="newGame" class="flex aspect-square h-[80%] shadow-md bg-blue-400 rounded-md justify-center items-center text-white">
        <FontAwesomeIcon :icon="dead ? deadIcon() : aliveIcon()"></FontAwesomeIcon>
      </div>
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
  data() {
    return {
      deadIcons: [
        'face-dizzy', 
        'skull-crossbones',  
        'skull'
      ],
      aliveIcons: [
        'face-smile',
        'face-laugh-beam',
        'face-laugh-squint'
      ],
      dead: false,
    }
  },
  computed: {
    gridColumns() {
      let colLength = this.minefield.field[0]?.length;
      return `grid grid-cols-${colLength}`;
    },
  },
  methods: {
    onGameOver () {
      this.dead = true;
    },
    newGame () {
      this.minefield.newField();
      this.dead = false;
    },    
    deadIcon() {
      return this.deadIcons[Math.floor((Math.random()*this.deadIcons.length))];
    },
    aliveIcon() {
      return this.aliveIcons[Math.floor((Math.random()*this.aliveIcons.length))];
    }
  },

}
</script>
<style scoped>

</style>