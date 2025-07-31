<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthFormStore } from "../../store/authForm";
import { useValidationStore } from "../../store/validations";

const authFormStore = useAuthFormStore();
const { handleImageUpload } = authFormStore;

const validationStore = useValidationStore();

const {
  emailError,
  passwordError,
  name,

  nameError,
  imageError,
  email,
  password,
  isRegisterFormValid,
} = storeToRefs(validationStore);

const {
  validateEmail,
  validatePassword,
  validateImageFile,
  validateName,
  handleRegisterSubmit,
} = validationStore;
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">Register Page</h1>
    </div>

    <!-- will add forms here -->
    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[60%] w-[40%]"
    >
      <form
        @submit.prevent="handleRegisterSubmit"
        enctype="multipart/form-data"
        class="p-3"
      >
        <div class="p-4">
          <label class="font-semibold text-lg" for="name">Enter Name:</label>
          <br />
          <input
            class="border-b rounded-sm"
            id="name"
            v-model="name"
            placeholder="Enter Name"
            type="text"
            @input="validateName"
            required
          />
          <p v-if="nameError" class="text-red-600 text-sm mt-1">
            {{ nameError }}
          </p>
        </div>
        <br />
        <div class="p-4">
          <label class="font-semibold text-lg" for="email">Enter Email:</label>
          <br />
          <input
            class="border-b rounded-sm"
            id="email"
            v-model="email"
            placeholder="Enter Email"
            type="email"
            @input="validateEmail"
            required
          />
          <p v-if="emailError" class="text-red-600 text-sm mt-1">
            {{ emailError }}
          </p>
        </div>
        <br />
        <div class="p-4">
          <label class="font-semibold text-lg" for="password"
            >Enter Strong Password:</label
          >
          <br />
          <input
            class="border-b rounded-sm"
            id="password"
            v-model="password"
            placeholder="Enter Password"
            type="password"
            @input="validatePassword"
            required
          />
          <p v-if="passwordError" class="text-red-600 text-sm mt-1">
            {{ passwordError }}
          </p>
        </div>
        <br />
        <div class="p-4">
          <label class="font-semibold text-lg" for="image">Choose Image:</label>
          <br />
          <input
            class="border-b rounded-sm"
            id="image"
            @change="
              (e) => {
                handleImageUpload(e);
                const file = (e.target as HTMLInputElement)?.files?.[0];
                if(file){validateImageFile(file);}
              }
            "
            type="file"
            accept=".jpg, .jpeg, .png"
          />
          <p v-if="imageError" class="text-red-600 text-sm mt-1">
            {{ imageError }}
          </p>
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400 disabled:opacity-50"
            :disabled="!isRegisterFormValid"
            type="submit"
          >
            Register &rarr;
          </button>
        </div>
      </form>
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
