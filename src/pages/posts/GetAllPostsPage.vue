<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllPosts } from "../../services/post";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  authorId: string;
  author?: {
    name: string;
    email: string;
  };
}

const posts = ref<Post[]>([]);
const error = ref("");
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const res = await getAllPosts();
    posts.value = res;
  } catch (error: any) {
    error.value =
      error.response?.data?.message || "Something went wrong in get all posts";
  }
});
</script>

<template>
  <div>
    <h1>All Blog Posts</h1>
    <p v-if="error" style="color: red">{{ error }}</p>

    <div v-if="posts.length">
      <div
        v-for="post in posts"
        :key="post.id"
        style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px"
      >
        <h3>Title: {{ post.title }}</h3>
        <p>Content: {{ post.content }}</p>

        <div v-if="post.image">
          <img
            :src="`http://localhost:3000/uploads/${post.image}`"
            width="200"
            height="300"
          />
        </div>

        <!-- ✅ Edit button visible only to owner -->
        <button
          v-if="authStore.user?.id === post.authorId"
          @click="router.push(`/post/${post.id}/update`)"
        >
          Edit
        </button>

        <small
          >Author: {{ post.author?.name }} ({{ post.author?.email }})</small
        >
        <router-link :to="`/post/${post.id}`">Read More</router-link>
      </div>
    </div>

    <div v-else>
      <p>No Post Found</p>
    </div>
  </div>
</template>
