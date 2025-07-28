<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();
const route = useRoute();
const userId = route.params.id as string;

const name = ref("");
const email = ref("");
const role = ref<"user" | "admin">("user");

const success = ref("");
const error = ref("");

const fetchUser = async () => {
  try {
    const res = await api.get(`/users/${userId}`);
    const user = res.data;
    name.value = user.name;
    email.value = user.email;
    role.value = user.role.toUpperCase();
  } catch (error: any) {
    error.value = error.response?.data?.message || "Failed to load user.";
  }
};

const handleUpdate = async () => {
  try {
    const payload: any = {};
    if (name.value) payload.name = name.value;
    if (email.value) payload.email = email.value;
    if (role.value) payload.role = role.value;

    await api.put(`/users/${userId}`, payload);
    success.value = "User updated sucessfully!";
    error.value = "";
    setTimeout(() => router.push(`/admin/users/${userId}`), 1500);
  } catch (error: any) {
    error.value = error.response?.data?.message || "Failed to update user.";
  }
};

onMounted(fetchUser);
</script>

<template>
  <div>
    <h2>✏️ Edit User</h2>

    <form @submit.prevent="handleUpdate">
      <input v-model="name" placeholder="Name" required />
      <br /><br />
      <input v-model="email" placeholder="Email" type="email" required />
      <br /><br />
      <select v-model="role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <br />
      <br />
      <button type="submit">Update</button>
    </form>

    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
