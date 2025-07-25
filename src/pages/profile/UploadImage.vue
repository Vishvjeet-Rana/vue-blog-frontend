<script setup lang="ts">
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { uploadImage } from "../../services/auth";

const authStore = useAuthStore();
const file = ref<File | null>(null);

const router = useRouter();
const message = ref("");
const error = ref("");
const emit = defineEmits(["back"]);

const handleUploadImage = async () => {
  try {
    if (!file.value) {
      error.value = "Please select an image";
      return;
    }

    const formData = new FormData();
    formData.append("image", file.value);

    const res = await uploadImage(formData);
    authStore.setAuth(authStore.token!, res);
    router.push("/me");
    message.value = "Image Uploaded successfully";
    error.value = "";
  } catch (error: any) {
    error.value =
      error.response?.data?.message ||
      "Something went wrong in uploading image";
    message.value = "";
  }
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};
</script>

<template>
  <h1>Upload Your Image</h1>

  <form @submit.prevent="handleUploadImage">
    <input type="file" @change="handleFileChange" />
    <br /><br />
    <button type="submit">Upload</button>
  </form>

  <button style="margin-top: 20px" @click="router.push('/me')">
    &larr; Go Back
  </button>
  <p style="color: greenyellow">{{ message }}</p>
  <p style="color: red">{{ error }}</p>
</template>
