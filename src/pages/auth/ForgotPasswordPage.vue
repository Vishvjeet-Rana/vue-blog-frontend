<script setup lang="ts">
import { ref } from "vue";
import { forgotPassword } from "../../services/auth";

const emit = defineEmits(["back"]);
const email = ref("");
const message = ref("");
const error = ref("");

const handleForgot = async () => {
  try {
    const res = await forgotPassword(email.value);
    message.value = res.message;
    error.value = "";
  } catch (error: any) {
    error.vale =
      error.response?.data?.message ||
      "Something went wrong in forgot password";
    message.value = "";
  }
};
</script>

<template>
  <div>
    <h1>ForgotPassword Page</h1>

    <!-- will add forms here -->
    <form @submit.prevent="handleForgot">
      <input
        v-model="email"
        type="email"
        placeholder="enter your registered email"
        required
      />
      <button style="margin-left: 15px">Reset Pass Link</button>
    </form>

    <button style="margin-top: 20px" @click="emit('back')">
      &larr; Go Back
    </button>
    <p style="color: greenyellow">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
