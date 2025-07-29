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
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">Upload Your Image</h1>
    </div>

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleUploadImage" class="p-3">
        <div class="p-4">
          <label class="font-semibold text-lg" for="image">Select Image:</label>
          <br /><br />
          <input
            class="border-b rounded-sm"
            id="image"
            type="file"
            @change="handleFileChange"
          />
        </div>

        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Upload
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
  </div>

  <p style="color: greenyellow">{{ message }}</p>
  <p style="color: red">{{ error }}</p>
</template>
