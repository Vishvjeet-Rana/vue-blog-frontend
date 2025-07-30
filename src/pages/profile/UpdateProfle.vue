<script setup lang="ts">
import { useRouter } from "vue-router";
import { useProfileStore } from "../../store/profile";
import { storeToRefs } from "pinia";

const router = useRouter();
const emit = defineEmits(["back"]);

const profileStore = useProfileStore();
const { error, message, name, email } = storeToRefs(profileStore);
const { handleProfileUpdate } = profileStore;
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">Update Your Profile</h1>
    </div>

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleProfileUpdate" class="p-3">
        <div class="p-4">
          <label class="font-semibold text-lg" for="name"
            >Update Name: (*optional)</label
          >
          <br />
          <input
            class="border-b rounded-sm"
            id="name"
            v-model="name"
            type="text"
          />
        </div>

        <div class="p-4">
          <label class="font-semibold text-lg" for="email"
            >Update Email: (*optional)</label
          >
          <br />
          <input
            class="border-b rounded-sm"
            id="email"
            v-model="email"
            type="email"
          />
        </div>

        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>

    <div>
      <button
        class="text-blue-500 underline font-semibold"
        style="margin-top: 20px"
        @click="router.push('/me')"
      >
        &larr; Go Back
      </button>
    </div>
    <p style="color: greenyellow">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>
