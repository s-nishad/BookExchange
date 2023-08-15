<script setup>
import { ref } from "vue";
import Cookies from "js-cookie";
import { reactive } from "vue";

const user = reactive(JSON.parse(Cookies.get("user")));

// EditProfileView
import EditProfileView from "./EditProfileView.vue";
const showEditProfileModal = ref(false);

// UploadBookView
import UploadBookView from "./UploadBookView.vue";
const showUploadBookModal = ref(false);

const logout = () => {
  Cookies.remove("user");
  Cookies.remove("token");
  window.location.reload();
};

</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Header -->
    <header class="bg-indigo-600 py-8 px-4 text-white">
      <div class="container mx-auto text-center">
        <img
          class="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg mb-4"
          :src="`https://avatars.dicebear.com/api/initials/${user.username}.svg`"
          alt="Profile Avatar"
        />
        <h1 class="text-3xl font-semibold">{{ user.username }}</h1>
        <p class="text-lg">Department of {{ user.department }}</p>
        <!-- Edit Profile Button -->
        <button
          @click="showEditProfileModal = true"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
        >
          Edit Profile
        </button>
        <!-- EditProfileView -->
        <EditProfileView
          v-if="showEditProfileModal"
          @close="showEditProfileModal = false"
        />
        <!-- Edit Profile, Change Password, Logout Buttons -->
        <div class="mt-4 space-x-4">
          <button
            class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
          >
            Change Password
          </button>
          <button
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        <!--  uploads books button -->
        <button
          @click="showUploadBookModal = true"
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4"
        >
          Uploads Books
        </button>
        <UploadBookView
          v-if="showUploadBookModal"
          @close="showUploadBookModal = false"
        />
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <!-- Personal Info -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
          <div class="flex items-center mb-2">
            <span class="material-icons text-pink-600 mr-2">person</span>
            <p>{{ user.fullname }}</p>
          </div>
          <div class="flex items-center mb-2">
            <span class="material-icons text-pink-600 mr-2">email</span>
            <p>{{ user.email }}</p>
          </div>
          <!-- Add more personal information fields as needed -->
        </div>

        <!-- Social Media Links -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Other Information</h2>
          <div class="flex items-center mb-2">
            <span class="material-icons text-blue-600 mr-2">mood</span>
            <p>{{ user.username }}</p>
          </div>
          <div class="flex items-center mb-2">
            <span class="material-icons text-blue-600 mr-2">school</span>
            <p>{{ user.department }}</p>
          </div>
          <!-- Add more social media links as needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
