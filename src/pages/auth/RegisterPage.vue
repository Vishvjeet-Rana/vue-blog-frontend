<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthFormStore } from "../../store/authForm";

const authFormStore = useAuthFormStore();

const { email, name, password, error } = storeToRefs(authFormStore);
const { handleImageUpload, handleRegister } = authFormStore;
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
        @submit.prevent="handleRegister"
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
            required
          />
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
            required
          />
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
            required
          />
        </div>
        <br />
        <div class="p-4">
          <label class="font-semibold text-lg" for="image">Choose Image:</label>
          <br />
          <input
            class="border-b rounded-sm"
            id="image"
            @change="handleImageUpload"
            type="file"
            accept="image/*"
          />
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Register &rarr;
          </button>
        </div>
      </form>
    </div>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
