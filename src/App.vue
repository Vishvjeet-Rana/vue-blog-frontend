<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "./store/auth";
import { fetchCurrentUser } from "./services/auth";

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    try {
      const user = await fetchCurrentUser(authStore.token);
      authStore.setAuth(authStore.token, user);
    } catch (err) {
      authStore.logout(); // token invalid or expired
    }
  }
});
</script>

<template>
  <div>
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/forgot-password">Forgot Pass</router-link> |
      <router-link to="/reset-password/some-token">Reset Pass</router-link> |
      <router-link to="/change-password">Change Pass</router-link>
    </nav>
  </div>

  <router-view />
</template>

<style scoped></style>
