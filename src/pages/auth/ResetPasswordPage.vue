<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resetPassword } from "../../services/auth";

const route = useRoute();
const router = useRouter();
const token = route.params.token as string;

const newPassword = ref("");
const message = ref("");
const error = ref("");

const handleReset = async () => {
  try {
    const response = await resetPassword(token, newPassword.value);
    message.value = response.message;
    router.push("/login");
  } catch (error: any) {
    error.value =
      error.response?.data?.message || "Something went wrong in Reset Password";
    message.value = "";
  }
};
</script>

<template>
  <div>
    <h1>Reset Page</h1>

    <!-- will add forms here -->
    <form @submit.prevent="handleReset">
      <input
        type="password"
        placeholder="Enter New Password"
        required
        v-model="newPassword"
      />
      <button type="submit">Reset Password</button>
    </form>

    <p style="color: green">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
