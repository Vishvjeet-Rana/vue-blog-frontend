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
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">Welcome to BLOG API</h1>
    </div>
    <div
      class="flex flex-col gap-5 justify-center rounded-3xl bg-white drop-shadow-gray-600 shadow-2xl w-[40%] h-[50%] p-8 items-center"
    >
      <div
        v-if="!authStore.token"
        class="h-[90%] w-[90%] flex flex-col justify-around"
      >
        <div class="h-[45%] p-5">
          <h3 class="font-semibold mb-4 text-xl text-gray-700">
            Already have an account?
          </h3>
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            @click="router.push('/login')"
            type="submit"
          >
            Login &rarr;
          </button>
        </div>

        <div class="h-[45%] p-5">
          <h3 class="font-semibold mb-4 text-xl text-gray-700">
            Don't have any account ?
          </h3>
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            @click="router.push('register')"
            type="submit"
          >
            Register &rarr;
          </button>
        </div>
      </div>

      <div v-else class="p-3 h-[80%] w-[85%] flex flex-col justify-between">
        <div class="flex items-center justify-center">
          <p class="font-bold text-3xl text-amber-500">Welcome Back!</p>
        </div>
        <div>
          <p class="font-bold text-xl">You are already logged in</p>
        </div>
        <div>
          <button
            class="border-none bg-gray-600 text-white py-2 px-3 rounded-xl font-semibold"
            @click="router.push('/me')"
          >
            Go to Profile &rarr;
          </button>
        </div>

        <div>
          <button
            @click="handleLogOut"
            style="
              background-color: red;
              padding: 10px;
              color: white;
              border: none;
              font-size: 15px;
              font-weight: bold;
              border-radius: 15px;
            "
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
.animated-btn {
  position: relative;
  padding: 12px 24px;
  font-size: 16px;
  color: white;
  background: #222;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.animated-btn::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 10%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: all 0.6s ease;
  z-index: 0;
}

.animated-btn:hover::before {
  transform: rotate(90deg);
  opacity: 1;
}

.animated-btn:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
}

.animated-border-btn {
  position: relative;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
  background-color: #fff;
  border: 2px solid #4f46e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.animated-border-btn:hover {
  border-width: 4px;
  box-shadow: 0 0 10px rgba(79, 70, 229, 0.4);
  transform: scale(1.05);
}
</style> -->
