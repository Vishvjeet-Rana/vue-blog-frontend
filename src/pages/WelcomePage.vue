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
  <div>
    <h1>Welcome to BLOG API PROJECT WITH VUE.JS + NEST.JS 🎉</h1>

    <div v-if="!authStore.token">
      <h3>Already have an account?</h3>
      <button class="animated-btn" @click="router.push('/login')" type="submit">
        Login
      </button>
      <br /><br /><br />
      <h3>Don't have any account ?</h3>
      <button
        class="animated-btn"
        @click="router.push('register')"
        type="submit"
      >
        Register
      </button>
    </div>

    <div v-else>
      <p>You are already logged in 🎉</p>
      <button class="animated-border-btn" @click="router.push('/me')">
        Go to Profile
      </button>

      <div>
        <button
          class="animated-btn"
          @click="handleLogOut"
          style="
            background-color: red;
            padding: 10px;
            margin-top: 30px;
            color: white;
            border: none;
            font-size: 15px;
            font-weight: bold;
          "
        >
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
