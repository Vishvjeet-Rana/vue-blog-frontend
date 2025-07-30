import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../services/api";
import { getAllUsers } from "../services/admin";
import { fireConfetti } from "../utils/confetti";

export const useAdminStore = defineStore("admin", () => {
  const name = ref("");
  const email = ref("");
  const role = ref("USER");
  const router = useRouter();

  const success = ref("");
  const error = ref("");

  // Define the user type
  interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    verified: boolean;
    createdAt: string;
  }

  const users = ref<AdminUser[]>([]);

  const route = useRoute();
  const userId = route.params.id as string;

  const handleSubmit = async () => {
    try {
      const payload = {
        name: name.value,
        email: email.value,
        role: role.value,
      };
      const res = await api.post("/users", payload);
      success.value = res.data.message;
      fireConfetti();
      router.push(`/admin/users`);
      error.value = "";
    } catch (error: any) {
      success.value = "";
      error.value = error.response?.data?.message || "Failed to create user.";
    }
  };

  // edit user part
  const fetchUser = async (userId: string) => {
    try {
      const res = await api.get(`/users/${userId}`);
      const user = res.data;
      name.value = user.name;
      email.value = user.email;
      role.value = user.role.toUpperCase();
      return user;
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

  const handleDelete = async (userId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      try {
        await api.delete(`users/${userId}`);
        users.value = users.value.filter((user) => user.id !== userId);
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
      await fetchUser(userId);
    } catch (error: any) {
      error.value = error.response?.data?.message || "Failed to verify user.";
    }
  };

  const fetchAllUser = async () => {
    try {
      const res = await getAllUsers();
      users.value = res;
    } catch (error: any) {
      error.value = error.response?.data?.message || "Failed to fetch users";
    }
  };

  return {
    handleSubmit,
    error,
    success,
    name,
    email,
    role,
    fetchUser,
    handleUpdate,
    handleVerify,
    handleDelete,
    fetchAllUser,
    users,
  };
});
