<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogOut = async () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div>
    <h1>Welcome to BLOG API PROJECT WITH VUE.JS + NEST.JS 🎉</h1>

    <div v-if="!authStore.token">
      <button @click="router.push('/login')" type="submit">Login</button>
      <br /><br /><br />
      <h3>Don't have any account ?</h3>
      <button @click="router.push('register')" type="submit">Register</button>
    </div>

    <div v-else>
      <p>You are already logged in 🎉</p>
      <button @click="router.push('/me')">Go to Profile</button>

      <div>
        <button
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
