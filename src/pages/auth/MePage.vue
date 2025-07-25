<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const user = computed(() => authStore.user);

console.log("👤 Loaded user:", user);

import ForgotPasswordPage from "./ForgotPasswordPage.vue";
import ResetPasswordPage from "./ResetPasswordPage.vue";
import ChangePasswordPage from "./ChangePasswordPage.vue";

const activeSection = ref<
  "main" | "forgot" | "reset" | "change" | "update" | "upload"
>("main");

const router = useRouter();

const goBack = () => {
  activeSection.value = "main";
};
</script>

<template>
  <div v-if="user">
    <div v-if="activeSection === 'main'">
      <h3>Name: {{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
      <img
        :src="`http://localhost:3000/uploads/${user.image}`"
        v-if="user.image"
        width="350"
      />

      <hr />
      <button @click="router.push('/profile/update')">Update Profile</button>
      <button @click="router.push('/profile/upload')">Upload Image</button>
      <hr />

      <div style="margin-top: 25px">
        <button @click="activeSection = 'forgot'">Forgot Password</button>
        <button @click="activeSection = 'reset'">Reset Password</button>
        <button @click="activeSection = 'change'">Change Password</button>
      </div>
    </div>

    <div v-else-if="activeSection === 'forgot'">
      <ForgotPasswordPage @back="goBack" />
    </div>

    <div v-else-if="activeSection === 'reset'">
      <ResetPasswordPage @back="goBack" />
    </div>

    <div v-else-if="activeSection === 'change'">
      <ChangePasswordPage @back="goBack" />
    </div>
  </div>
</template>
