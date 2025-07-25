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
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to load post";
  }
});
</script>
<template>
  <div class="single-post">
    <h2>📝 Post Details</h2>

    <p v-if="error" style="color: red">{{ error }}</p>

    <div v-if="post">
      <h3>{{ post.title }}</h3>
      <p><strong>Author:</strong> {{ post.author?.name }}</p>
      <img
        v-if="post.image"
        :src="`http://localhost:3000/uploads/${post.image}`"
        alt="Post Image"
        style="max-width: 100%; margin: 10px 0"
      />
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.single-post {
  max-width: 700px;
  margin: 20px auto;
  padding: 10px;
}
</style>
