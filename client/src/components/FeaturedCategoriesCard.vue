<template>
  <div class="card">
    <div class="card-body">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="loading" class="text-center">
        <div class="spinner spinner-border"></div>
      </div>
      <form v-else @submit.prevent="handleSubmit()">
        <div class="form-group">
          <label>Image SRC</label>
          <input v-model="imgSrc" type="text" class="form-control bg-light text-truncate" required />
        </div>
        <div class="form-group mt-2">
          <label>Description</label>
          <input v-model="description" type="text" class="form-control bg-light text-truncate" required />
        </div>
        <div class="form-group mt-2">
          <label>Link</label>
          <input v-model="link" type="text" class="form-control bg-light text-truncate" required />
        </div>
        <button type="submit" class="btn btn-outline-dark w-100 mt-3">Submit</button>
        <button @click="handleDelete" class="btn btn-outline-danger w-100 mt-2">Delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/constants";

export default {
  name: "FeaturedCategoriesCard",
  props: {
    category: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      imgSrc: this.category.imgSrc,
      description: this.category.description,
      link: this.category.link,
      error: "",
      success: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      let imgSrc = this.imgSrc;
      let description = this.description;
      let link = this.link;
      if (!imgSrc || !description || !link) return;

      this.success = "";
      this.error = "";
      this.loading = true;

      let request = await fetch(`${API_URL}/api/v1/featured-categories/edit/${this.category._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ imgSrc, description, link }),
      });

      let response = await request.json();
      if (!request.ok) {
        if (request.status === 401) {
          this.$router.replace({ name: "LoginView" });
          return;
        }

        this.error = response.message;
        this.loading = false;
        return;
      }

      this.success = "Updated successfully";
      this.loading = false;
      setTimeout(() => (this.success = ""), 3000);
    },
    async handleDelete() {
      this.success = "";
      this.error = "";
      this.loading = true;

      let request = await fetch(`${API_URL}/api/v1/featured-categories/delete/${this.category._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      let response = await request.json();
      if (!request.ok) {
        if (request.status === 401) {
          this.$router.replace({ name: "LoginView" });
          return;
        }

        this.error = response.message;
        this.loading = false;
        return;
      }

      this.loading = false;
      this.$router.push({ name: "FeaturedCategoriesView" });
    },
  },
};
</script>

<style scoped></style>
