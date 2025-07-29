<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToUserList = () => {
  router.push("/admin/users");
};

const goToCreateUser = () => {
  router.push("/admin/create-user");
};
</script>

<template>
  <div class="h-screen w-full bg-gray-200 flex justify-center">
    <div
      class="bg-white rounded-2xl flex flex-col items-center w-[60%] h-[30%] mt-7"
    >
      <div class="h-16 w-[50%] flex items-center justify-center">
        <h1 class="text-blue-500 font-bold text-3xl">Admin Dashboard</h1>
      </div>

      <div class="h-20 w-[60%] flex items-center justify-center">
        <button
          class="border-none bg-teal-500 rounded-2xl m-auto py-3 px-3"
          @click="goToUserList"
        >
          👥 Manage Users
        </button>
        <button
          class="border-none bg-teal-500 rounded-2xl m-auto py-3 px-3"
          @click="goToCreateUser"
        >
          ➕ Create New User
        </button>
      </div>

      <div class="p-5">
        <p class="text-violet-900 font-semibold">
          Welcome to the Admin Dashboard - manage your users efficiently and
          create new ones with ease.
        </p>
      </div>
    </div>
  </div>
</template>
