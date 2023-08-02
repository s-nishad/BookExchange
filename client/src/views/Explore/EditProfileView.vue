<script setup>
import cookies from "js-cookie";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import api from "@/helpers/api";

const store = useStore();

const loading = computed(() => store.state.loading);

const user = reactive(JSON.parse(cookies.get("user")));

const updateUser = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    const response = await api.put(`/profile/${user._id}`, user);
    if (response.data.status === "failed") {
      store.commit(
        "setToast",
        {
          show: true,
          message: response.data.message,
          type: "failed",
        },
        { root: true }
      );
      store.commit("setLoading", false, { root: true });
    } else {
      cookies.remove("user");
      cookies.set("user", JSON.stringify(response.data.data), {
        expires: 7,
      });
      store.commit(
        "setToast",
        {
          show: true,
          message: response.data.message,
          type: "success",
        },
        { root: true }
      );

      setTimeout(() => {
        window.location.reload();
        store.commit(
          "setToast",
          {
            show: false,
            message: response.data.message,
            type: "success",
          },
          { root: true }
        );
        store.commit("setLoading", false, { root: true });
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      {
        show: true,
        message: error.response.data.message,
        type: "failed",
      },
      { root: true }
    );
  }
};
</script>


<template>
  <!-- Modal Overlay -->
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <!-- Modal Content -->
    <div class="bg-white p-4 rounded shadow-md w-80">
      <!-- Modal Title -->
      <h2 class="text-lg font-semibold mb-4">Edit Profile</h2>

      <!-- Your Edit Profile Form goes here -->
      <!-- Replace this with your actual form inputs and actions -->
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Username</label
          >
          <input
            type="text"
            class="border rounded w-full py-2 px-3 text-gray-700"
            v-model="user.username"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Full Name</label
          >
          <input
            type="text"
            class="border rounded w-full py-2 px-3 text-gray-700"
            v-model="user.fullname"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Email Address</label
          >
          <input
            type="email"
            class="border rounded w-full py-2 px-3 text-gray-700"
            v-model="user.email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Department</label
          >
          <input
            type="text"
            class="border rounded w-full py-2 px-3 text-gray-700"
            v-model="user.department"
            required
          />
        </div>
        <button
          @click.prevent="updateUser"
          :disabled="loading"
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Save Changes
        </button>
      </form>

      <!-- Close Button -->
      <button
        :disabled="loading"
        @click="$emit('close')"
        class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4 disabled:opacity-50"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
.w-80 {
  width: 24rem;
}
</style>