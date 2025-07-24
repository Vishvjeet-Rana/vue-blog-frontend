<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { fetchCurrentUser, login } from "../../services/auth";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    const { access_token } = await login({
      email: email.value,
      password: password.value,
    });
    authStore.setAuth(access_token, null);

    const user = await fetchCurrentUser(access_token);
    authStore.setAuth(access_token, user);

    router.push("/me");
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed";
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
