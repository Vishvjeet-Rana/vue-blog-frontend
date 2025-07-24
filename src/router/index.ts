import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/auth/LoginPage.vue";
import RegisterPage from "../pages/auth/RegisterPage.vue";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.vue";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.vue";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage.vue";

const routes = [
  // auth routes
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/forgot-password", component: ForgotPasswordPage },
  { path: "/reset-password/:token", component: ResetPasswordPage },
  { path: "/change-password", component: ChangePasswordPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
