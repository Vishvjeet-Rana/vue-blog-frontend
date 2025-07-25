import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/auth/LoginPage.vue";
import RegisterPage from "../pages/auth/RegisterPage.vue";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.vue";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.vue";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage.vue";
import MePage from "../pages/auth/MePage.vue";
import WelcomePage from "../pages/WelcomePage.vue";
import UpdateProfle from "../pages/profile/UpdateProfle.vue";
import UploadImage from "../pages/profile/UploadImage.vue";
import CreatePostPage from "../pages/posts/CreatePostPage.vue";
import GetAllPostsPage from "../pages/posts/GetAllPostsPage.vue";
import GetOnePostByIdPage from "../pages/posts/GetOnePostByIdPage.vue";

const routes = [
  // welcome page route
  { path: "/", component: WelcomePage },
  // auth routes
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/forgot-password", component: ForgotPasswordPage },
  { path: "/reset-password/:token", component: ResetPasswordPage },
  { path: "/change-password", component: ChangePasswordPage },
  { path: "/me", component: MePage },
  // profile routes
  { path: "/profile/update", component: UpdateProfle },
  { path: "/profile/upload", component: UploadImage },
  // post rotes
  { path: "/create-post", component: CreatePostPage },
  { path: "/posts", component: GetAllPostsPage },
  { path: "/post/:id", component: GetOnePostByIdPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
