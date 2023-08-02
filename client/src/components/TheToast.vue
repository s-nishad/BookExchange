<script setup>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

const store = useStore();

const toastOptions = computed(() => store.state.toast);
const isToastVisible = ref(false);

watch(
  toastOptions,
  (newValue) => {
    if (newValue.message) {
      isToastVisible.value = true;
      setTimeout(() => (isToastVisible.value = false), 5000); // Hide the toast after 5 seconds
    }
  },
  { immediate: true }
);
</script>

<template>
  <transition name="fade-up">
    <div v-if="isToastVisible" class="toast fixed top-3 left-1/2 transform -translate-x-1/2">
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
  </transition>
</template>

<style scoped>
.toast {
  z-index: 9999;
}
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

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s;
}

.fade-up-enter,
.fade-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
