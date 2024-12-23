<script setup>
import SidebarLayout from "@/components/SidebarLayout.vue";
import FeaturedCategoriesCard from "@/components/FeaturedCategoriesCard.vue";
</script>

<template>
  <SidebarLayout>
    <div class="main__header">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column">
          <h1 class="mb-0">Featured Categories</h1>
          <p class="mb-0">Edit the categories displayed on the home page</p>
        </div>
        <button v-if="categories.length < 8" class="btn btn-outline-success">Add</button>
      </div>
    </div>
    <div class="main__body mt-4">
      <div v-if="loading" class="spinner spinner-border"></div>
      <div v-else class="row align-items-start gx-3 gy-3">
        <div v-for="(category, index) in categories" class="col-12 col-md-6 col-lg-4 col-xl-3">
          <FeaturedCategoriesCard :category="category" :index="index" />
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>

<script>
import { API_URL } from "@/constants";

export default {
  name: "FeaturedCategoriesView",
  data() {
    return {
      loading: true,
      error: "",
      categories: [],
    };
  },
  created() {
    document.title = "Featured Categories | JT's Tools";
    fetch(`${API_URL}/api/v1/featured-categories/`)
      .then((request) => {
        if (!request.ok) {
          throw new Error(`[${request.status}] Could not fetch featured categories...`);
        }

        return request.json();
      })
      .then((response) => {
        response.data.forEach((category) => this.categories.push(category));
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.error = error.message;
      });
  },
};
</script>

<style scoped></style>
