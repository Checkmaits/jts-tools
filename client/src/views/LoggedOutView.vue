<template>
  <div class="alert alert-info">
    <h4 class="alert-heading">User logged out</h4>
    <p class="mb-0"><strong>Reason:</strong> {{ reason }}</p>
  </div>
</template>

<script>
export default {
  name: "LoggedOut",
  props: {
    reason: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
