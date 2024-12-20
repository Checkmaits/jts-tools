import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import FeaturedCategoriesView from "@/views/FeaturedCategoriesView.vue";
import FeaturedBrandsView from "@/views/FeaturedBrandsView.vue";

import { API_URL } from "@/constants";

async function checkAuth(to, from, next) {
  let userId = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  let request = await fetch(`${API_URL}/api/v1/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });

  if (!request.ok) {
    return next({ name: "LoginView" });
  }

  let response = await request.json();
  to.params.user = response.data;
  next();
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
      beforeEnter: checkAuth,
    },
    {
      path: "/featured/categories",
      name: "FeaturedCategoriesView",
      component: FeaturedCategoriesView,
      beforeEnter: checkAuth,
    },
    {
      path: "/featured/brands",
      name: "FeaturedBrandsView",
      component: FeaturedBrandsView,
      beforeEnter: checkAuth,
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
  ],
});

export default router;
