<script setup lang="ts">
import { useAuthFormStore } from "../../store/authForm";
import { storeToRefs } from "pinia";
import { useValidationStore } from "../../store/validations";

const authFormStore = useAuthFormStore();

const { message } = storeToRefs(authFormStore);
const { handleForgot } = authFormStore;

const validationStore = useValidationStore();

const { email, isForgotPasswordFormValid } = storeToRefs(validationStore);

const { handleForgotPasswordSubmit, validateForgotPasswordEmail } =
  validationStore;

const emit = defineEmits(["back"]);
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">ForgotPassword?</h1>
    </div>

    <!-- will add forms here -->
    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form
        @submit.prevent="handleForgotPasswordSubmit(handleForgot)"
        class="p-3"
      >
        <div class="p-4">
          <label class="font-semibold text-lg" for="email"
            >Enter Your Email:</label
          >
          <br /><br />
          <input
            class="border-b rounded-sm"
            id="email"
            v-model="email"
            type="email"
            placeholder="enter your registered email"
            @input="validateForgotPasswordEmail"
            required
          />
          <p class="text-red-600 text-sm" v-if="validationStore.emailError">
            {{ validationStore.emailError }}
          </p>
        </div>
        <div class="py-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400 disabled:opacity-50"
            style="margin-left: 15px"
            :disabled="!isForgotPasswordFormValid"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>

    <button
      class="text-blue-500 underline font-semibold"
      style="margin-top: 20px"
      @click="emit('back')"
    >
      &larr; Go Back
    </button>
    <p style="color: green">{{ message }}</p>
    <div v-if="authFormStore.error" class="text-red-600 mt-4">
      <ul v-if="Array.isArray(authFormStore.error)">
        <li v-for="(msg, i) in authFormStore.error" :key="i">{{ msg }}</li>
      </ul>
      <p v-else>{{ authFormStore.error }}</p>
    </div>
  </div>
</template>

<style scoped></style>
