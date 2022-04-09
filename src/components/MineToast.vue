<template>
  <Transition name="toast">
    <div v-if="show" class="flex toast-mask transition-all justify-center items-center">
      <div class="toast-wrapper">
        <div class="flex items-center w-full max-w-xs p-4 space-x-4 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
          <FontAwesomeIcon class="w-5 h-5 dark:text-blue-500" :icon="icon"></FontAwesomeIcon>
          <div class="select-none text-gray-500 pl-4 text-sm font-normal">{{ message }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: 'MineToast',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Insert message here.'
    },
    show: Boolean,
    icon: {
      type: String,
      required: false,
      default: 'bread-slice'
    }
  },
}
</script>

<style scoped>
  .toast-mask {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .toast-enter-from {
  opacity: 0;
  }

  .toast-leave-to {
    opacity: 0;
  }

  .toast-enter-from .toast-container,
  .toast-leave-to .toast-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>