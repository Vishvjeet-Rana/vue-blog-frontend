<script setup lang="ts">
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { updateProfile } from "../../services/auth";

const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["back"]);

const name = ref("");
const email = ref("");

const message = ref("");
const error = ref("");

const handleProfileUpdate = async () => {
  try {
    const payload: { name?: string; email?: string } = {};
    if (name.value.trim() !== "") payload.name = name.value;
    if (email.value.trim() !== "") payload.email = email.value;

    const res = await updateProfile(payload);
    authStore.setAuth(authStore.token!, res);
    router.push("/me");
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
  <h1>Update Your Profile</h1>

  <form @submit.prevent="handleProfileUpdate">
    <input v-model="name" type="text" placeholder="Enter New Name (optional)" />
    <br /><br />
    <input
      v-model="email"
      type="email"
      placeholder="Enter New Email (optional)"
    />
    <br /><br />
    <button type="submit">Update Profile</button>
  </form>

  <button style="margin-top: 20px" @click="router.push('/me')">
    &larr; Go Back
  </button>
  <p style="color: greenyellow">{{ message }}</p>
  <p style="color: red">{{ error }}</p>
</template>
