<template>
  <div>
      <header class="bg-blue-600 py-4">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-white">Book Exchange</h1>
          <p class="text-white mt-2">Trade and share books with fellow readers.</p>
          <div class="mt-4">
            <router-link to="/register" class="text-white mr-4">Register</router-link>
            <router-link to="/login" class="text-white">Login</router-link>
          </div>
        </div>
      </header>

      <section class="py-8">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold">Features</h2>
        <div class="flex flex-wrap mt-4">
          <!-- Feature cards -->
          <div class="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-xl font-semibold mb-4">Discover Books</div>
              <p class="text-gray-600">Explore a wide range of books available for exchange.</p>
            </div>
          </div>
          <div class="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-xl font-semibold mb-4">Connect with Readers</div>
              <p class="text-gray-600">Connect with other book enthusiasts and share your favorite reads.</p>
            </div>
          </div>
          <div class="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="text-xl font-semibold mb-4">Easy Exchange</div>
              <p class="text-gray-600">Effortlessly exchange books with just a few clicks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup> 
import { useStore } from 'vuex'

const store = useStore();
</script>

