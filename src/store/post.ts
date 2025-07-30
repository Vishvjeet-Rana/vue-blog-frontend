import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../services/post";
import confetti from "canvas-confetti";
import { useRouter, useRoute } from "vue-router";

export const usePostStore = defineStore("post", () => {
  const router = useRouter();
  const route = useRoute();

  const title = ref("");
  const content = ref("");
  const file = ref<File | null>(null);
  const message = ref("");
  const error = ref("");

  const postId = route.params.id as string;

  // for adding confetti
  // 🎉 Confetti function
  function celebrate() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  // for handling file changes (uploading file)
  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      file.value = target.files[0];
    }
  }

  // for handling creation of post
  async function handleCreatePost() {
    try {
      if (!title.value.trim() || !content.value.trim()) {
        error.value = "Title and content are required";
        return;
      }

      const formData = new FormData();

      // debugging steps
      console.log("Title:", title.value);
      console.log("Content:", content.value);

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
  }

  // for updating post
  async function handleUpdatePost(postId: string) {
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
  }

  return {
    title,
    content,
    file,
    message,
    error,
    handleCreatePost,
    handleFileChange,

    postId,
    handleUpdatePost,
  };
});
