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
  <div class="dashboard">
    <h1>Admin Dashboard</h1>

    <div class="button-group">
      <button class="admin-btn" @click="goToUserList">👥 Manage Users</button>
      <button class="admin-btn" @click="goToCreateUser">
        ➕ Create New User
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

<style scoped>
.admin-btn {
  display: inline-block;
  background-color: palevioletred;
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

.dashboard {
  text-align: center;
  margin-top: 50px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}
</style>
