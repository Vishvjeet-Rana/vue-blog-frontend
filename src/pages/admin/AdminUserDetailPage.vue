<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/api";

const route = useRoute();
const error = ref("");
const success = ref("");
const user = ref<any>(null);
const userId = route.params.id as string;
const router = useRouter();

const fetchUser = async () => {
  try {
    const res = await api.get(`/users/${userId}`);
    user.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to fetch user details";
  }
};

onMounted(fetchUser);

const handleDelete = async () => {
  const confirm = window.confirm("Are you sure you want to delete this user?");
  if (confirm) {
    try {
      await api.delete(`users/${userId}`);
      success.value = "User deleted successfully!";
      router.push("/admin/users");
    } catch (error: any) {
      error.value = error.response?.data?.message || "Failed to delete user.";
    }
  }
};

const handleVerify = async () => {
  try {
    await api.patch(`/users/${userId}`);
    success.value = "User verified successfully!";
    await fetchUser();
  } catch (error: any) {
    error.value = error.response?.data?.message || "Failed to verify user.";
  }
};
</script>

<template>
  <div>
    <h2>👤 User Details</h2>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>

    <div v-if="user">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
      <p><strong>Verified:</strong> {{ user.verified ? "Yes" : "No" }}</p>
      <p>
        <strong>Created At:</strong>
        {{ new Date(user.createdAt).toLocaleString() }}
      </p>
      <p>
        <strong>Updated At:</strong>
        {{ new Date(user.updatedAt).toLocaleString() }}
      </p>

      <!-- Buttons -->
      <div style="margin-top: 20px">
        <button @click="router.push(`/admin/users/${user.id}/edit`)">
          ✏️ Edit User
        </button>

        <button style="margin-left: 10px" @click="handleDelete">
          🗑 Delete User
        </button>

        <button
          v-if="!user.verified"
          style="margin-left: 10px"
          @click="handleVerify"
        >
          ✅ Verify User
        </button>
      </div>
    </div>
  </div>
</template>
