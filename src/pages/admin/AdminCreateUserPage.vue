<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAdminStore } from "../../store/admin";

const adminStore = useAdminStore();

const { error, success, name, email, role } = storeToRefs(adminStore);
const { handleSubmit } = adminStore;
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h2 class="text-blue-600 font-bold text-4xl">👤 Create New User</h2>
    </div>

    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleSubmit" class="p-3">
        <div class="p-4">
          <label class="font-semibold text-lg" for="name">Enter Name:</label
          ><br /><br />
          <input
            class="border-b rounded-sm"
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter Name"
            required
          />
        </div>

        <div class="p-4">
          <label class="font-semibold text-lg" for="email">Enter Email:</label
          ><br /><br />
          <input
            class="border-b rounded-sm"
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter Email"
            required
          />
        </div>

        <div class="p-4">
          <label class="font-semibold text-lg" for="role">Select Role:</label
          ><br /><br />
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
            Create User
          </button>
        </div>
      </form>
    </div>

    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>
