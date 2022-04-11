<template>
  <div class="text-[3vh] h-[80%] aspect-[2/1] z-20">
    <div @mouseenter="toggle" @mouseleave="toggle" class="flex h-full shadow-xl bg-blue-400 rounded-md items-center select-none text-white justify-evenly p-1">
      <FontAwesomeIcon
        icon="ranking-star">
      </FontAwesomeIcon>
    </div>
    <!-- Dropdown menu -->
    <div
    :class="showScores ? 'visible' : 'hidden'" 
    class=" w-100% bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
        <ul class="py-1 mt-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
          <li v-if="scores.length == 0" class="flex pl-4 py-2">
            <span class="">No minefields cleared!</span>
          </li>
          <li v-for="(score, index) in scoresSorted" :key="index" class="flex pl-4 py-2">
            <span :class="rankingColor[index]" class="w-4"><FontAwesomeIcon v-if="index<3" icon="trophy"></FontAwesomeIcon></span>
            <span class="m-auto">{{ minutes(score) }}:{{ seconds(score) }}</span>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "MineScores",
  props: {
    scores: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      showScores: false,
      rankingColor: [
        'text-yellow-300',
        'text-slate-400',
        'text-amber-800'
      ]
    }
  },
  computed: {
    scoresSorted() {
      return (new Int32Array(this.scores)).sort();
    }
  },
  methods: {
    toggle() {
      this.showScores = !this.showScores;
    },
    seconds(score) {
      return (score%60).toString().padStart(2, '0');
    },
    minutes(score) {
      return (parseInt(score/60)%60).toString().padStart(2, '0');
    },
  }
}
</script>
<style>
  
</style>