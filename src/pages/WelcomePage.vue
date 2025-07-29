<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogOut = async () => {
  const confirmed = window.confirm("Are you sure you want to log out?");
  if (confirmed) {
    authStore.logout();
    router.push("/");
  }
};
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-100"
  >
    <h1 class="text-4xl font-extrabold text-gray-800">Welcome to BLOG API</h1>

    <div
      class="flex flex-col gap-6 justify-center items-center rounded-2xl bg-white shadow-lg w-[90%] max-w-xl p-10"
    >
      <!-- Not Logged In -->
      <div v-if="!authStore.token" class="w-full space-y-6">
        <div class="space-y-3">
          <h3 class="text-xl font-semibold text-gray-700">
            Already have an account?
          </h3>
          <button
            @click="router.push('/login')"
            class="w-full py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition font-bold text-gray-800"
          >
            Login &rarr;
          </button>
        </div>

        <div class="space-y-3">
          <h3 class="text-xl font-semibold text-gray-700">
            Don’t have an account?
          </h3>
          <button
            @click="router.push('/register')"
            class="w-full py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition font-bold text-gray-800"
          >
            Register &rarr;
          </button>
        </div>
      </div>

      <!-- Logged In -->
      <div v-else class="w-full space-y-6 text-center">
        <p class="text-3xl font-bold text-yellow-500">Welcome Back!</p>
        <p class="text-lg font-semibold text-gray-700">
          You are already logged in
        </p>

        <button
          @click="router.push('/me')"
          class="w-full py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-800 transition text-white font-semibold"
        >
          Go to Profile &rarr;
        </button>

        <button
          @click="handleLogOut"
          class="w-full py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-semibold"
        >
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>
