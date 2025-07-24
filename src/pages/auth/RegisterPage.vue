<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { register } from "../../services/auth";

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const image = ref<File | null>(null);
const error = ref("");

// handle image upload
const handleImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
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

    for (let [key, val] of form.entries()) {
      console.log(`${key}:`, val);
    }

    const data = await register(form);

    authStore.setAuth(data.token, data.user);

    name.value = "";
    email.value = "";
    password.value = "";
    image.value = null;

    // redirect to /me
    router.push("/login");
  } catch (error: any) {
    error.value = error.response?.data?.message || "Registration failed";
  }
};
</script>

<template>
  <div>
    <h1>Register Page</h1>

    <!-- will add forms here -->
    <form @submit.prevent="handleRegister" enctype="multipart/form-data">
      <input
        v-model="name"
        placeholder="Enter Name"
        type="text"
        required
      /><br /><br />
      <input
        v-model="email"
        placeholder="Enter Email"
        type="email"
        required
      /><br /><br />
      <input
        v-model="password"
        placeholder="Enter Password"
        type="password"
        required
      /><br /><br />
      <input @change="handleImageUpload" type="file" accept="image/*" />
      <button type="submit">Register</button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
