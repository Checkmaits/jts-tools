<script setup>
import SidebarLayout from "@/components/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="main__header">
      <h1 class="mb-0">Dashboard</h1>
    </div>
    <div class="main__body mt-4">
      <div class="text-center">
        <img src="/images/nothing-here-yet.gif" alt="nothing here yet" />
        <h3 class="mt-2 mb-0">Nothing here yet</h3>
        <p>This page is still under construction</p>
      </div>
    </div>
  </SidebarLayout>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    document.title = "Home | JT's Tools";
  },
};
</script>

<style scoped></style>
