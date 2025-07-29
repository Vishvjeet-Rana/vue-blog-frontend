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
  <div class="h-screen w-full bg-gray-200 flex justify-center">
    <div class="bg-white rounded-2xl w-[60%] h-[55%] mt-15 p-5 gap-5">
      <div class="py-5">
        <h2 class="text-3xl font-bold text-blue-500">👤 User Details</h2>
      </div>
      <p v-if="error" style="color: red">{{ error }}</p>
      <p v-if="success" style="color: green">{{ success }}</p>

      <div v-if="user">
        <table
          class="w-full text-sm text-left border border-gray-200 mt-4 rounded overflow-hidden"
        >
          <tbody>
            <tr class="border-b">
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                ID
              </th>
              <td class="px-4 py-2">{{ user.id }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                Name
              </th>
              <td class="px-4 py-2">{{ user.name }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                Email
              </th>
              <td class="px-4 py-2">{{ user.email }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                Role
              </th>
              <td class="px-4 py-2">{{ user.role }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                Verified
              </th>
              <td class="px-4 py-2">{{ user.verified ? "Yes" : "No" }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                Created At
              </th>
              <td class="px-4 py-2">
                {{ new Date(user.createdAt).toLocaleString() }}
              </td>
            </tr>
            <tr>
              <th class="bg-gray-100 px-4 py-2 font-semibold text-gray-700">
                Updated At
              </th>
              <td class="px-4 py-2">
                {{ new Date(user.updatedAt).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Buttons -->
        <div class="mt-6 flex gap-4">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            @click="router.push(`/admin/users/${user.id}/edit`)"
          >
            ✏️ Edit User
          </button>

          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            @click="handleDelete"
          >
            🗑 Delete User
          </button>

          <button
            v-if="!user.verified"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            @click="handleVerify"
          >
            ✅ Verify User
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
