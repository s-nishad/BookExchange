<template>
  <div>

    <!-- Navbar -->
    <nav class="bg-pink-500 p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div>
          <router-link to="/">
            <img class="h-10 w-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Logo" />
          </router-link>
        </div>
        <!-- Mobile Menu Toggle Button -->
        <button @click="toggleMenu" class="text-white md:hidden hover:text-blue-200 px-4 py-2 rounded focus:outline-none">
          <span class="material-icons">
            menu_open
          </span>
        </button>
        <div class="hidden md:flex space-x-4">
          <!-- home button -->
          <router-link to="/" class="text-white hover:text-blue-200 px-4 py-2 rounded">
            Home
          </router-link>
          <!-- chat button -->
          <router-link to="/explore/messages" class="text-white hover:text-blue-200 px-4 py-2 rounded">
            Messages
          </router-link>
          <!-- profile button -->
          <router-link to="/explore/profile" class="text-white hover:text-blue-200 px-4 py-2 rounded">
            Profile
          </router-link>
        </div>
      </div>
      <!-- Mobile Menu - Show on small screens -->
      <div v-show="showMenu" class="md:hidden">
        <router-link to="/" class="block text-white hover:text-blue-200 px-4 py-2 rounded">
          Home
        </router-link>
        <router-link to="/explore/messages" class="block text-white hover:text-blue-200 px-4 py-2 rounded">
          Messages
        </router-link>
        <router-link to="/explore/profile" class="block text-white hover:text-blue-200 px-4 py-2 rounded">
          Profile
        </router-link>
        <router-link to="/login" class="block text-white hover:text-blue-200 px-4 py-2 rounded">
          Logout
        </router-link>
      </div>
    </nav>

    <!-- main content -->
    <router-view></router-view>

  </div>
</template>


<script setup>
import { ref } from "vue";
const showMenu = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);
</script>

<style></style>