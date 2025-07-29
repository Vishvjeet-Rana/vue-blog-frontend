<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "../../services/post";
import confetti from "canvas-confetti";

const title = ref("");
const content = ref("");
const router = useRouter();
const file = ref<File | null>(null);
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

const handleCreatePost = async () => {
  try {
    if (!title || !content) {
      error.value = "Title and content is required";
      return;
    }

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("content", content.value);
    if (file.value) formData.append("image", file.value);

    await createPost(formData);

    message.value = "Post created successfully!";
    error.value = "";

    // 🎉 Trigger celebration
    celebrate();

    // 🎉 Wait 1.5 seconds before redirect so user sees confetti
    setTimeout(() => {
      router.push("/posts");
    }, 1500);
  } catch (error: any) {
    error.value = error.response?.data?.message;
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
      <h2 class="text-blue-600 font-bold text-4xl">Create A New Blog Post</h2>
    </div>

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[60%] w-[40%]"
    >
      <form
        @submit.prevent="handleCreatePost"
        enctype="multipart/form-data"
        class="p-3"
      >
        <div class="p-4">
          <label class="font-semibold text-lg" for="title">Title:</label><br />
          <input
            class="border-b rounded-sm"
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter Title"
            required
          />
        </div>
        <div class="p-4">
          <label class="font-semibold text-lg" for="content">Content:</label
          ><br />
          <textarea
            class="overflow-hidden rounded-sm border"
            id="content"
            v-model="content"
            type="text"
            placeholder="Enter Content"
            required
            rows="6"
            cols="35"
          ></textarea>
        </div>
        <div class="p-4">
          <label class="font-semibold text-lg" for="file">Select Image:</label
          ><br />
          <input
            class="border-b rounded-sm"
            id="file"
            type="file"
            @change="handleFileChange"
          />
        </div>

        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>

    <p style="color: greenyellow">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>
