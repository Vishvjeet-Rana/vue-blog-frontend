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
import UpdatePostPage from "../pages/posts/UpdatePostPage.vue";
import AdminDashBoardPage from "../pages/admin/AdminDashBoardPage.vue";
import AdminUserListPage from "../pages/admin/AdminUserListPage.vue";
import AdminUserDetailPage from "../pages/admin/AdminUserDetailPage.vue";
import AdminCreateUserPage from "../pages/admin/AdminCreateUserPage.vue";
import { useAuthStore } from "../store/auth";
import { pinia } from "../main";
import AdminEditUserPage from "../pages/admin/AdminEditUserPage.vue";

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
  { path: "/post/:id/update", component: UpdatePostPage },
  // admin routes
  {
    path: "/admin",
    component: AdminDashBoardPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/users",
    component: AdminUserListPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/users/:id",
    component: AdminUserDetailPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/create-user",
    component: AdminCreateUserPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/users/:id/edit",
    component: AdminEditUserPage,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(pinia);

  // hydrate if user is not loaded yet
  if (authStore.loadingUser) {
    await authStore.hydrateUser();
  }

  const isAuth = authStore.isAuthenticated;

  // if alrady authenticated then restricts user to open login or register through URL
  if (isAuth && (to.path === "/login" || to.path === "/register")) {
    return next("/me");
  }

  // if route rquires login
  if (to.meta.requiresAuth && !authStore.token) {
    return next("/login");
  }

  // if route requires admin
  if (
    to.meta.requiresAdmin &&
    authStore.user?.role.toLocaleLowerCase() !== "admin"
  ) {
    return next("/me");
  }

  next();
});

export default router;
