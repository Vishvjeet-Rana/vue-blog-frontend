import { defineStore } from "pinia";
import { updateProfile, uploadImage } from "../services/auth";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import confetti from "canvas-confetti";
import { useRouter } from "vue-router";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  const name = ref("");
  const email = ref("");

  const message = ref("");
  const error = ref("");

  const router = useRouter();

  const file = ref<File | null>(null);

  // 🎉 Confetti function
  const celebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  async function handleProfileUpdate() {
    try {
      const payload: { name?: string; email?: string } = {};
      if (name.value.trim() !== "") payload.name = name.value;
      if (email.value.trim() !== "") payload.email = email.value;

      const res = await updateProfile(payload);
      authStore.setAuth(authStore.token!, res);
      // 🎉 Trigger celebration
      celebrate();

      // 🎉 Wait 1.5 seconds before redirect so user sees confetti
      setTimeout(() => {
        router.push("/me");
      }, 1500);
      message.value = "Profile Updated Sucessfully!";
      error.value = "";
    } catch (error: any) {
      error.value =
        error.response?.data?.message ||
        "Something went wrong in update profile";
      message.value = "";
    }
  }

  async function handleUploadImage(formData: FormData) {
    try {
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
  }

  return {
    handleProfileUpdate,
    error,
    message,
    name,
    email,
    file,
    handleUploadImage,
  };
});
