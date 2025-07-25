<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostById, updatePost } from "../../services/post";
import { useAuthStore } from "../../store/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const postId = route.params.id as string;
const title = ref("");
const content = ref("");
const file = ref<File | null>(null);

const error = ref("");
const message = ref("");

onMounted(async () => {
  try {
    const res = await getPostById(postId);
    title.value = res.title;
    content.value = res.content;
  } catch (error: any) {
    error.value = error.response?.data?.message || "Failed to load post";
  }
});

const handleUpdatePost = async () => {
  try {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("content", content.value);
    if (file.value) {
      formData.append("image", file.value);
    }

    const res = await updatePost(postId, formData);
    message.value = "Post Updated successfully!";
    error.value = "";

    router.push("/posts");
  } catch (err: any) {
    err.value =
      err.response?.data?.message || "Something went wrong in updating post";
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
  <h2>Update Post</h2>

  <form @submit.prevent="handleUpdatePost">
    <input v-model="title" type="text" placeholder="Update Title" /><br /><br />
    <textarea
      v-model="content"
      type="text"
      placeholder="Update Content"
      rows="6"
      cols="40"
    ></textarea
    ><br /><br />
    <input type="file" @change="handleFileChange" /><br /><br />
    <button type="submit">Update Post</button>
  </form>

  <p style="color: green">{{ message }}</p>
  <p style="color: red">{{ error }}</p>
</template>
