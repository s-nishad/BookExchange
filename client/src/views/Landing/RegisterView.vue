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
      <form class="md:w-1/2 max-w-md bg-white shadow-md rounded-lg px-8 py-6 mb-4 flex flex-col items-center" @submit="register">
        <div class="w-full">
          <h2 class="text-2xl font-semibold mb-4 text-center">Register</h2>
          <div class="mb-4">
            <!-- fullname input -->
            <div>
              <label for="fullname" class="sr-only">Fullname</label>
              <input
                v-model="formData.fullname"
                id="fullname"
                name="fullname"
                type="text"
                autocomplete="fullname"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Fullname"
              />
            </div>
          </div>
          <div class="mb-4">
            <!-- email input -->
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                v-model="formData.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
          </div>
          <div class="mb-4">
            <!-- department name selection -->
            <div>
              <label for="department" class="sr-only">Department</label>
              <select
                v-model="formData.department"
                id="department"
                name="department"
                autocomplete="department"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              >
                <option value="" disabled selected>Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Industrial Engineering">Industrial Engineering</option>
                <option value="Architecture">Architecture</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Economics">Economics</option>
                <option value="Political Science">Political Science</option>
                <option value="International Relations">International Relations</option>
                <option value="Law">Law</option>
                <option value="Psychology">Psychology</option>
                <option value="Sociology">Sociology</option>
                <option value="History">History</option>
                <option value="Philosophy">Philosophy</option>
                <option value="English Language and Literature">English Language and Literature</option>
                <option value="Turkish Language and Literature">Turkish Language and Literature</option>
                <option value="Translation and Interpretation">Translation and Interpretation</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Molecular Biology and Genetics">Molecular Biology and Genetics</option>
                <option value="Bioengineering">Bioengineering</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <!-- username input -->
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                v-model="formData.username"
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username"
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
                autocomplete="new-password"
                required
                class="shadow appearance-none border rounded w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="mb-4">
            <!-- register button -->
            <div>
              <button
                :disabled="loading"
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
              >
                Register
              </button>
            </div>
          </div>
          <div class="mb-4">
            <!-- a border line -->
            <div class="border-t border-gray-100"></div>
          </div>
          <div class="mb-4">
            <!-- register button -->
            <div>

                <router-link to="/login" class="flex justify-center font-bold text-sm text-blue-500 hover:text-blue-800">
                  Already have an account? Login
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
  password: "",
  email: "",
  department: "",
  fullname: "",
});

const loading = computed(() => store.state.loading);

const register = async (event) => {
  event.preventDefault();
  
  if (!formData.username || !formData.password) {
    alert("Please fill out all fields");
  } else {
    store.dispatch("auth/register", formData);
  }

};

</script>
