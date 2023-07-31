<template>
  <div class="flex items-center justify-center h-screen">
    <!-- Wrapper Container -->
    <div class="md:w-3/4 flex flex-col md:flex-row">
      <!-- Text Section -->
      <div class="md:w-1/2 p-8 flex items-center justify-center md:justify-start md:flex-col">
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-semibold mb-4">Welcome!</h2>
          <p class="text-gray-600">
            Let's Explore the Books World! <br>
            Connect with your <br> friends and share your favorite books with.
          </p>
        </div>
      </div>

      <!-- Form Section -->
      <form class="md:w-1/2 max-w-md bg-white shadow-md rounded-lg px-8 py-6 mb-4 flex flex-col items-center" @submit="login">
        <div class="w-full">
          <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>
          <div class="mb-4">
            <!-- Username or Email input -->
            <div>
              <label for="usernameOrEmail" class="sr-only">Username or Email</label>
              <input
                v-model="formData.usernameOrEmail"
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                autocomplete="email username"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username or Email"
              />
            </div>
          </div>
          <div class="mb-4">
            <!-- Password input -->
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                v-model="formData.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="mb-4">
            <!-- login button -->
            <div>
              <button
                :disabled="loading"
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:border-none"
              >
                Login
              </button>
            </div>
          </div>

          <div class="text-center md-4">
            <!-- forgot password? -->
            <router-link
              to="#"
              class="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgotten password?
            </router-link>
          </div>

          <div class="md-4">
            <!-- a border line -->
            <br>
            <div class="border-t border-gray-200"></div>
            <br>
          </div>

          <div class="md-4 text-center">
            <!-- Button to register  -->
            <div class="button">
              <router-link
                to="/register"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create new account
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, computed } from "vue";

const store = useStore();

const formData = reactive({
  username: "",
  email: "",
  password: "",
});

const loading = computed(() => store.state.loading);

const login = async (event) => {
  event.preventDefault();

  const isEmail = formData.usernameOrEmail.includes("@");

  if (isEmail) {
    formData.email = formData.usernameOrEmail;
  } else {
    formData.username = formData.usernameOrEmail;
  }

  if (!formData.usernameOrEmail || !formData.password) {
    alert("Please fill out all fields");
  } else {
    store.dispatch("auth/login", formData);
  }

};
</script>
