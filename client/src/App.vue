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
  @font-face {
    font-family: 'Raleway';
    src: url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap');
  }
  font-family: 'Raleway','Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
