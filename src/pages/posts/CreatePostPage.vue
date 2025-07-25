<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "../../services/post";

const title = ref("");
const content = ref("");
const router = useRouter();
const file = ref<File | null>(null);
const message = ref("");
const error = ref("");

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

    router.push("/posts");
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
  <h2>Create A New Blog Post</h2>

  <div>
    <form @submit.prevent="handleCreatePost">
      <input
        v-model="title"
        type="text"
        placeholder="Enter Title"
        required
      /><br />
      <textarea
        v-model="content"
        type="text"
        placeholder="Enter Content"
        required
        rows="6"
        cols="40"
      ></textarea
      ><br />
      <input type="file" @change="handleFileChange" />
      <br /><br />
      <button type="submit">Create Post</button>
    </form>

    <p style="color: greenyellow">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>
