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
import { useValidationStore } from "./validations";

export const useAuthFormStore = defineStore("authForm", () => {
  const router = useRouter();
  const route = useRoute();

  const oldPassword = ref("");
  const newPassword = ref("");

  const message = ref("");
  const error = ref<string | string[] | null>(null);

  const name = ref("");
  const email = ref("");
  const password = ref("");

  const image = ref<File | null>(null);

  const authStore = useAuthStore();

  const validationStore = useValidationStore();

  const token = route.params.token as string;

  // handling change password
  const handleChangePass = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await changePassword(oldPassword, newPassword);
      message.value = response.message;
      router.push("/login");
    } catch (err: any) {
      const res = err?.response?.data;

      const extractedMessage = Array.isArray(res?.message?.message)
        ? res.message.message
        : typeof res?.message?.message === "string"
        ? res.message.message
        : Array.isArray(res?.message)
        ? res.message
        : typeof res?.message === "string"
        ? res.message
        : "Something went wrong";

      error.value = extractedMessage;
    }
  };

  // login handling function
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { access_token } = await login({ email, password });

      const user = await fetchCurrentUser(access_token);
      authStore.setAuth(access_token, user);

      fireConfetti();

      setTimeout(() => {
        router.replace("/me");
      }, 1500);
    } catch (err: any) {
      const res = err?.response?.data;

      const extractedMessage = Array.isArray(res?.message?.message)
        ? res.message.message
        : typeof res?.message?.message === "string"
        ? res.message.message
        : Array.isArray(res?.message)
        ? res.message
        : typeof res?.message === "string"
        ? res.message
        : "Something went wrong";

      error.value = extractedMessage;
    }
  };

  const handleForgot = async () => {
    validationStore.validateForgotPasswordEmail();

    if (!validationStore.isForgotPasswordFormValid) return;

    try {
      const res = await forgotPassword(validationStore.email);
      message.value = res.message;
      error.value = "";
    } catch (err: any) {
      const res = err?.response?.data;

      const extractedMessage = Array.isArray(res?.message?.message)
        ? res.message.message
        : typeof res?.message?.message === "string"
        ? res.message.message
        : Array.isArray(res?.message)
        ? res.message
        : typeof res?.message === "string"
        ? res.message
        : "Something went wrong";

      error.value = extractedMessage;
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

  const handleRegister = async (form: FormData) => {
    try {
      // Optional: check payload
      // for (let [key, val] of form.entries()) {
      //   console.log(`${key}:`, val);
      // }

      const { access_token } = await register(form);
      authStore.setAuth(access_token, null);

      const user = await fetchCurrentUser(access_token);
      authStore.setAuth(access_token, user);

      fireConfetti();

      setTimeout(() => {
        router.replace("/me");
      }, 1500);
    } catch (err: any) {
      error.value = Array.isArray(err.response?.data?.message)
        ? err.response.data.message
        : err.response?.data?.message?.message ||
          err.response?.data?.message ||
          err.message ||
          "Registration failed";
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
