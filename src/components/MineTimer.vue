<template>
  <div class="flex aspect-[2/1] h-[80%] shadow-inner bg-blue-400 rounded-md items-center select-none text-[3vh] text-white justify-evenly">
    <!-- {{ now }} -->
    <FontAwesomeIcon
      icon="stopwatch">
    </FontAwesomeIcon>
    {{ minutes }}:{{ seconds }}
  </div>
</template>
<script>
import useMinefield from '@/stores/minefield'
export default {
  setup() {
    const minefield = useMinefield();
    return { minefield }
  },
  name: "MineTimer",
  data() {
    return {
      time: null,
      timer: null,
    }
  },
  mounted() {
    this.reset();
  },
  computed: {
    seconds() {
      return (this.time%60).toString().padStart(2, '0');
    },
    minutes() {
      return (parseInt(this.time/60)%60).toString().padStart(2, '0');
    },
    hours() {
      return parseInt(this.time/(60*60))%24;
    },
    trippedOrCleared() {
      return this.minefield.tripped || this.minefield.cleared;
    },
    field() {
      return this.minefield.field;
    }
  },
  watch: {
    trippedOrCleared(bool){
      if(bool) {
        clearInterval(this.timer);
        if(this.minefield.cleared) {
          this.$emit('cleared', this.time);
        }
      } else {
        this.reset();
      }
    },
    field() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.time = 0;
      clearInterval(this.timer);
      this.timer = setInterval(this.tick, 1000)
    },
    tick() {
      ++this.time;
    }
  }
}
</script>
<style scoped>
  
</style>