<template lang="">
  <div 
    @mousedown.left="press" 
    @mouseup.left="unpress" 
    :class="[pressed ? 'shadow-inner' : 'shadow-xl']" 
    class="flex aspect-square bg-blue-400 rounded-md justify-center items-center text-white p-1">
    <FontAwesomeIcon
      :class="[pressed ? 'translate-y-[-1px]' : '']" 
      class="bg-blend-normal" 
      :icon="toggle ? deadIcon : aliveIcon">
    </FontAwesomeIcon>
  </div>
</template>
<script>
export default {
  name: 'MineButton',
  props: {
    toggle: {
      type: Boolean,
      required: true,
    }
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
      pressed: false,
    }
  },
  computed: {
    deadIcon() {
      return this.deadIcons[Math.floor((Math.random()*this.deadIcons.length))];
    },
    aliveIcon() {
      return this.aliveIcons[Math.floor((Math.random()*this.aliveIcons.length))];
    }
  },
  methods: {
    press() {
      this.pressed = true;
      setTimeout(()=> {
        this.pressed = false;
      }, 1000);
    },
    unpress() {
      this.pressed = false;
      this.$emit('press');
    }
  }
}
</script>
<style lang="">
  
</style>