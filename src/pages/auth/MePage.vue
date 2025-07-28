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
      <h3 class="profile-name">👤 Name: {{ user.name }}</h3>
      <p class="profile-info">📧 Email: {{ user.email }}</p>
      <p class="profile-info">🛡️ Role: {{ user.role }}</p>
      <img
        v-if="user.image"
        :src="`http://localhost:3000/uploads/${user.image}`"
        alt="user profile image"
        class="profile-image"
      />

      <hr />
      <div style="margin-bottom: 15px">
        <h3 class="styled-text">Profile Update Section</h3>
        <button
          class="basic-button-styling"
          style="margin-right: 10px"
          @click="router.push('/profile/update')"
        >
          Update Profile
        </button>
        <button
          class="basic-button-styling"
          @click="router.push('/profile/upload')"
        >
          Upload Image
        </button>
      </div>

      <hr />
      <div style="margin-top: 25px">
        <h3 class="styled-text">Password Settings</h3>
        <button
          class="basic-button-styling"
          style="margin-right: 10px"
          @click="activeSection = 'forgot'"
        >
          Forgot Password
        </button>
        <button
          class="basic-button-styling"
          style="margin-right: 10px"
          @click="activeSection = 'reset'"
        >
          Reset Password
        </button>
        <button class="basic-button-styling" @click="activeSection = 'change'">
          Change Password
        </button>
      </div>
      <hr />

      <div v-if="authStore.token">
        <h3 class="styled-text">Post(s) Section</h3>
        <button
          class="basic-button-styling"
          @click="router.push('/create-post')"
        >
          Create A Post
        </button>
        <br /><br />
        <button class="basic-button-styling" @click="router.push('/posts')">
          Feed
        </button>
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

.animated-btn.alt {
  background: linear-gradient(135deg, #a4508b, #5f0a87); /* purple-pink */
  color: #fff;
  border: none;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 30px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.basic-button-styling {
  background-color: #5f0a87;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 8px;
  border: none;
}

.styled-text {
  font-size: 1.5rem; /* approx h3 */
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 12px;
  color: #2c3e50; /* deep navy blue-gray */
  position: relative;
  padding-bottom: 4px;
}

.styled-text::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #3498db; /* accent blue */
  border-radius: 2px;
}

.profile-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 400px;
  margin-top: 20px;
}

.profile-name {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
}

.profile-info {
  font-size: 16px;
  margin: 6px 0;
  color: #444;
}

.profile-image {
  margin-top: 16px;
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 10px;
  border: 2px solid #ccc;
  object-fit: cover;
}
</style>
