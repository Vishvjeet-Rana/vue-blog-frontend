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
  <div
    v-if="user"
    class="h-screen w-screen flex flex-col justify-center items-center gap-7 bg-gray-200 p-4"
  >
    <div
      v-if="activeSection === 'main'"
      class="h-full w-[90%] p-6 rounded-3xl flex flex-col gap-5"
    >
      <!-- the user info section -->
      <div class="flex items-center gap-5 p-3 rounded-3xl bg-gray-300">
        <!-- image of user -->
        <div class="rounded-full w-26 h-26 overflow-hidden">
          <img
            v-if="user.image"
            :src="`http://localhost:3000/uploads/${user.image}`"
            alt="user profile image"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- user's info -->
        <div>
          <h3 class="text-2xl font-semibold">{{ user.name }}</h3>
          <p class="text-sm">{{ user.email }}</p>
          <p class="text-sm">{{ user.role }}</p>
        </div>
      </div>

      <!-- profile update section -->
      <div
        class="bg-blue-200 flex justify-center-center gap-5 p-3 rounded-3xl flex-col"
      >
        <div>
          <h3 class="font-semibold text-2xl">Profile Update Section</h3>
        </div>
        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            @click="router.push('/profile/update')"
          >
            Update Profile
          </button>
        </div>
        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            @click="router.push('/profile/upload')"
          >
            Upload Image
          </button>
        </div>
      </div>

      <!-- Password Settings -->
      <div
        class="bg-gray-300 flex justify-center-center gap-5 p-3 rounded-3xl flex-col"
      >
        <div>
          <h3 class="font-semibold text-2xl">Password Settings</h3>
        </div>
        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            style="margin-right: 10px"
            @click="activeSection = 'forgot'"
          >
            Forgot Password
          </button>
        </div>
        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            style="margin-right: 10px"
            @click="activeSection = 'reset'"
          >
            Reset Password
          </button>
        </div>
        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            @click="activeSection = 'change'"
          >
            Change Password
          </button>
        </div>
      </div>

      <!-- Post Section -->
      <div
        v-if="authStore.token"
        class="bg-blue-200 flex justify-center-center gap-5 p-3 rounded-3xl flex-col"
      >
        <div>
          <h3 class="font-semibold text-2xl">Post(s) Section</h3>
        </div>
        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            @click="router.push('/create-post')"
          >
            Create A Post
          </button>
        </div>

        <div>
          <button
            class="border-2 border-none py-1 px-3 rounded-xl bg-amber-400"
            @click="router.push('/posts')"
          >
            Feed
          </button>
        </div>
      </div>

      <button
        class="relative px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-400 via-[orchid] to-pink-400 shadow-lg border border-pink-300 animate-pulse hover:animate-none hover:shadow-pink-500 hover:ring-2 hover:ring-white transition-all duration-300"
        v-if="user?.role.toLocaleLowerCase() === 'admin'"
        @click="router.push('/admin')"
      >
        <span class="text-xl">👑</span>
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

<!-- <style scoped>
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
</style> -->
