<script setup>
import SidebarLayout from "@/components/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="main__header">
      <h1 class="mb-0">Rates Calculator</h1>
      <p class="mb-0">Edit the couriers, margins, large items of the JT's Rates Calculator</p>
    </div>
    <div class="main__body mt-4">
      <div class="row align-items-start">
        <div class="col-12 col-md-6 col-lg">
          <section class="couriers__section">
            <h3 class="mb-0">Couriers</h3>
          </section>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <section class="large-items__section">
            <h3 class="mb-0">Large Items</h3>
          </section>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>

<script>
export default {
  name: "RatesCalculatorView",
  created() {
    document.title = "Rates Calculator | JT's Tools";
  },
};
</script>
