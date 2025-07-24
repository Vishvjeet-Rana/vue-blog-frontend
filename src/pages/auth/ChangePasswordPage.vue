<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { changePassword } from "../../services/auth";

const router = useRouter();

const oldPassword = ref("");
const newPassword = ref("");
const error = ref("");
const message = ref("");

const handleChangePass = async () => {
  try {
    const response = await changePassword(oldPassword.value, newPassword.value);
    message.value = response.message;

    router.push("/login");
  } catch (error: any) {
    error.value =
      error.response?.data?.message ||
      "Something went wrong in change password";
  }
};
</script>

<template>
  <div>
    <h1>Change password Page</h1>

    <!-- will add forms here -->
    <form @submit.prevent="handleChangePass">
      <input
        type="password"
        required
        placeholder="enter old password"
        v-model="oldPassword"
      />
      <input
        type="password"
        required
        placeholder="enter new password"
        v-model="newPassword"
      />
      <button type="submit">Change Password</button>
    </form>

    <p style="color: green">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
