<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../store/auth";
const authStore = useAuthStore();
const user = computed(() => authStore.user);

console.log("👤 Loaded user:", user);
</script>

<template>
  <div v-if="user">
    <h3>Name: {{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Role: {{ user.role }}</p>
    <img
      :src="`http://localhost:3000/uploads/${user.image}`"
      v-if="user.image"
      width="350"
    />
  </div>
</template>
