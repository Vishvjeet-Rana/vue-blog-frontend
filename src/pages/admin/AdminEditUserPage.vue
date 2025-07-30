<script setup lang="ts">
import { onMounted } from "vue";

import { useAdminStore } from "../../store/admin";
import { storeToRefs } from "pinia";

const adminStore = useAdminStore();

const { error, success, name, email, role } = storeToRefs(adminStore);

const { handleUpdate, fetchUser } = adminStore;

// const route = useRoute();
// const userId = route.params.id as string;

// const fetchUser = async () => {
//   try {
//     const res = await api.get(`/users/${userId}`);
//     const user = res.data;
//     name.value = user.name;
//     email.value = user.email;
//     role.value = user.role.toUpperCase();
//   } catch (error: any) {
//     error.value = error.response?.data?.message || "Failed to load user.";
//   }
// };

// const handleUpdate = async () => {
//   try {
//     const payload: any = {};
//     if (name.value) payload.name = name.value;
//     if (email.value) payload.email = email.value;
//     if (role.value) payload.role = role.value;

//     await api.put(`/users/${userId}`, payload);
//     success.value = "User updated sucessfully!";
//     error.value = "";
//     setTimeout(() => router.push(`/admin/users/${userId}`), 1500);
//   } catch (error: any) {
//     error.value = error.response?.data?.message || "Failed to update user.";
//   }
// };

onMounted(fetchUser);
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h2 class="text-blue-600 font-bold text-4xl">✏️ Edit User</h2>
    </div>

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleUpdate" class="p-3">
        <div class="p-4">
          <label class="font-semibold text-lg" for="name">Enter Name:</label>
          <br /><br />
          <input
            class="border-b rounded-sm"
            id="name"
            v-model="name"
            placeholder="Name"
            required
          />
        </div>

        <div class="p-4">
          <label class="font-semibold text-lg" for="email">Enter Email:</label>
          <br /><br />
          <input
            class="border-b rounded-sm"
            id="email"
            v-model="email"
            placeholder="Email"
            type="email"
            required
          />
        </div>

        <div class="p-4">
          <label class="font-semibold text-lg" for="role">Select Role:</label>
          <br /><br />
          <select class="border-2" id="role" v-model="role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>

    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
