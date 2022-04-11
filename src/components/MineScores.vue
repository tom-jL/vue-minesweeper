<template>
  <div class="text-[3vh] h-[80%] aspect-[2/1] z-20">
    <div @click="toggle" class="flex h-full shadow-xl bg-blue-400 rounded-md items-center select-none text-white justify-evenly p-1">
    <FontAwesomeIcon
      icon="ranking-star">
    </FontAwesomeIcon>
    </div>
    <!-- Dropdown menu -->
    <div
    :class="showScores ? 'visible' : 'hidden'" 
    class=" w-100% bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
          <li class="flex p-1">
            <span class=""><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <span class="m-auto">05:05</span>
          </li>
          <li class="flex p-1">
            <span class=""><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <span class="m-auto">05:05</span>
          </li>
          <li class="flex p-1">
            <span class=""><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <span class="m-auto">05:05</span>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "MineScores",
  data() {
    return {
      showScores: false
    }
  },
  methods: {
    toggle() {
      this.showScores = !this.showScores;
    }
  }
}
</script>
<style>
  
</style>