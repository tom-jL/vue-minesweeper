<template>
  <Transition name="toast">
    <div v-if="show" class="flex toast-mask transition-all  justify-center items-center">
      <div class="toast-wrapper">
        <div class="flex items-center w-full max-w-xs p-4 space-x-4 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
          <FontAwesomeIcon class="w-5 h-5 dark:text-blue-500" :icon="icon"></FontAwesomeIcon>
          <div class="select-none text-gray-500 pl-4 text-sm font-normal">{{ message }}</div>
          <button @click="$emit('close')" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
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
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
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