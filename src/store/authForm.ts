import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  changePassword,
  fetchCurrentUser,
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../services/auth";
import { useAuthStore } from "./auth";
import { fireConfetti } from "../utils/confetti";

export const useAuthFormStore = defineStore("authForm", () => {
  const router = useRouter();
  const route = useRoute();

  const oldPassword = ref("");
  const newPassword = ref("");

  const message = ref("");
  const error = ref("");

  const name = ref("");
  const email = ref("");
  const password = ref("");

  const image = ref<File | null>(null);

  const authStore = useAuthStore();

  const token = route.params.token as string;

  const handleChangePass = async () => {
    try {
      const response = await changePassword(
        oldPassword.value,
        newPassword.value
      );
      message.value = response.message;

      router.push("/login");
    } catch (error: any) {
      error.value =
        error.response?.data?.message ||
        "Something went wrong in change password";
    }
  };

  const handleLogin = async () => {
    try {
      const { access_token } = await login({
        email: email.value,
        password: password.value,
      });

      const user = await fetchCurrentUser(access_token);
      authStore.setAuth(access_token, user);

      // 🎉 Trigger celebration
      fireConfetti();

      // 🎉 Wait 1.5 seconds before redirect so user sees confetti
      setTimeout(() => {
        router.replace("/me");
      }, 1500);
    } catch (err: any) {
      error.value = err.response?.data?.message || "Login failed";
    }
  };

  const handleForgot = async () => {
    try {
      const res = await forgotPassword(email.value);
      message.value = res.message;
      error.value = "";
    } catch (error: any) {
      error.value =
        error.response?.data?.message ||
        "Something went wrong in forgot password";
      message.value = "";
    }
  };

  const handleReset = async () => {
    try {
      const response = await resetPassword(token, newPassword.value);
      message.value = response.message;
      router.push("/login");
    } catch (error: any) {
      error.value =
        error.response?.data?.message ||
        "Something went wrong in Reset Password";
      message.value = "";
    }
  };

  const handleRegister = async () => {
    try {
      const form = new FormData();
      form.append("name", name.value);
      form.append("email", email.value);
      form.append("password", password.value);
      if (image.value) {
        form.append("image", image.value);
      }

      // for (let [key, val] of form.entries()) {
      //   console.log(`${key}:`, val);
      // }

      const { access_token } = await register(form);
      authStore.setAuth(access_token, null);

      const user = await fetchCurrentUser(access_token);
      authStore.setAuth(access_token, user);

      // 🎉 Trigger celebration
      fireConfetti();

      // 🎉 Wait 1.5 seconds before redirect so user sees confetti
      setTimeout(() => {
        router.replace("/me");
      }, 1500);
    } catch (error: any) {
      error.value = error.response?.data?.message || "Registration failed";
    }
  };

  // handle image upload
  const handleImageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      image.value = target.files[0];
    }
  };

  return {
    error,
    message,
    handleChangePass,
    newPassword,
    oldPassword,
    email,
    password,
    handleLogin,
    handleForgot,
    handleReset,
    name,
    handleRegister,
    handleImageUpload,
  };
});
