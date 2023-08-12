<template>
    <!-- Modal Overlay -->
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <!-- Modal Content -->
        <div class="bg-white p-4 rounded shadow-md w-85">
            <!-- Modal Title -->
            <h2 class="text-lg font-semibold mb-4 text-pink-700">Upload Books</h2>
            <!-- a line -->
            <div class="border-t border-gray-100"></div> <br>
            <form>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Book Title</label>
                    <input type="text" class="border rounded w-full py-2 px-3 text-gray-700" v-model="formData.title"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Author</label>
                    <input type="text" class="border rounded w-full py-2 px-3 text-gray-700" v-model="formData.author"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <input type="text" class="border rounded w-full py-2 px-3 text-gray-700" v-model="formData.description"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Book's Cover Photo</label>
                    <input type="file" class="border rounded w-full py-2 px-3 text-gray-700" @change="handleFileChange"
                        accept="image/*" name="image" required />
                </div>
                <button @click.prevent="uploadBook" :disabled="loading" type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50">
                    Upload Book
                </button>
            </form>

            <!-- Close Button -->
            <button :disabled="loading" @click="$emit('close')"
                class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4 disabled:opacity-50">
                will do it later
            </button>
        </div>
    </div>
</template>
  
<script setup>
import cookies from "js-cookie";
import { useStore } from "vuex";
import api from "@/helpers/api";

const store = useStore();

const formData = {
    title: "",
    author: "",
    description: "",
    image: null,
};

const handleFileChange = (event) => {
    formData.image = event.target.files[0];
};

const uploadBook = async () => {
    store.commit("setLoading", true, { root: true });
    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("description", formData.description);
    form.append("image", formData.image);

    try {

        const response = await api.post("/profile/books/add_book", form, {
            headers: {
                Authorization: `Bearer ${cookies.get("token")}`,
            },
        });

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
        console.log(error.response);
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
  
<style scoped>
.w-85 {
    width: 28rem;
}
</style>
  