<script setup lang="ts"></script>

<template>
  <div>
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/forgot-password">Forgot Pass</router-link> |
      <router-link to="/reset-password/some-token">Reset Pass</router-link> |
      <router-link to="/change-password">Change Pass</router-link>
    </nav>
  </div>

  <router-view />
</template>

<style scoped></style>
