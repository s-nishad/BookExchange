<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-pink-500 p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Logo"
          />
        </div>
        <div>
          <!-- home button -->
          <router-link
            to="/"
            class="text-white hover:text-blue-200 px-4 py-2 rounded"
          >
            Home
          </router-link>
          <!-- explore button -->
          <router-link
            to="/explore"
            class="text-white hover:text-blue-200 px-4 py-2 rounded"
          >
            Explore
          </router-link>
          <!-- profile button -->
          <router-link
            to="/explore/profile"
            class="text-white hover:text-blue-200 px-4 py-2 rounded"
          >
            Profile
          </router-link>
          <!-- router link name logut + icon -->
          <router-link
            to="/login"
            class="text-white hover:text-blue-200 px-4 py-2 rounded"
          >
            <ion-icon name="log-out-outline"> </ion-icon> Logout
          </router-link>
        </div>
      </div>
    </nav>

    <!-- main content -->
    <router-view></router-view>
  </div>
</template>


<script setup>
import { ref } from "vue";
</script>

<style>
</style>