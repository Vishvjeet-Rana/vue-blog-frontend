<script setup lang="ts">
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { updateProfile } from "../../services/auth";
import confetti from "canvas-confetti";

const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["back"]);

const name = ref("");
const email = ref("");

const message = ref("");
const error = ref("");

// 🎉 Confetti function
const celebrate = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const handleProfileUpdate = async () => {
  try {
    const payload: { name?: string; email?: string } = {};
    if (name.value.trim() !== "") payload.name = name.value;
    if (email.value.trim() !== "") payload.email = email.value;

    const res = await updateProfile(payload);
    authStore.setAuth(authStore.token!, res);
    // 🎉 Trigger celebration
    celebrate();

    // 🎉 Wait 1.5 seconds before redirect so user sees confetti
    setTimeout(() => {
      router.push("/me");
    }, 1500);
    message.value = "Profile Updated Sucessfully!";
    error.value = "";
  } catch (error: any) {
    error.value =
      error.response?.data?.message || "Something went wrong in update profile";
    message.value = "";
  }
};
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
