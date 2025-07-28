<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const name = ref("");
const email = ref("");
const role = ref<"user" | "admin">("user");

const success = ref("");
const error = ref("");

const handleSubmit = async () => {
  try {
    const payload = {
      name: name.value,
      email: email.value,
      role: role.value,
    };
    const res = await api.post("/users", payload);
    success.value = res.data.message;
    error.value = "";
  } catch (error: any) {
    success.value = "";
    error.value = error.response?.data?.message || "Failed to create user.";
  }
};
</script>

<template>
  <div>
    <h2>👤 Create New User</h2>

    <form @submit.prevent="handleSubmit">
      <input v-model="name" type="text" placeholder="Enter Name" required />
      <br /><br />
      <input v-model="email" type="email" placeholder="Enter Email" required />
      <br /><br />
      <select v-model="role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <br /><br />
      <button type="submit">Create User</button>
    </form>

    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
