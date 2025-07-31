<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthFormStore } from "../../store/authForm";
import { useValidationStore } from "../../store/validations";

const authFormStore = useAuthFormStore();

const validationStore = useValidationStore();
const { emailError, passwordError, email, password, isLoginFormValid } =
  storeToRefs(validationStore);
const { validateEmail, validatePassword, handleLoginSubmit } = validationStore;
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">Login Page</h1>
    </div>

    <!-- will add forms here -->

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[60%] w-[40%]"
    >
      <form @submit.prevent="handleLoginSubmit" class="p-3">
        <div class="p-4">
          <label for="email" class="font-semibold text-lg"
            >Enter Your Email:</label
          >
          <br />
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="border-b rounded-sm"
            @input="validateEmail"
          />
          <p v-if="emailError" class="text-red-600 text-sm mt-1">
            {{ emailError }}
          </p>
        </div>
        <div class="p-4">
          <label for="password" class="font-semibold text-lg"
            >Enter Your Password:</label
          ><br />
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="border-b rounded-sm"
            @input="validatePassword"
          />
          <p v-if="passwordError" class="text-red-600 text-sm mt-1">
            {{ passwordError }}
          </p>
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400 disabled:opacity-50"
            type="submit"
            :disabled="!isLoginFormValid"
          >
            Log In &rarr;
          </button>
        </div>
      </form>

      <div class="mt-28 ml-5 text-blue-500 underline hover:text-blue-700">
        <p>
          <router-link to="/forgot-password">Forgot Password?</router-link>
        </p>
      </div>
    </div>

    <div v-if="authFormStore.error" class="text-red-600 mt-4">
      <ul v-if="Array.isArray(authFormStore.error)">
        <li v-for="(msg, i) in authFormStore.error" :key="i">{{ msg }}</li>
      </ul>
      <p v-else>{{ authFormStore.error }}</p>
    </div>
  </div>
</template>

<style scoped></style>
