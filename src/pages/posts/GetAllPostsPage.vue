<script setup lang="ts">
import { ref, onMounted } from "vue";
import { deletePost, getAllPosts } from "../../services/post";
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

const handleDeletePost = async (id: string) => {
  try {
    const confirmed = window.confirm(
      "Do you want to delete this post? This can't be undone."
    );
    if (confirmed) {
      await deletePost(id);
      posts.value = posts.value.filter((post) => post.id !== id);
    }
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Something went wrong in deleting post";
  }
};
</script>

<template>
  <div class="bg-gray-200 flex flex-col items-center">
    <div class="w-full h-20 flex items-center justify-center">
      <h1 class="font-bold text-blue-500 text-4xl">All Blog Posts</h1>
    </div>
    <p v-if="error" style="color: red">{{ error }}</p>

    <div v-if="posts.length" class="flex flex-col items-center w-full h-full">
      <div
        class="w-[95%] rounded-2xl border border-gray-700 bg-blue-50"
        v-for="post in posts"
        :key="post.id"
        style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px"
      >
        <h3 class="text-2xl font-semibold">{{ post.title }}</h3>
        <p>{{ post.content }}</p>

        <div class="h-full w-full flex items-center justify-center">
          <div
            v-if="post.image"
            class="w-[40%] h-[40%] flex items-center justify-center rounded-full overflow-hidden my-4"
          >
            <img
              class="object-cover h-50 w-50 rounded-2xl"
              :src="`http://localhost:3000/uploads/${post.image}`"
              width="200"
              height="300"
            />
          </div>
        </div>

        <div class="flex gap-2">
          <!-- ✅ Edit button visible only to owner -->
          <div class="mb-2">
            <button
              class="bg-green-200 px-5 py-2 rounded-2xl text-green-950"
              v-if="authStore.user?.id === post.authorId"
              @click="router.push(`/post/${post.id}/update`)"
            >
              Edit
            </button>
          </div>

          <!-- ✅ Only show if user is logged in and owns the post -->
          <div>
            <button
              v-if="
                authStore.user?.id === post.authorId ||
                authStore.user?.role === 'ADMIN'
              "
              @click="handleDeletePost(post.id)"
              class="px-5 py-2 rounded-2xl bg-red-500 text-red-950"
            >
              Delete
            </button>
          </div>
        </div>
        <br />
        <small>Author: {{ post.author?.name }} </small>
        <span class="ml-3 text-sm text-blue-600 underline">
          <router-link :to="`/post/${post.id}`">View Post</router-link>
        </span>
      </div>
    </div>

    <div v-else>
      <p>No Post Found</p>
    </div>
  </div>
</template>
