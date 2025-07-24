<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { login } from "../../services/auth";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    const data = await login({
      email: email.value,
      password: password.value,
    });

    authStore.setAuth(data.token, data.user);

    router.push("/me");
  } catch (error: any) {
    error.value = error.response?.data?.message || "Login Failed";
  }
};
</script>

<template>
  <div>
    <h1>Login Page</h1>

    <!-- will add forms here -->

    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" type="email" required />
      <input
        v-model="password"
        placeholder="Enter Password"
        type="password"
        required
      />
      <button type="submit">Log In</button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
