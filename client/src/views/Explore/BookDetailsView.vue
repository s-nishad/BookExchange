<template>
    <div v-if="book.user" class="min-h-screen grid place-items-center font-mono bg-gray-900">

        <div class=" rounded-md bg-gray-800 shadow-lg">
            <div class="md:flex px-4 leading-none max-w-4xl">
                <div class="flex-none ">
                    <img :src="getImageUrl(book.image)" alt="Book Cover"
                        class="h-72 w-56 rounded-md  transform -translate-y-4 border-4 border-gray-300 shadow-lg" />
                </div>

                <div class="flex-col text-gray-300">

                    <p class="pt-4 text-2xl font-bold">{{ book.title }}</p>
                    <hr class="hr-text" data-content="">
                    <div class="text-md flex justify-between px-4 my-2">
                        <span class="font-bold">Author | {{ book.author }}</span>
                        <span class="font-bold"></span>
                    </div>
                    <p class="hidden md:block px-4 my-4 text-sm text-left">{{ book.description }} </p>

                    <p class="flex text-md px-4 my-2">
                        Department
                        <span class="font-bold px-2">of</span>
                         {{ book.user.department }}
                    </p>

                    <div class="text-xs">
                        <button type="button"
                            class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"><RouterLink :to="`/profile/messgaes/${book.user._id}`">Contact with Exchanger</RouterLink></button>

                        <button type="button"
                            class="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"> <RouterLink :to="`/profile/messgaes/${book.user._id}`"> {{ book.user.username }} </RouterLink></button>
                    </div>
                    <!--             <p>ICON BTNS</p> -->

                </div>
            </div>
            <div class="flex justify-between items-center px-4 mb-4 w-full">
                <div class="flex">
                    <i class="material-icons mr-2 text-red-600">favorite_border</i>
                    <i class="material-icons text-blue-600">remove_red_eye</i>
                </div>
                <div class="flex">
                    <i class="material-icons ml-2 text-yellow-600">sentiment_very_satisfied</i>
                    <i class="material-icons ml-2 text-yellow-600">sentiment_neutral</i>
                    <i class="material-icons ml-2 text-yellow-600">sentiment_very_dissatisfied</i>
                    <i class="material-icons ml-2 text-yellow-600">star_outline</i>
                    <i class="material-icons ml-2 text-yellow-600">star_half</i>
                    <i class="material-icons ml-2 text-yellow-600">star</i>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import cookies from "js-cookie";
import api from "@/helpers/api";


export default {
    data() {
        return {
            book: {},
        };
    },
    methods: {
        async fetchBooks() {
            try {
                console.log("Fetching book details...");
                const response = await api.get(`/profile/books/${this.$route.params.id}/`, {
                    headers: {
                        Authorization: `Token ${cookies.get("token")}`,
                    },
                });

                console.log(response.data);

                if (response.data.status === "failed") {
                    this.$store.commit(
                        "setToast",
                        {
                            message: response.data.message,
                            type: "failed",
                        },
                        { root: true }
                    );
                } else {
                    this.$data.book = response.data.book;

                }
            } catch (error) {
                console.log(error);
                this.$store.commit(
                    "setToast",
                    {
                        message: "Something went wrong. Please try again later.",
                        type: "failed",
                    },
                    { root: true }
                );
            }
        },
        getImageUrl(imageName) {
            //return `/uploads/book_image/${imageName}`;
            return `http://localhost:5000/uploads/book_image/${imageName}`;
        },
    },
    created() {
        this.fetchBooks();
    },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap');

body {
    text-align: center;
}

.hr-text {
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    opacity: 0.5;
}

.hr-text:before {
    content: "";
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
}

.hr-text:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;
    padding: 0 0.5em;
    line-height: 1.5em;
    color: #818078;
    background-color: #fcfcfa;
}
</style>
  