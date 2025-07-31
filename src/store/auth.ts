import { defineStore } from "pinia";
import { fetchCurrentUser } from "../services/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "USER" | "ADMIN";
  image?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null as User | null,
    loadingUser: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },

  actions: {
    setAuth(token: string, user: User | null) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
    },

    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },

    async hydrateUser(): Promise<void> {
      if (!this.token) {
        this.loadingUser = false;
        return;
      }

      try {
        const res = await fetchCurrentUser(this.token);
        this.user = res;
      } catch (error) {
        this.logout();
      } finally {
        this.loadingUser = false;
      }
    },
  },
});
