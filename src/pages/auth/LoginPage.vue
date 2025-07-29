<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { fetchCurrentUser, login } from "../../services/auth";
import confetti from "canvas-confetti";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

// 🎉 Confetti function
const celebrate = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const handleLogin = async () => {
  try {
    const { access_token } = await login({
      email: email.value,
      password: password.value,
    });

    const user = await fetchCurrentUser(access_token);
    authStore.setAuth(access_token, user);

    // 🎉 Trigger celebration
    celebrate();

    // 🎉 Wait 1.5 seconds before redirect so user sees confetti
    setTimeout(() => {
      router.push("/me");
    }, 1500);
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">Login Page</h1>
    </div>

    <!-- will add forms here -->

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleLogin" class="p-3">
        <div class="p-4">
          <label for="email" class="font-semibold text-lg"
            >Enter Your Email:</label
          >
          <br />
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="border-b rounded-sm"
          />
        </div>
        <div class="p-4">
          <label for="password" class="font-semibold text-lg"
            >Enter Your Password:</label
          ><br />
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="border-b rounded-sm"
          />
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Log In &rarr;
          </button>
        </div>
      </form>

      <div class="mt-28 ml-5 text-blue-500 underline hover:text-blue-700">
        <p>
          <router-link to="/forgot-password">Forgot Password?</router-link>
        </p>
      </div>
    </div>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
