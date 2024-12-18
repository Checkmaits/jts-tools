import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FeaturedCategoriesView from "@/views/FeaturedCategoriesView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/featured/categories",
      name: "FeaturedCategoriesView",
      component: FeaturedCategoriesView,
    },
  ],
});

export default router;
