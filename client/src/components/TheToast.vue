<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const toastOptions = computed(() => store.state.toast);

</script>

<template>
  <div class="toast fixed top-3 left-0 w-full flex items-center justify-center">
    <div
      :class="[
        'toast-box bg-white shadow-md rounded-md border-2 px-4 py-2',
        toastOptions.type === 'error'
          ? 'border-red-600'
          : toastOptions.type === 'success'
          ? 'border-green-600'
          : 'border-sky-600',
      ]"
    >
      <p class="toast-message">{{ toastOptions.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.toast-box {
  animation: fade-up 0.5s ease-in-out;
}
@keyframes fade-up {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>