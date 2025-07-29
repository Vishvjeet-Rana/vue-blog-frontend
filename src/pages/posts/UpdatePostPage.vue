<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostById, updatePost } from "../../services/post";

const route = useRoute();
const router = useRouter();

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

    await updatePost(postId, formData);
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
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div class="text-blue-600 font-bold text-4xl">
      <h2>Update Your Post</h2>
    </div>

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[60%] w-[40%]"
    >
      <form
        @submit.prevent="handleUpdatePost"
        enctype="multipart/form-data"
        class="p-3"
      >
        <div class="p-4">
          <label class="font-semibold text-lg" for="title">Update Title:</label
          ><br />
          <br />
          <input
            v-model="title"
            class="border-b rounded-sm"
            id="title"
            type="text"
            placeholder="Update Title"
          />
        </div>
        <div class="p-4">
          <label class="font-semibold text-lg" for="content"
            >Update Content:</label
          ><br />
          <br />
          <textarea
            class="overflow-hidden rounded-sm border"
            id="content"
            v-model="content"
            type="text"
            placeholder="Update Content"
            rows="6"
            cols="35"
          ></textarea>
        </div>
        <div class="p-4">
          <label class="font-semibold text-lg" for="file">Select File:</label
          ><br />
          <br />
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
            Update Post
          </button>
        </div>
      </form>
    </div>

    <p style="color: green">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>
