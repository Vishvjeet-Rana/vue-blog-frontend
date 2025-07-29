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
  <div class="bg-gray-200 h-20 m-auto flex justify-center items-center">
    <nav
      class="bg-blue-400 h-[95%] w-[95%] rounded-4xl flex items-center p-3 gap-3 mt-5"
    >
      <router-link class="text-lg font-bold text-white" to="/"
        >Home</router-link
      >
      |
      <router-link class="text-lg font-bold text-white" to="/posts"
        >All Posts</router-link
      >
      |

      <template v-if="!isLoggedIn">
        <router-link class="text-lg font-bold text-white" to="/login"
          >Login</router-link
        >
        |
        <router-link class="text-lg font-bold text-white" to="/register"
          >Register</router-link
        >
      </template>

      <template v-else>
        <router-link class="text-lg font-bold text-white" to="/me"
          >My Profile</router-link
        >
        |
      </template>
    </nav>
  </div>

  <router-view />
</template>

<style scoped></style>
