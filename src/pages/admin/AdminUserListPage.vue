<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "../../store/admin";
import { storeToRefs } from "pinia";

const adminStore = useAdminStore();

const { fetchAllUser, handleDelete } = adminStore;
const { error, users } = storeToRefs(adminStore);
// // Define the user type
// interface AdminUser {
//   id: string;
//   name: string;
//   email: string;
//   role: "USER" | "ADMIN";
//   verified: boolean;
//   createdAt: string;
// }

const router = useRouter();
// const users = ref<AdminUser[]>([]);

// const fetchAllUser = async () => {
//   try {
//     const res = await getAllUsers();
//     users.value = res;
//   } catch (error: any) {
//     error.value = error.response?.data?.message || "Failed to fetch users";
//   }
// };

// const handleDelete = async (id: string) => {
//   const confirmed = window.confirm(
//     "Are you sure you want to delete this user?"
//   );
//   if (confirmed) {
//     try {
//       await deleteUser(id);
//       users.value = users.value.filter((u: any) => u.id !== id);
//     } catch (error: any) {
//       error.value = error.response?.data?.message || "Failed to delete user";
//     }
//   }
// };

const viewUser = (id: string) => {
  router.push(`/admin/users/${id}`);
};

onMounted(fetchAllUser);
</script>
<template>
  <div class="w-full bg-gray-200 h-screen">
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4 text-blue-800">All Users</h1>

      <p v-if="error" class="text-red-600 mb-4">{{ error }}</p>

      <div v-if="users.length" class="overflow-x-auto">
        <table
          class="min-w-full bg-white border border-gray-300 rounded-lg shadow"
        >
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Role</th>
              <th class="px-4 py-2 text-left">Verified</th>
              <th class="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2 capitalize">
                {{ user.role.toLowerCase() }}
              </td>
              <td class="px-4 py-2">
                <span v-if="user.role !== 'ADMIN'">
                  {{ user.verified ? "Yes" : "No" }}
                </span>
                <span v-else class="text-gray-400 italic">Don't Need</span>
              </td>
              <td class="px-4 py-2 space-x-2">
                <button
                  @click="viewUser(user.id)"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  View
                </button>
                <button
                  @click="handleDelete(user.id)"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="text-gray-600 mt-4">No Users Found.</p>
    </div>
  </div>
</template>
