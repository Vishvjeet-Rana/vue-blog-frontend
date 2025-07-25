<script setup lang="ts">
import { computed, onMounted } from "vue";
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

// checking if user logged in or not
const isLoggedIn = computed(() => !!authStore.token);
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/posts">All Posts</router-link> |

      <template v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>

      <template v-else>
        <router-link to="/me">My Profile</router-link> |
      </template>
    </nav>
  </div>

  <router-view />
</template>

<style scoped></style>
