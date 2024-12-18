<template>
  <aside class="sidebar border-end">
    <!-- Sidebar Nav -->
    <nav class="sidebar__nav nav flex-column">
      <router-link :to="{ name: 'HomeView' }" class="nav-link">
        <i class="bi bi-house-fill"></i>
        <span class="description">Dashboard</span>
      </router-link>
      <!-- Featured Dropdown -->
      <a href="#" class="nav-link" data-bs-toggle="collapse" data-bs-target="#featured-submenu">
        <i class="bi bi-star-fill"></i>
        <span class="description">Featured <i class="bi bi-caret-down-fill small ms-1"></i></span>
      </a>
      <div class="submenu collapse" id="featured-submenu">
        <router-link :to="{ name: 'FeaturedCategoriesView' }" class="nav-link">
          <i class="bi bi-grid-fill"></i>
          <span class="description">Categories</span>
        </router-link>
        <a href="#" class="nav-link">
          <i class="bi bi-tags-fill"></i>
          <span class="description">Products</span>
        </a>
      </div>
      <a href="#" class="nav-link">
        <i class="bi bi-currency-dollar"></i>
        <span class="description">Rates Calculator</span>
      </a>
    </nav>

    <p class="small text-center text-secondary">v0.0.1</p>
  </aside>
  <main class="main-content">
    <router-view />
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: var(--bs-dark);
}

.sidebar__nav .nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--bs-secondary);
}

.sidebar__nav .nav-link:hover {
  color: var(--bs-light);
}

.sidebar__nav .submenu {
  background-color: #191b1e;
}

.main-content {
  padding: 20px;
  margin-left: 200px;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 60px;
  }

  .sidebar__nav .nav-link {
    justify-content: center;
  }

  .sidebar__nav .nav-link .description {
    display: none;
  }

  .main-content {
    margin-left: 60px;
  }
}
</style>
