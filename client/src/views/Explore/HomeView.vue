<template>
  <div>
    <!-- Sticky Search Bar -->
    <nav class="sticky top-0 z-50 bg-blue-500 p-4">
      <div class="container mx-auto flex justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for books..."
          class="rounded px-4 py-2 w-48 md:w-64 border border-blue-500 focus:outline-none"
        />
        <button
          @click="search"
          class="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
    </nav>

    <!-- Main Content - Departments and Books -->
    <div class="container mx-auto flex">
      <!-- Sidebar for Departments -->
      <aside class="w-1/4 p-4 bg-white shadow rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Departments</h2>
        <ul>
          <li
            v-for="department in departments"
            :key="department.id"
            @click="selectDepartment(department)"
            class="cursor-pointer hover:text-blue-600"
          >
            {{ department.name }}
          </li>
        </ul>
      </aside>

      <!-- Books Section -->
      <div class="w-3/4 p-4">
        <div
          v-for="(booksInDept, department) in booksByDepartment"
          :key="department"
        >
          <h2 class="text-2xl font-semibold mt-8">{{ department }}</h2>
          <div class="flex flex-wrap">
            <div
              v-for="book in booksInDept"
              :key="book.id"
              class="w-1/2 md:w-1/4 p-4"
            >
              <div class="bg-white shadow rounded-lg p-4">
                <img
                  :src="book.thumbnail"
                  alt="Book Thumbnail"
                  class="w-full h-32 object-cover mb-2"
                />
                <h3 class="text-lg font-semibold">{{ book.title }}</h3>
                <p class="text-gray-600">{{ book.department }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      departments: [
        { id: 1, name: "Fiction" },
        { id: 2, name: "Mystery" },
        // Add more departments as needed
      ],
      books: [
        {
          id: 1,
          title: "Book 1",
          thumbnail: "https://picsum.photos/200/300",
          department: "Fiction",
        },
        {
          id: 2,
          title: "Book 2",
          thumbnail: "https://picsum.photos/200/300",
          department: "Mystery",
        },
        {
          id: 3,
          title: "Book 2",
          thumbnail: "https://picsum.photos/200/300",
          department: "Fiction",
        },
        {
          id: 3,
          title: "Book 2",
          thumbnail: "https://picsum.photos/200/300",
          department: "Fiction",
        },
        {
          id: 3,
          title: "Book 2",
          thumbnail: "https://picsum.photos/200/300",
          department: "Fiction",
        },
        // Add more books and their details
      ],
    };
  },
  computed: {
    booksByDepartment() {
      // Group books by department title-wise
      return this.books.reduce((acc, book) => {
        if (!acc[book.department]) {
          acc[book.department] = [];
        }
        acc[book.department].push(book);
        return acc;
      }, {});
    },
  },
  methods: {
    selectDepartment(department) {
      // Implement the logic to filter books based on the selected department
      // For example, update 'books' array to display books of the selected department
    },
    search() {
      // Implement the search logic here based on the searchQuery
      // You can filter the books based on the searchQuery
    },
  },
};
</script>

<style>
/* Add custom styles as needed */
</style>
