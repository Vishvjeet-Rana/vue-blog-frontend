<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { fetchCurrentUser, register } from "../../services/auth";
import confetti from "canvas-confetti";

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const image = ref<File | null>(null);
const error = ref("");

// handle image upload
const handleImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
  }
};

// 🎉 Confetti function
const celebrate = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const handleRegister = async () => {
  try {
    const form = new FormData();
    form.append("name", name.value);
    form.append("email", email.value);
    form.append("password", password.value);
    if (image.value) {
      form.append("image", image.value);
    }

    // for (let [key, val] of form.entries()) {
    //   console.log(`${key}:`, val);
    // }

    const { access_token } = await register(form);
    authStore.setAuth(access_token, null);

    const user = await fetchCurrentUser(access_token);
    authStore.setAuth(access_token, user);

    // 🎉 Trigger celebration
    celebrate();

    // 🎉 Wait 1.5 seconds before redirect so user sees confetti
    setTimeout(() => {
      router.push("/me");
    }, 1500);
  } catch (error: any) {
    error.value = error.response?.data?.message || "Registration failed";
  }
};
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
