<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { resetPassword } from "../../services/auth";

const route = useRoute();
const router = useRouter();
const token = route.params.token as string;

const emit = defineEmits(["back"]);
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
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div class="text-blue-600 font-bold text-4xl">
      <h1>Reset Page</h1>
    </div>

    <!-- will add forms here -->
    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleReset" class="p-3">
        <div class="p-4">
          <label class="font-semibold text-lg" for="password"
            >Enter Password:</label
          ><br /><br />
          <input
            class="border-b rounded-sm"
            id="password"
            type="password"
            placeholder="Enter New Password"
            required
            v-model="newPassword"
          />
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>

    <div>
      <button
        class="text-blue-500 underline font-semibold"
        style="margin-top: 20px"
        @click="emit('back')"
      >
        &larr; Go Back
      </button>
    </div>
    <p style="color: green">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
