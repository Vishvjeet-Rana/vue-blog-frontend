<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllUsers, deleteUser } from "../../services/admin";

// Define the user type
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  verified: boolean;
  createdAt: string;
}

const router = useRouter();
const users = ref<AdminUser[]>([]);
const error = ref("");

const fetchAllUser = async () => {
  try {
    const res = await getAllUsers();
    users.value = res;
  } catch (error: any) {
    error.value = error.response?.data?.message || "FAiled to fetch users";
  }
};

const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );
  if (confirmed) {
    try {
      await deleteUser(id);
      users.value = users.value.filter((u: any) => u.id !== id);
    } catch (error: any) {
      error.value = error.response?.data?.message || "Failed to delete user";
    }
  }
};

const viewUser = (id: string) => {
  router.push(`/admin/users/${id}`);
};

onMounted(fetchAllUser);
</script>

<template>
  <div>
    <h1>All Users</h1>

    <p v-if="error" style="color: red">{{ error }}</p>

    <table v-if="users.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Verified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td v-if="user.role !== `ADMIN`">
            {{ user.verified ? "Yes" : "No" }}
          </td>
          <td v-else>Don't Need</td>
          <td>
            <button @click="viewUser(user.id)">View</button>
            <button @click="handleDelete(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No Users Found.</p>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
button {
  margin: 0 5px;
  cursor: pointer;
}
</style>
