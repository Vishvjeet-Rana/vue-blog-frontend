<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getPostById } from "../../services/post";

const route = useRoute();
const postId = route.params.id as string;

const post = ref<any>(null);
const error = ref("");

onMounted(async () => {
  try {
    post.value = await getPostById(postId);
    console.log("POST DATA:", post.value);
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to load post";
  }
});

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString(); // You can use toLocaleDateString() if you want only date
}
</script>

<template>
  <div class="bg-gray-200 h-screen w-full flex items-center justify-center">
    <div class="h-[70%] w-[60%] bg-white rounded-3xl p-5 overflow-y-auto">
      <h2 class="text-blue-400 font-semibold text-3xl my-2">📝 Post Details</h2>

      <p v-if="error" style="color: red">{{ error }}</p>

      <div v-if="post">
        <h3 class="text-blue-950 font-semibold text-xl">
          Title: {{ post.title }}
        </h3>
        <p><strong>Author:</strong> {{ post.author?.name }}</p>
        <div class="h-60 w-60 flex items-center justify-center my-10">
          <img
            class="h-full w-full object-cover"
            v-if="post.image"
            :src="`http://localhost:3000/uploads/${post.image}`"
            alt="Post Image"
          />
        </div>
        <!-- content -->
        <div class="mb-3">
          <p><span class="font-bold">Content: </span>{{ post.content }}</p>
        </div>

        <p><strong>Created At:</strong> {{ formatDate(post.createdAt) }}</p>
        <p><strong>Updated At:</strong> {{ formatDate(post.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>
