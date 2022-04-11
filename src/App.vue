<template>
  <MineSweeper />
</template>

<script>
import MineSweeper from "@/components/MineSweeper.vue"

export default {
  name: 'App',
  components: {
    MineSweeper
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
