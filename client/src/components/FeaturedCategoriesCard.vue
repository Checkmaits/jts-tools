<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="handleSubmit()">
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
      </form>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    async handleSubmit() {},
  },
};
</script>

<style scoped></style>
