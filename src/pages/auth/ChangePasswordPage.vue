<script setup lang="ts">
import { useAuthFormStore } from "../../store/authForm";
import { storeToRefs } from "pinia";

// authForm store
const authFormStore = useAuthFormStore();

const { message } = storeToRefs(authFormStore);
const { handleChangePass } = authFormStore;

// validation store
import { useValidationStore } from "../../store/validations";
const validationStore = useValidationStore();

const { validateOldPassword, validateNewPassword, handleChangePasswordSubmit } =
  validationStore;
const {
  newPassword,
  oldPassword,
  oldPasswordError,
  newPasswordError,
  isChangePasswordFormValid,
} = storeToRefs(validationStore);

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
      <form
        @submit.prevent="handleChangePasswordSubmit(handleChangePass)"
        class="p-3"
      >
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
            @blur="validateOldPassword"
          />
          <p v-if="oldPasswordError" class="text-red-500">
            {{ oldPasswordError }}
          </p>
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
            @blur="validateNewPassword"
          />
          <p v-if="newPasswordError" class="text-red-500">
            {{ newPasswordError }}
          </p>
        </div>
        <div class="p-4">
          <button
            class="border-2 border-none py-2 px-4 rounded-xl font-black bg-amber-400 disabled:opacity-50"
            type="submit"
            :disabled="!isChangePasswordFormValid"
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
    <div v-if="authFormStore.error" class="text-red-600 mt-4">
      <ul v-if="Array.isArray(authFormStore.error)">
        <li v-for="(msg, i) in authFormStore.error" :key="i">{{ msg }}</li>
      </ul>
      <p v-else>{{ authFormStore.error }}</p>
    </div>
  </div>
</template>

<style scoped></style>
