<template>
  <div class="login__wrapper bg-light">
    <div class="login__container bg-white shadow-sm rounded p-3">
      <header>
        <h1 class="mb-0">Login</h1>
        <p class="mb">Login to continue with the JT's Tools app.</p>
      </header>
      <main class="mt-4">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="loading" class="text-center">
          <div class="spinner spinner-border"></div>
        </div>
        <form v-else @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" class="form-control" placeholder="Username" />
          </div>
          <div class="form-group mt-2">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="********" />
          </div>
          <button class="btn btn-outline-dark w-100 mt-3">Submit</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/constants";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      let username = this.username;
      let password = this.password;
      if (!username || !password) return;

      this.error = "";
      this.loading = true;

      let request = await fetch(`${API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      let response = await request.json();
      if (!request.ok) {
        this.error = response.message;
        this.loading = false;
        return;
      }

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      this.$router.replace({ name: "HomeView" });
    },
  },
};
</script>

<style>
.login__wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}

.login__container {
  width: 500px;
}

@media screen and (max-width: 768px) {
  .login__wrapper {
    padding: 10px;
  }

  .login__container {
    width: 100%;
  }
}
</style>
