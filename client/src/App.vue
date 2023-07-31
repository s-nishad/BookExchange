<script setup>
import { useStore } from 'vuex';
import  TheLoading  from './components/TheLoading.vue';
import Thetoast from './components/TheToast.vue';
import { computed } from 'vue';

const store = useStore();

const isLoading = computed(() => store.state.loading);
const toastShow = computed(() => store.state.toast.show);


</script>

<template>
  <div class="parent">
    <TheLoading v-show="isLoading"/>
    <Thetoast v-show="toastShow"/>
    <router-view></router-view>
  </div>
</template>

<style>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
