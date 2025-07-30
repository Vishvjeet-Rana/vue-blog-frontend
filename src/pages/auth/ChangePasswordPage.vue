<script setup lang="ts">
import { useAuthFormStore } from "../../store/authForm";
import { storeToRefs } from "pinia";

const authFormStore = useAuthFormStore();

const { error, message, newPassword, oldPassword } = storeToRefs(authFormStore);
const { handleChangePass } = authFormStore;

const emit = defineEmits(["back"]);
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200"
  >
    <div>
      <h1 class="text-blue-600 font-bold text-4xl">
        Want To Change Your Password?
      </h1>
    </div>

    <!-- will add forms here -->
    <div
      class="flex flex-col bg-white drop-shadow-gray-600 shadow-2xl rounded-2xl h-[50%] w-[40%]"
    >
      <form @submit.prevent="handleChangePass" class="p-3">
        <div class="p-4">
          <label class="font-semibold text-lg" for="newPass"
            >Enter Old Password:</label
          ><br />
          <input
            class="border-b rounded-sm"
            id="newPass"
            type="password"
            required
            placeholder="enter old password"
            v-model="oldPassword"
          />
        </div>
        <div class="p-4">
          <label class="font-semibold text-lg" for="oldPass"
            >Enter New Password:</label
          ><br />
          <input
            class="border-b rounded-sm"
            id="oldPass"
            type="password"
            required
            placeholder="enter new password"
            v-model="newPassword"
          />
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>

    <div>
      <button
        class="text-blue-500 underline font-semibold"
        style="margin-top: 20px"
        @click="emit('back')"
      >
        &larr; Go Back
      </button>
    </div>
    <p style="color: green">{{ message }}</p>
    <p style="color: red">{{ error }}</p>
  </div>
</template>

<style scoped></style>
