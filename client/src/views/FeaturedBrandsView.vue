<script setup>
import SidebarLayout from "@/components/SidebarLayout.vue";
import FeaturedBrandsCard from "@/components/FeaturedBrandsCard.vue";
</script>

<template>
  <SidebarLayout>
    <div class="main__header">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-column">
          <h1 class="mb-0">Featured Brands</h1>
          <p class="mb-0">Edit the brands displayed on the home page</p>
        </div>
        <button
          v-if="brands.length < 8"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
          class="btn btn-outline-success"
        >
          Add
        </button>
      </div>
    </div>
    <div class="main__body mt-4">
      <div v-if="loading" class="spinner spinner-border"></div>
      <div v-else class="row align-items-start gx-3 gy-3">
        <div v-for="(brand, index) in brands" class="col-12 col-md-6 col-lg-4 col-xl-3">
          <FeaturedBrandsCard :brand="brand" :index="index" />
        </div>
      </div>
    </div>
  </SidebarLayout>

  <div class="modal fade" tabindex="-1" id="addModal">
    <div class="modal-dialog">
      <form class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add featured brand</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="modalError" class="alert alert-danger">{{ modalError }}</div>
          <div v-else-if="modalSuccess" class="alert alert-success">{{ modalSuccess }}</div>
          <div class="form-group">
            <label>Image SRC</label>
            <input
              v-model="imgSrc"
              type="text"
              class="form-control"
              required
              placeholder="/assets/images/demo_img/demo_img.jpg"
            />
            <small class="form-text">The SRC (link) of the image uploaded to the JT's images folder</small>
          </div>
          <div class="form-group mt-3">
            <label>Description</label>
            <input v-model="description" type="text" class="form-control" required placeholder="Sunbrella" />
            <small class="form-text">The description of the entry (i.e., Sunbrella)</small>
          </div>
          <div class="form-group mt-3">
            <label>Link</label>
            <input v-model="link" type="text" class="form-control" required placeholder="/demo_category" />
            <small class="form-text">The link it will direct to when the user clicks on the image</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="handleSubmit" type="button" class="btn btn-outline-success">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/constants";

export default {
  name: "FeaturedBrandsView",
  data() {
    return {
      loading: true,
      error: "",
      modalError: "",
      modalSuccess: "",
      brands: [],
      showModal: false,
      imgSrc: "",
      description: "",
      link: "",
    };
  },
  created() {
    fetch(`${API_URL}/api/v1/featured-brands/`)
      .then((request) => {
        if (!request.ok) {
          throw new Error(`[${request.status}] Could not fetch featured brands...`);
        }

        return request.json();
      })
      .then((response) => {
        response.data.forEach((brand) => this.brands.push(brand));
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.error = error.message;
      });
  },
  methods: {
    async handleSubmit() {
      let imgSrc = this.imgSrc;
      let description = this.description;
      let link = this.link;

      if (!imgSrc || !description || !link) return;

      this.modalSuccess = "";
      this.modalError = "";

      let request = await fetch(`${API_URL}/api/v1/featured-brands/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ imgSrc, description, link }),
      });

      let response = await request.json();
      if (!request.ok) {
        this.modalSuccess = "";
        this.modalError = response.message;
        return;
      }

      this.$router.go();
    },
  },
};
</script>

<style scoped></style>
