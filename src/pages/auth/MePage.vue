<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const user = authStore.user;

import ForgotPasswordPage from "./ForgotPasswordPage.vue";
import ResetPasswordPage from "./ResetPasswordPage.vue";
import ChangePasswordPage from "./ChangePasswordPage.vue";

const activeSection = ref<
  "main" | "forgot" | "reset" | "change" | "update" | "upload"
>("main");

const router = useRouter();

const goBack = () => {
  activeSection.value = "main";
};

console.log("🧪 Token:", authStore.token);
console.log("🧪 User object:", user);
</script>

<template>
  <div v-if="user">
    <div v-if="activeSection === 'main'">
      <h3>Name: {{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
      <img
        :src="`http://localhost:3000/uploads/${user.image}`"
        v-if="user.image"
        width="350"
        alt="user entered image"
        style="border: 1px solid gray; border-radius: 10px"
      />

      <hr />
      <div style="margin-bottom: 15px">
        <h3>Profile Update Section</h3>
        <button
          style="margin-right: 10px"
          @click="router.push('/profile/update')"
        >
          Update Profile
        </button>
        <button @click="router.push('/profile/upload')">Upload Image</button>
      </div>

      <hr />
      <div style="margin-top: 25px">
        <h3>Password Settings</h3>
        <button style="margin-right: 10px" @click="activeSection = 'forgot'">
          Forgot Password
        </button>
        <button style="margin-right: 10px" @click="activeSection = 'reset'">
          Reset Password
        </button>
        <button @click="activeSection = 'change'">Change Password</button>
      </div>
      <hr />

      <div v-if="authStore.token">
        <h3>Post(s) Section</h3>
        <button @click="router.push('/create-post')">Create A Post</button>
        <br /><br />
        <button @click="router.push('/posts')">Feed</button>
      </div>

      <button
        class="admin-btn"
        v-if="user?.role.toLocaleLowerCase() === 'admin'"
        @click="router.push('/admin')"
      >
        Admin Space
      </button>
    </div>

    <div v-else-if="activeSection === 'forgot'">
      <ForgotPasswordPage @back="goBack" />
    </div>

    <div v-else-if="activeSection === 'reset'">
      <ResetPasswordPage @back="goBack" />
    </div>

    <div v-else-if="activeSection === 'change'">
      <ChangePasswordPage @back="goBack" />
    </div>
  </div>
</template>

<style scoped>
.admin-btn {
  display: inline-block;
  background-color: orchid;
  color: #fff;
  font-weight: bolder;
  font-size: 15px;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  font-weight: 500;
  margin-top: 20px;
}
.admin-btn:hover {
  background-color: rgb(224, 24, 218);
}
</style>
